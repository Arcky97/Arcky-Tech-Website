"use client"

import { EventEmbed } from "@/types/db";
import EmbedPreview from "./EmbedPreview";
import { DiscordChannel } from "@/types/botAPI/discordChannels";
import ChannelDropdown from "./ChannelDropdown";
import ColorButton from "../ColorButton";
import { useState } from "react";

type EventType = "welcome" | "leave" | "ban";

interface EventEmbedCardProps {
  type: EventType;
  data: EventEmbed;
  channels: DiscordChannel[];
  onEdit: (embed: EventEmbed) => void;
  onChange: (data: EventEmbed, channel: Partial<EventEmbed>) => void;
}

export default function EventEmbedCard({ type, data, channels = [], onEdit, onChange }: EventEmbedCardProps ) {
  const [embed, setEmbed] = useState(data);
  
  const handleChannelChange = (value: string | null) => {
    setEmbed((prev) => ({ ...prev, channelId: value }));
    onChange(embed, {channelId: value });
  }

  return (
    <div id={type} className="p-4 bg-gray-800 rounded-xl mb-4">
      <h2 className="font-bold text-2xl">{type} Embed</h2>
      <ChannelDropdown
        label="Channel Selection"
        value={embed.channelId}
        onChange={(value) => handleChannelChange(value)}
        channels={channels}
        className="py-3 mb-4"
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