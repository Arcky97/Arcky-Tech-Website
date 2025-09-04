"use client"

import { DiscordChannel } from "@/types/botAPI/discordChannels";
import { GeneratedEmbed } from "@/types/db"
import DashboardTable from "./DashboardTable";
import ChannelDropdown from "./ChannelDropdown";
import ColorButton from "../ColorButton";
import { createDefaultGeneratedEmbed } from "@/types/db/bot/defaults/defaultEmbed";
import { useParams } from "next/navigation";
import { useState } from "react";

interface GeneratedEmbedCardProps {
  data: GeneratedEmbed[];
  channels: DiscordChannel[];
  onEdit: (embed: GeneratedEmbed) => void;
  onAdd: (embed: GeneratedEmbed) => Promise<GeneratedEmbed>;
  onRemove: (embed: GeneratedEmbed) => Promise<void>;
  onChange: (data: GeneratedEmbed, channel: Partial<GeneratedEmbed>) => void;
}

export default function GeneratedEmbedCard({ data: initialEmbeds, channels, onEdit, onAdd, onRemove, onChange }: GeneratedEmbedCardProps ) {
  const [embeds, setEmbeds] = useState(initialEmbeds);
  const { guildId } = useParams<{ guildId: string }>();

  const handleEmbedCreate = async () => {
    const newEmbed = createDefaultGeneratedEmbed(guildId, "");
    const savedEmbed = await onAdd(newEmbed);
    setEmbeds((prev) => [ ...prev, savedEmbed]);
  };

  const handleEmbedDelete = async (embed: GeneratedEmbed) => {
    await onRemove(embed);
    setEmbeds((prev) => prev.filter((e) => e.id !== embed.id));
  };

  const handleChannelChange = (embed: GeneratedEmbed, value: string | null ) => {
    setEmbeds((prev) => 
      prev.map((e) => 
        e.id === embed.id ? { ...e, channelId: value } : e
      )
    );
    onChange(embed, {channelId: value });
  };

  const sendEmbed = (embed: GeneratedEmbed) => {

  }

  return (
    <div id="generated" className="p-4 bg-gray-800 rounded-xl mb-4">
      <h2 className="font-bold text-2xl">Generated Embeds</h2>
      <DashboardTable
        headers={["ID", "Channel", "Actions", "Send to discord"]}
        rows={embeds
          .map((embed: GeneratedEmbed, index) => [
            <span key={`ID-${embed.id}`}>{index + 1}</span>,
            <span key={`channel-${index}`}>
              <ChannelDropdown
                value={embed.channelId}
                channels={channels}
                onChange={(value) => handleChannelChange(embed, value)}
                widthFull={false}
              />
            </span>,
            <div key={`actons-${index}`} className="justify-center space-x-4">
              <ColorButton
                color="green-700"
                text="Edit"
                action={() => onEdit(embed)}
                extraClass="min-w-22"
              />
              <ColorButton
                color="red-700"
                text="Remove"
                action={() => handleEmbedDelete(embed)}
                extraClass="min-w-22"
              />
            </div>,
            <div key={`send-${index}`}>
              <ColorButton
                color="blue-700"
                text="Confirm"
                action={() => sendEmbed(embed)}
                extraClass="w-full"
              />
            </div>
          ])
        }
        align={["center", "center", "center"]}
        maxHeight="124"
      />
      <div className="flex mt-4 justify-center">
        <ColorButton
          color="blue-700"
          text="Create Embed"
          action={handleEmbedCreate}
          extraClass="w-1/2"
        />
      </div>
    </div>
  )
}