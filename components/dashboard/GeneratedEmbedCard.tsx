"use client"

import { DiscordChannel } from "@/types/botAPI/discordChannels";
import { GeneratedEmbed } from "@/types/db"
import DashboardTable from "./DashboardTable";
import ChannelDropdown from "./ChannelDropdown";
import ColorButton from "../ColorButton";
import { createDefaultGeneratedEmbed } from "@/types/db/bot/defaults/defaultEmbed";
import { useParams } from "next/navigation";
import { useState } from "react";
import EmbedPreview from "./EmbedPreview";
import sendOrUpdateDiscordEmbed from "@/lib/discord/sendOrUpdateDiscordEmbed";

interface GeneratedEmbedCardProps {
  data: GeneratedEmbed[];
  channels: DiscordChannel[];
  onEdit: (embed: GeneratedEmbed) => void;
  onAdd: (embed: GeneratedEmbed) => Promise<GeneratedEmbed>;
  onRemove: (embed: GeneratedEmbed) => Promise<void>;
  onChange: (data: GeneratedEmbed, channel: Partial<GeneratedEmbed>) => void;
}

export default function GeneratedEmbedCard({ data, channels, onEdit, onAdd, onRemove, onChange }: GeneratedEmbedCardProps ) {
  const { guildId } = useParams<{ guildId: string }>();
  const [ shownEmbed, setShownEmbed ] = useState<GeneratedEmbed | null>(null);
  const [cooldowns, setCooldowns] = useState<Map<string, number>>(new Map());
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const handleEmbedCreate = async () => {
    const newEmbed = createDefaultGeneratedEmbed(guildId, "");
    await onAdd(newEmbed);
  };

  const handleEmbedDelete = async (embed: GeneratedEmbed) => {
    await onRemove(embed);
    if (shownEmbed?.id === embed.id) setShownEmbed(null);
  };

  const handleChannelChange = (embed: GeneratedEmbed, value: string | null ) => {
    onChange(embed, {channelId: value });
  };

  const handleShowOrHideEmbed = (embed: GeneratedEmbed) => {
    if (shownEmbed?.id === embed.id) {
      setShownEmbed(null);
    } else {
      setShownEmbed(embed);
    }
  }

  const sendEmbed = async (embed: GeneratedEmbed) => {
    if (!embed.channelId) {
      setWarningMessage("A Channel needs to be selected before sharing your embed to discord.");
      return;
    }
    if (!embed.title && !embed.description) {
      setWarningMessage("You embed should at least have a Title and Description before it can be shared on discord.");
      return;
    }
    setWarningMessage(null);
    startCooldown(`share-countdown-${embed.id}`, 15);
    setTimeout(async () => {
      const result = await sendOrUpdateDiscordEmbed(guildId, embed.id);
      setInfoMessage(result.message);
      startCooldown(`share-embed-${embed.id}`, 15);
      setTimeout(() => setInfoMessage(null), 15000);
    }, 15000);
  }

  const startCooldown = (key: string, duration: number) => {
    setWarningMessage(null);
    setCooldowns((prev) => new Map(prev).set(key, duration));

    const interval = setInterval(() => {
      setCooldowns((prev) => {
        const next = new Map(prev);
        const timeLeft = (next.get(key) ?? 0) - 1;
        if (timeLeft <= 0) {
          next.delete(key);
          clearInterval(interval);
        } else {
          next.set(key, timeLeft);
        }
        return next;
      })
    }, 1000);
  }
  
  return (
    <div id="generated" className="p-4 bg-gray-800 rounded-xl mb-4 ">
      <h2 className="sticky lg:top-28 top-33 pb-2 z-18 font-bold text-2xl bg-gray-800">Generated Embeds</h2>
      <DashboardTable
        headers={["ID", "Channel", "Actions"]}
        rows={data
          .flatMap((embed: GeneratedEmbed, index) => {
            const isShown = shownEmbed?.id === embed.id;
            const key = `show-${embed.id}`;
            const isCooldown = cooldowns.has(key);
            const secondsLeft = cooldowns.get(key) ?? 0;
            return [
              [
                <span key={`ID-${embed.id}`}>{index + 1}</span>,
                <span key={`channel-${index}`}>
                  <ChannelDropdown
                    value={embed.channelId}
                    channels={channels}
                    onChange={(value) => handleChannelChange(embed, value)}
                    widthFull={true}
                  />
                </span>,
                <div key={`actons-${index}`} className="sm:flex sm:justify-evenly py-2">
                  <ColorButton
                    color={isShown ? "emerald-900" : "green-700"}
                    text={
                      isShown 
                        ? `Hide${isCooldown ? ` (${secondsLeft})` :""}`
                        : `Show${isCooldown ? ` (${secondsLeft})` :""}`
                    }
                    action={() => {
                      handleShowOrHideEmbed(embed);
                      startCooldown(`show-${embed.id}`, 5);
                    }}
                    disabled={isCooldown}
                    extraClass="lg:min-w-22 min-w-18 my-1 sm:my-0"
                  />
                  <ColorButton
                    color="amber-600"
                    text={`Edit${cooldowns.has("edit-all") ? ` (${cooldowns.get("edit-all")})` : ""}`}
                    action={() => {
                      onEdit(embed);
                      startCooldown("edit-all", 15);
                    }}
                    disabled={cooldowns.has("edit-all")}
                    extraClass="lg:min-w-22 min-w-18 my-1 sm:my-0"
                  />
                  <ColorButton
                    color="red-700"
                    text={`Remove${cooldowns.has("remove-all") ? ` (${cooldowns.get("remove-all")})` : ""}`}
                    action={() => {
                      handleEmbedDelete(embed);
                      startCooldown("remove-all", 5)
                    }}
                    disabled={cooldowns.has("remove-all")}
                    extraClass="lg:min-w-22 min-w-18 my-1 sm:my-0"
                  />
                </div>
              ],
              ...(isShown
                ? [[
                  <div key={`preview-${embed.id}`}>
                    <div className="p-4 rounded-lg mt-2 items-center">
                      <h3 className="font-semibold text-lg mb-2 text-center">Embed Preview</h3>
                      <EmbedPreview embed={embed}/>
                      <div className="mt-4 justify-center">
                        {warningMessage && <p className="text-base font-semibold text-orange-400 pb-4">{warningMessage}</p>}
                        {infoMessage && <p className="text-base font-semibold text-green-500 pb-4">{infoMessage}</p>}
                        <div className="flex justify-center">
                          <ColorButton
                            color="blue-700"
                            text={`${
                              cooldowns.has(`share-countdown-${embed.id}`)
                                ? `${embed.messageId 
                                    ? "Updating" 
                                    : "Sending"} 
                                  Embed in ${
                                    cooldowns.get(`share-countdown-${embed.id}`)
                                  }`
                                : `${`${embed.messageId 
                                      ? "Update Shared Embed" 
                                      : "Share Embed"} ${
                                        cooldowns.has(`share-embed-${embed.id}`) 
                                          ? ` (${cooldowns.get(`share-embed-${embed.id}`)})` 
                                          : ""
                                        }`
                                    }`
                                }`
                            }
                            action={() => sendEmbed(embed)}
                            extraClass="w-1/2"
                            disabled={cooldowns.has(`share-embed-${embed.id}`) || cooldowns.has(`share-countdown-${embed.id}`)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ]]
              : [])
          ]})
        }
        align={[null, "center", "center"]}
        maxHeight="max-h-177"
      />
      <div className="flex mt-4 justify-center">
        <ColorButton
          color="blue-700"
          text={`Create New Embed${cooldowns.has("add-new") ? ` (${cooldowns.get("add-new")})` : "" }`}
          action={() => {
            handleEmbedCreate();
            startCooldown("add-new", 10);
          }}
          disabled={cooldowns.has("add-new")}
          extraClass="w-1/2"
        />
      </div>
    </div>
  )
}