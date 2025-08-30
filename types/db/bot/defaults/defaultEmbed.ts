import { DiscordEmbed } from "@/types/discordEmbed";
import { DBEmbed, EventEmbed, GeneratedEmbed } from "../eventAndGeneratedEmbeds";

export const createDefaultDiscordEmbed = (): DiscordEmbed => ({
  message: null,
  color: null,
  author: { name: null, url: null, iconUrl: null },
  title: "",
  url: null,
  description: "",
  fields: [],
  imageUrl: null,
  thumbnailUrl: null,
  footer: { text: null, iconUrl: null },
  timeStamp: new Date()
});

export const createDefaultDBEmbed = (
  guildId: DBEmbed["guildId"],
  channelId: DBEmbed["channelId"]
): DBEmbed => ({
  ...createDefaultDiscordEmbed(),
  guildId,
  channelId,
  deletionDate: false
});

export const createDefaultEventEmbed = (
  guildId: DBEmbed["guildId"],
  channelId: DBEmbed["channelId"],
  type: EventEmbed["type"]
): EventEmbed => ({
  ...createDefaultDBEmbed(guildId, channelId),
  type
});

export const createDefaultGeneratedEmbed = (
  guildId: DBEmbed["guildId"],
  channelId: DBEmbed["channelId"]
): GeneratedEmbed => ({
  ...createDefaultDBEmbed(guildId, channelId),
  messageId: ""
});