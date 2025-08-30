"use client"
import { EventEmbed } from "@/types/db";
import { useEffect, useState } from "react";
import ColorButton from "../ColorButton";
import InputField from "../InputField";
import EmbedPreview from "./EmbedPreview";

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

  return (
    <div>
      <div className={`fixed inset-0 z-149 backdrop-blur-xl bg-tint-base/4 transition-opacity duration-300 ${isVisible && !isClosing ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className={`fixed inset-0 tratnsition-all duration-300 ease-in-out flex justify-center z-150 my-10 ${isVisible && !isClosing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'}`}>
        <div className="bg-gray-800 rounded-lg shadow-lg w-[90%] max-w-5xl lg:flex h-full overflow-y-auto">
          <div className="lg:w-3/5 w-full flex flex-col overflow-hidden">
            <header className="flex justify-between items-center px-6 py-4 bg-gray-800 sticky top-0 z-10 w-full">
              <h2 className="text-white text-xl font-bold">Edit Embed</h2>
              <ColorButton
                color="red-700"
                text="Close"
                action={handleClose}
              />
            </header>
            <div className="overflow-y-auto px-6 pb-6 space-y-4">
              <InputField
                label="Author Name"
                value={embed.author.name ?? ""}
                maxLength={256}
                placeholder="The Name of the Author."
                onChange={(value) => 
                  handleEmbedChange("author", { ...embed.author, name: value })
                }
                className="w-full"
              />
              <InputField
                label="Author Url"
                value={embed.author.url ?? ""}
                placeholder="The Url for the Author Name."
                onChange={(value) =>
                  handleEmbedChange("author", { ...embed.author, url: value })
                }
                className="w-full"
              />
              <InputField
                label="Author Icon Url"
                value={embed.author.iconUrl ?? ""}
                placeholder="The Icon Url for the Author."
                onChange={(value) => 
                  handleEmbedChange("author", { ...embed.author, iconUrl: value })
                }
                className="w-full"
              />
            </div>
          </div>
          <div className="lg:w-2/5 w-1/1 border-l border-gray-700 bg-gray-800 lg:sticky top-0 h-full overflow-y-auto p-4">
            <EmbedPreview embed={embed}/>
          </div>
        </div>
      </div>
    </div>
  )
}