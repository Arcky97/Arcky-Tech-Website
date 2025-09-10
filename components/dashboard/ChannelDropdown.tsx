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
  defaultValue?: string | null;
  disabled?: boolean;
}

export default function ChannelDropdown({ label, value, onChange, channels, className = "", widthFull = true, defaultValue, disabled = false }: ChannelProps ) {
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
        className={clsx("border-1 border-gray-600 p-2.5 rounded-xl", widthFull ? "w-full" : "", disabled ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-gray-800 text-white focus:ring-blue-500")}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value || null)}
        disabled={disabled}
      >
        <option value="">{defaultValue ?? "No Channel selected"}</option>
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