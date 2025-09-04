import { DiscordEmbed } from "@/types/discordEmbed";

export interface DBEmbed extends DiscordEmbed {
  guildId: string;
  channelId: string | null;
  deletionDate: boolean;
}

export interface EventEmbed extends DBEmbed {
  type: 'welcome' | 'leave' | 'ban';
}

export interface GeneratedEmbed extends DBEmbed {
  id: number | null;
  messageId: string | null;
}