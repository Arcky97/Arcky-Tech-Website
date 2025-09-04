"use client"

import { DiscordChannel } from "@/types/botAPI/discordChannels";
import clsx from "clsx";

interface ChannelProps {
  label?: string;
  value: string | string[] | null;
  onChange: (value: string | null) => void;
  channels: DiscordChannel[];
  className?: string;
  widthFull?: boolean;
}

export default function ChannelDropdown({ label, value, onChange, channels, className = "", widthFull = true}: ChannelProps ) {
  const groupedChannels: Record<string, { value: string; label: string}[]> = {};
//  let options;
  channels.forEach(channel => {
    if (channel.type !== 0) return;
    const category = channels.find(chan => chan.id === channel.parentId)?.name || "No Category";

    if (!groupedChannels[category]) groupedChannels[category] = [];
    groupedChannels[category].push({ value: channel.id, label: `# ${channel.name}`});
  });
/*  options = Object.entries(groupedChannels).flatMap(([category, options]) => ({
    label: category,
    options
  }));*/

  return (
    <div className={className}>
      {label && <label className="block text-white text-lg font-bold mb-2 max-h-auto">{label}</label>}
      <select
        className={clsx("bg-gray-800 text-white border-1 border-white/30 p-2.5 rounded-xl", widthFull ? "w-full" : "")}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value || null)}
      >
        <option value="">No Channel selected</option>
        {Object.entries(groupedChannels).map(([category, items]) => (
          <optgroup key={category} label={category}>
            {items.map(channel => (
              <option key={channel.value} value={channel.value}>
                {channel.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  )
}