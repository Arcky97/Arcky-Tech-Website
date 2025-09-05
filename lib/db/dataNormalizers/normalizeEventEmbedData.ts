import { EventEmbed, GeneratedEmbed } from "@/types/db";
import { createDefaultEventEmbed } from "@/types/db/bot/defaults/defaultEmbed";

type EventEmbedType = "welcome" | "leave" | "ban";

export type EventEmbedRaw = Omit<EventEmbed, "author" | "fields" | "footer"> & {
  author: string | null;
  fields: string | null;
  footer: string | null;
}

export type GeneratedEmbedRaw = Omit<GeneratedEmbed, "author" | "fields" | "footer"> & {
  author: string | null;
  fields: string | null;
  footer: string | null;
}

const REQUIRED_EVENTS: EventEmbedType[] = ["welcome", "leave", "ban"];


export function normalizeEventEmbedData(
  guildId: string,
  data: EventEmbedRaw[]
) {

  const parsedData = (data ?? []).map(embed => ({
    ...embed,
    author: embed.author ? JSON.parse(embed.author) : null,
    fields: embed.fields ? JSON.parse(embed.fields) : [],
    footer: embed.footer ? JSON.parse(embed.footer) : null
  }));

  const existingTypes = new Set(parsedData.map(e => e.type));

  const missing = REQUIRED_EVENTS.filter(t => !existingTypes.has(t)).map(type => 
    createDefaultEventEmbed(guildId, "", type)
  );

  return [...parsedData, ...missing];
}

export function normalizeGeneratedEmbedData(
  guildId: string,
  data: GeneratedEmbedRaw[]
) {

  const parsedData = (data ?? []).map(embed => ({
    ...embed,
    author: embed.author ? JSON.parse(embed.author) : null,
    fields: embed.fields ? JSON.parse(embed.fields) : [],
    footer: embed.footer ? JSON.parse(embed.footer) : null
  }));

  return [...parsedData];
}