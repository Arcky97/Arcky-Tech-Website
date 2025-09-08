"use client"

import { EventEmbed } from "@/types/db";
import EmbedPreview from "./EmbedPreview";
import { DiscordChannel } from "@/types/botAPI/discordChannels";
import ChannelDropdown from "./ChannelDropdown";
import ColorButton from "../ColorButton";

type EventType = "welcome" | "leave" | "ban";

interface EventEmbedCardProps {
  type: EventType;
  data: EventEmbed;
  channels: DiscordChannel[];
  onEdit: (embed: EventEmbed) => void;
  onChange: (data: EventEmbed, channel: Partial<EventEmbed>) => void;
}

export default function EventEmbedCard({ type, data, channels = [], onEdit, onChange }: EventEmbedCardProps ) {
  
  const handleChannelChange = (value: string | null) => {
    onChange(data, {channelId: value });
  }

  return (
    <div id={type} className="p-4 bg-gray-800 rounded-xl mb-4">
      <h2 className="sticky lg:top-28 top-33 pb-2 z-18 font-bold text-2xl bg-gray-800">{type} Embed</h2>
      <div className="">
        <ChannelDropdown
          label="Channel Selection"
          value={data.channelId}
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
    </div>
  )
}