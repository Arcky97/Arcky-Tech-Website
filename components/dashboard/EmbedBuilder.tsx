"use client"
import { EventEmbed, GeneratedEmbed } from "@/types/db";
import { useEffect, useState } from "react";
import ColorButton from "../ColorButton";
import InputField from "../InputField";
import EmbedPreview from "./EmbedPreview";
import InputTextArea from "../InputTextArea";
import ColorPicker from "../ColorPicker";
import { ToggleSwitch } from "../ToggleSwitch";
import { AnimatePresence, motion } from "framer-motion";
import swapArrayIndex from "@/lib/swapArrayIndex";

interface BuilderProps {
  embed: EventEmbed | GeneratedEmbed;
  onClose: () => void;
  onSave: (embed: EventEmbed | GeneratedEmbed, changedFields: Partial<EventEmbed | GeneratedEmbed>) => void;
}

export default function EmbedBuilder({ embed: initialEmbed, onClose, onSave}: BuilderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsclosing] = useState(false);
  const [embed, setEmbed] = useState(initialEmbed);
  const [fields, setFields] = useState<Partial<EventEmbed | GeneratedEmbed>>({});
  const [fieldState, setFieldState] = useState<boolean[]>(() => Array(embed.fields.length).fill(true));

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true)
    }, 50);
  }, []);

  useEffect(() => {
    if (!isClosing) {
      if (isVisible) {
        const scrollY = window.scrollY * -1;
        document.body.style.top = `${scrollY}px`;
        document.body.classList.add("lock-scrollbar");
      }
    } else {
      const scrollY = parseInt(document.body.style.top) * -1;
      document.body.style.top = "";
      document.body.classList.remove("lock-scrollbar");
      document.body.style.overflow = "";
      window.scrollTo({ top: scrollY || 0, behavior: 'instant' });
    }
  }, [isClosing, isVisible]);

  const handleEmbedChange = <K extends keyof (EventEmbed | GeneratedEmbed)>(
    key: K,
    value: (EventEmbed | GeneratedEmbed)[K]
  ) => {
    const originalValue = embed[key];

    setEmbed((prev) => ({ ...prev, [key]: value }));

    console.log([key, value]);
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

  const handleFieldStateChange = (index: number) => {
    setFieldState(prev => {
      const copy = [ ...prev ];
      copy[index] = !copy[index];
      return copy;
    });
  };

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
              <div>
                <h3 className="block text-white text-lg font-bold mb-4">Fields ({embed.fields.length} / 25)</h3>
                {embed.fields.map((field, index) => {
                  const number = index + 1 
                  return (
                    <div key={`field-${index}`} className="mb-4 border border-gray-500/50 p-3 rounded-lg">
                      <div className="flex justify-between">
                        <h4
                          className="text-white text-base md:text-lg font-bold mb-2 cursor-pointer"
                          onClick={() => handleFieldStateChange(index)}
                        >
                          Field {number}
                        </h4>
                        <div className="flex space-x-6">
                          <ColorButton
                            color="blue-800"
                            text="Move Up"
                            action={() => {
                              if (index === 0) return;
                              const newFields = swapArrayIndex(embed.fields, index, index - 1);
                              handleEmbedChange("fields", newFields);
                              const newFieldState = swapArrayIndex(fieldState, index, index - 1);
                              setFieldState(newFieldState);
                            }}
                            disabled={index === 0}
                            extraClass="min-w-22"
                          />
                          <ColorButton
                            color="blue-800"
                            text="Move Down"
                            action={() => {
                              if (index === embed.fields.length - 1) return;
                              const newFields = swapArrayIndex(embed.fields, index, index + 1)
                              handleEmbedChange("fields", newFields);
                              const newFieldState = swapArrayIndex(fieldState, index, index + 1);
                              setFieldState(newFieldState);
                            }}
                            disabled={index === embed.fields.length - 1}
                            extraClass="min-w-22"
                          />
                          <ColorButton
                            color="red-800"
                            text="Remove"
                            action={() => {
                              handleEmbedChange("fields", embed.fields.filter((_, i) => i !== index ));
                              setFieldState(prev => prev.filter((_, i) => i !== index));
                            }}
                            extraClass="min-w-22"
                          />
                        </div>
                      </div>
                      <AnimatePresence initial={false}>
                        {fieldState[index] &&
                          <motion.div
                            key={`field-content-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <InputField
                              label={`Field Name`}
                              value={field.name}
                              placeholder={`The Name for Field ${number}`}
                              onChange={(value) => {
                                const newFields = [ ...embed.fields ];
                                newFields[index] = { ...field, name: value };
                                handleEmbedChange("fields", newFields);
                              }}
                              className="mb-4"
                            />
                            <InputTextArea
                              label={`Field Value`}
                              value={field.value}
                              rows={4}
                              maxLength={4096}
                              placeholder={`The Value for Field ${number}`}
                              onChange={(value) => {
                                const newFields = [ ...embed.fields ];
                                newFields[index] = { ...field, value: value };
                                handleEmbedChange("fields", newFields);
                              }}
                            />
                            <div key={`buttons-${index}`} className="flex py-2 w-full justify-between">
                              <ToggleSwitch
                                label={`Field Inline`}
                                state={field.inline}
                                onChange={(value) => {
                                  const newFields = [ ...embed.fields ];
                                  newFields[index] = { ...field, inline: value };
                                  handleEmbedChange("fields", newFields);
                                }}
                              />
                            </div>
                          </motion.div>
                        }
                      </AnimatePresence>
                    </div>
                  )}
                )}
                <div className="flex mt-4 justify-center">
                  <ColorButton
                    color="blue-800"
                    text="Add new Field"
                    action={() => {
                      handleEmbedChange("fields", [...embed.fields, { name: "new field", value: "", inline: false }]);
                      setFieldState(prev => [ ...prev, true ]);
                    }}
                    disabled={embed.fields.length === 25}
                    extraClass="w-1/2"
                  />
                </div>
              </div>

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
                value={embed.color ?? "#202225"}
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