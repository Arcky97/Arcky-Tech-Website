"use client"
import { EventEmbed } from "@/types/db";
import { useEffect, useState } from "react";
import ColorButton from "../ColorButton";
import InputField from "../InputField";
import EmbedPreview from "./EmbedPreview";
import InputTextArea from "../InputTextArea";
import ColorPicker from "../ColorPicker";
import { ToggleSwitch } from "../ToggleSwitch";

interface BuilderProps {
  embed: EventEmbed;
  onClose: () => void;
  onSave: (embed: EventEmbed, changedFields: Partial<EventEmbed>) => void;
}

export default function EmbedBuilder({ embed: initialEmbed, onClose, onSave}: BuilderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsclosing] = useState(false);
  const [embed, setEmbed] = useState(initialEmbed);
  const [fields, setFields] = useState<Partial<EventEmbed>>({});

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true)
    }, 50);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const scrollY = window.scrollY * -1;
      document.body.style.top = `${scrollY}px`;
      document.body.classList.add("lock-scrollbar");
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = parseInt(document.body.style.top) * -1;
      document.body.style.top = "";
      document.body.classList.remove("lock-scrollbar");
      document.body.style.overflow = "";
      window.scrollTo({ top: scrollY || 0, behavior: 'instant' });
    }
  }, [isVisible]);

  const handleEmbedChange = <K extends keyof (EventEmbed)>(
    key: K,
    value: (EventEmbed)[K]
  ) => {
    const originalValue = embed[key];

    setEmbed((prev) => ({ ...prev, [key]: value }));

    if (JSON.stringify(originalValue) === JSON.stringify(value)) {
      setFields(({... prev}) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    } else {
      setFields((prev) => ({ ...prev, [key]: value }));
    }
  };

  const closeModal = () => {
    setIsclosing(true);
    setIsVisible(false);
    setTimeout(() => {
      setIsclosing(false);
      onClose();
    }, 300);
  }

  const handleClose = () => {
    if (Object.keys(fields).length > 0) {
      onSave(embed, fields);
    }
    closeModal();
  }

  const handleReset = () => {
    setEmbed(initialEmbed);
  }

  return (
    <div>
      <div className={`fixed inset-0 z-149 backdrop-blur-xl bg-tint-base/4 transition-opacity duration-300 ${isVisible && !isClosing ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className={`fixed inset-0 tratnsition-all duration-300 ease-in-out flex justify-center z-150 my-10 ${isVisible && !isClosing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'}`}>
        <div className="bg-gray-800 rounded-lg shadow-lg w-[90%] max-w-[70%] lg:flex h-full overflow-y-auto">
          <div className="lg:w-4/7 w-full flex flex-col overflow-hidden">
            <header className="flex justify-between items-center px-6 py-4 bg-gray-800 sticky top-0 z-10 w-full">
              <h2 className="text-white text-xl font-bold">Edit Embed</h2>
              <div className="flex gap-4">
                <ColorButton
                  color="blue-700"
                  text="Save Changes"
                  action={handleClose}
                />
                <ColorButton
                  color="red-700"
                  text="Reset Changes"
                  action={handleReset}
                  disabled={Object.entries(fields).map.length === 0}
                />
              </div>
            </header>
            <div className="overflow-y-auto px-6 pb-6 space-y-4">
              <div className="lg:flex lg:space-x-5">
                <div className="flex-1 lg:w-1/2">
                  <InputField
                    label="Author Name"
                    value={embed.author.name ?? ""}
                    maxLength={256}
                    placeholder="The Name of the Author."
                    onChange={(value) => 
                      handleEmbedChange("author", { ...embed.author, name: value })
                    }
                  />
                </div>
                <div className="flex-1 lg:w-1/2">
                  <InputField
                    label="Author Url"
                    value={embed.author.url ?? ""}
                    placeholder="The Url for the Author Name."
                    onChange={(value) =>
                      handleEmbedChange("author", { ...embed.author, url: value })
                    }
                  />
                </div>
              </div>
              <InputField
                label="Author Icon Url"
                value={embed.author.iconUrl ?? ""}
                placeholder="The Icon Url for the Author."
                onChange={(value) => 
                  handleEmbedChange("author", { ...embed.author, iconUrl: value })
                }
                className="w-full"
              />
              <div className="lg:flex lg:space-x-5">
                <div className="flex-1 lg:w-1/2">
                  <InputField
                    label="Title"
                    value={embed.title ?? ""}
                    maxLength={256}
                    placeholder="The Title of the Embed"
                    onChange={(value) => handleEmbedChange("title", value)}
                  />
                </div>
                <div className="flex-1 lg:w-1/2">
                  <InputField
                    label="Title Url"
                    value={embed.url ?? ""}
                    placeholder="The Url for the Title"
                    onChange={(value) => handleEmbedChange("url", value)}
                  />
                </div>
              </div>
              <InputTextArea
                label="Description"
                value={embed.description ?? ""}
                rows={4}
                maxLength={4096}
                placeholder="The description of the embed"
                onChange={(value) => handleEmbedChange("description", value)}
              />
              <InputField
                label="Image Url"
                value={embed.imageUrl ?? ""}
                placeholder="The Embed Image Url"
                onChange={(value) => handleEmbedChange("imageUrl", value)}
              />
              <InputField
                label="Thumbnail Url"
                value={embed.thumbnailUrl ?? ""}
                placeholder="The Embed Thumbnail Url"
                onChange={(value) => handleEmbedChange("thumbnailUrl", value)}
              />
              <ColorPicker
                label="Embed Color"
                value={embed.color ?? ""}
                onChange={(value) => handleEmbedChange("color", value)}
              />
              <div className="lg:flex lg:space-x-5">
                <div className="flex-1 lg:w-1/2">
                  <InputField
                    label="Footer Name"
                    value={embed.footer.text ?? ""}
                    maxLength={256}
                    placeholder="The Footer Name"
                    onChange={(value) => handleEmbedChange("footer", { ...embed.footer, text: value })}
                  />
                </div>
                <div className="flex-1 lg:w-1/2">
                  <InputField
                    label="Footer Icon Url"
                    value={embed.footer.iconUrl ?? ""}
                    placeholder="The Footer Icon Url"
                    onChange={(value) => handleEmbedChange("footer", { ...embed.footer, iconUrl: value })}
                  />
                </div>
              </div>
              <ToggleSwitch
                label="Time Stamp"
                state={embed.timeStamp}
                onChange={(value) => handleEmbedChange("timeStamp", value)}
              />
            </div>
          </div>
          <div className="lg:w-3/7 w-1/1 border-l border-gray-700 bg-gray-800 lg:sticky top-0 h-full overflow-y-auto p-4">
            <EmbedPreview embed={embed}/>
          </div>
        </div>
      </div>
    </div>
  )
}