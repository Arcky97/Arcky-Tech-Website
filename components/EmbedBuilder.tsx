"use client";

import { useEffect, useState } from "react";
import InputFields from "./InputFields";
import ColorButton from "./ColorButton";
import InputTextArea from "./InputTextArea";
import ColorPicker from "./ColorPicker";
import ToggleSwitch from "./ToggleSwitch";
import EmbedPreview from "./EmbedPreview";

interface Props {
  embed: Record<string, any>;
  level?: string;
  onClose: () => void;
  onSave: (updatedEmbed: Record<string, any>, level?: string) => void;
}

export default function EmbedBuilder({ embed: initialEmbed, level, onClose, onSave }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [embed, setEmbed] = useState(initialEmbed);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      setIsVisible(true);
    }, 50)
  }, []);

  const closeModal = () => {
    setIsClosing(true);
    
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      document.body.style.overflow = "auto"
      onClose();
    }, 300);
  };

  const handleEmbedChange = (key: string, value: any, subKey?: string) => {
    if (subKey) {
      setEmbed((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [subKey]: value
        }
      }))
    } else {
      setEmbed((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const showField = (field: any) => level === undefined || field !== undefined;

  const handleClose = () => {
    onSave(embed, level);
    closeModal();
  };

  return (
    <div>
      <div className={`fixed inset-0 z-149 backdrop-blur-xl bg-tint-base/4 transition-opacity duration-300 ${isVisible && !isClosing ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className={`fixed inset-0 transition-all duration-300 ease-in-out flex justify-center z-150 my-10 ${isVisible && !isClosing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'}`}>
        <div className="bg-gray-800 rounded-lg shadow-lg w-[90%] max-w-5xl flex h-full">
          <div className="lg:w-3/5 flex flex-col overflow-hidden">
            <header className="flex justify-between items-center px-6 py-4 bg-gray-800 sticky top-0 z-10 w-full">
              <h2 className="text-white text-xl font-bold">Edit Embed {level ? `for level ${level}` : ""}</h2>
              <ColorButton
                color="red"
                text="Close"
                action={handleClose}
              />
            </header>
            <div className="overflow-y-auto px-6 pb-6 space-y-4">
              {showField(embed.author) && showField(embed.author.name) && (
                <InputFields
                  label="Author Name"
                  value={embed.author.name ?? ""}
                  maxLength={264}
                  placeholder={"The Name of the Author."}
                  onChange={(value) => handleEmbedChange("author", value, "name")}
                />
              )}
              {showField(embed.author) && showField(embed.author.url) && (
                <InputFields
                  label="Author URL"
                  value={embed.author.url ?? ""}
                  placeholder={"The URL for the Author Name"}
                  onChange={(value) => handleEmbedChange("author", value, "url")}
                />
              )}
              {showField(embed.author) && showField(embed.author.iconUrl) && (
                <InputFields
                  label="Author Icon Url"
                  value={embed.author.iconUrl ?? ""}
                  placeholder={"The Icon Url for the Author."}
                  onChange={(value) => handleEmbedChange("author", value, "iconUrl")}
                />
              )}
              {showField(embed.title) && (
                <InputFields
                  label="Title"
                  value={embed.title ?? ""}
                  maxLength={264}
                  placeholder={"The title of the embed"}
                  onChange={(value) => handleEmbedChange("title", value)}
                />
              )}
              {showField(embed.url) && (
                <InputFields
                  label="Title Url"
                  value={embed.url ?? ""}
                  placeholder={"The Url for the Title"}
                  onChange={(value) => handleEmbedChange("url", value)}
                />
              )}
              {showField(embed.description) && (
                <InputTextArea
                  label="Description"
                  value={embed.description ?? ""}
                  rows={4}
                  maxLength={4096}
                  placeholder={"The description of the embed"}
                  onChange={(value) => handleEmbedChange("description", value)}
                />
              )}
              {showField(embed.imageUrl) && (
                <InputFields
                  label="Image URL"
                  value={embed.imageUrl ?? ""}
                  placeholder={"Your Image URL"}
                  onChange={(value) => handleEmbedChange("imageUrl", value)}
                />
              )}
              {showField(embed.thumbnailUrl) && (
                <InputFields
                  label="Thumbnail URL"
                  value={embed.thumbnailUrl ?? ""}
                  placeholder={"Your Thumbnail URL"}
                  onChange={(value) => handleEmbedChange("thumbnailUrl", value)}
                />
              )}
              {showField(embed.color) && (
                <ColorPicker
                  label="Embed Color"
                  value={embed.color ?? "#ffffff"}
                  onChange={(value) => handleEmbedChange("color", value)}
                />
              )}
              <div className="lg:flex lg:space-x-5">
                <div className="lg:w-1/2">
                  {showField(embed.footer) && showField(embed.footer.text) && (
                    <InputFields
                      label="Footer"
                      value={embed.footer.text ?? ""}
                      placeholder={"The Footer"}
                      onChange={(value) => handleEmbedChange("footer", value, "text")}
                    />
                  )}
                </div>
                <div className="lg:w-1/2">
                  {showField(embed.footer) && showField(embed.footer.iconUrl) && (
                    <InputFields
                      label="Footer Icon Url"
                      value={embed.footer.iconUrl ?? ""}
                      placeholder={"The Footer Icon Url"}
                      onChange={(value) => handleEmbedChange("footer", value, "iconUrl")}
                    />
                  )}
                </div>
              </div>
              {showField(embed.timeStamp) && (
                <ToggleSwitch
                  label="Time stamp"
                  enabled={embed.timeStamp ?? false}
                  onChange={(value) => handleEmbedChange("timeStamp", value)}
                />
              )}
            </div>
          </div>
          <div className="lg:w-2/5 border-l border-gray-700 bg-gray-800 lg:sticky top-0 h-full overflow-y-auto p-4">
            <EmbedPreview embed={embed} />
          </div>
        </div>
      </div>
    </div>
  );
}