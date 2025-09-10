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
  const [cooldowns, setCooldowns] = useState<Map<string, number>>(new Map());
  
  const handleChannelChange = (value: string | null) => {
    onChange(data, {channelId: value });
  }

  const startCooldown = (key: string, duration: number) => {
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
    <div id={type} className="p-4 bg-gray-800 rounded-xl mb-4">
      <h2 className="sticky lg:top-28 top-33 pb-2 z-18 font-bold text-2xl bg-gray-800">{type} Embed</h2>
      <div className="">
        <ChannelDropdown
          label="Channel Selection"
          value={data.channelId}
          onChange={(value) => {
            handleChannelChange(value)
            startCooldown(`channel-${type}`, 5)
          }}
          channels={cooldowns.has(`channel-${type}`) ? [] : channels}
          className="py-3 mb-4"
          defaultValue={cooldowns.has(`channel-${type}`) ? `Channel Cooldown (${cooldowns.get(`channel-${type}`)})` : null}
          disabled={cooldowns.has(`channel-${type}`)}
        />
        <h3 className="font-bold text-lg mb-2">Embed Preview</h3>
        <EmbedPreview embed={data}/>
        <ColorButton 
          color="green-500" 
          text={`Edit Embed ${cooldowns.has(`edit-${type}`) ? `(${cooldowns.get(`edit-${type}`)})` : ""}`}
          action={() => {
            onEdit(data || {});
            startCooldown(`edit-${type}`, 15);
          }}
          disabled={cooldowns.has(`edit-${type}`)}
        />
      </div>
    </div>
  )
}