import { DiscordEmbed } from "@/types/discordEmbed";

export interface DBEmbeds extends DiscordEmbed {
  guildId: string;
  channelId: string;
  deletionDate: Date;
}

export interface EventEmbeds extends DBEmbeds {
  type: 'welcome' | 'leave' | 'ban';
}

export interface GeneratedEmbeds extends DBEmbeds {
  messageId: string;
}