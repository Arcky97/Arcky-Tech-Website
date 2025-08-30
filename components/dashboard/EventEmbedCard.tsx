"use client"

import { EventEmbed } from "@/types/db";
import EmbedPreview from "./EmbedPreview";
import { DiscordChannel } from "@/types/botAPI/discordChannels";
import ChannelDropdown from "./ChannelDropdown";
import ColorButton from "../ColorButton";
import { useState } from "react";

type EventType = "welcome" | "leave" | "ban";

export default function EventEmbedCard({ type, data, channels = [], onEdit, onChange }: { type: EventType, data: EventEmbed, channels: DiscordChannel[], onEdit: (embed: EventEmbed) => void, onChange: (data: EventEmbed, channelId: string | null) => void }) {
  const [embed, setEmbed] = useState(data);
  
  const handleChannelChange = (value: string | null) => {
    setEmbed((prev) => ({ ...prev, channelId: value }));
    onChange(embed, value);
  }

  return (
    <div id={type} className="p-4 bg-gray-800 rounded-xl lg:w-1/2 mb-4">
      <h2 className="font-bold text-2xl">{type} Embed</h2>
      <ChannelDropdown
        label="Channel Selection"
        value={embed.channelId}
        onChange={(value) => handleChannelChange(value)}
        channels={channels}
      />
      <h3 className="font-bold text-lg mb-2">Embed Preview</h3>
      <EmbedPreview embed={data}/>
      <ColorButton 
        color="green-500" 
        text="Edit Embed"
        action={() => onEdit(data || {})}
      />
    </div>
  )
}