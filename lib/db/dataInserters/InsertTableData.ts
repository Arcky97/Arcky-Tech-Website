import { GeneratedEmbed } from "@/types/db";
import getEndPointUrl from "../getEndPointUrl";
import { createCatchErrorMessage, createResErrorMessage, createTableErrorMessage } from "../createErrorMessage";
import { createFetchPostInit } from "../createFetchRequestInit";

export const insertGeneratedEmbed = async (tableName: string, guildId: string, embed: GeneratedEmbed) => {
  try {
    if (!tableName) throw new Error(createTableErrorMessage());

    const endPoint = getEndPointUrl(tableName, guildId);

    const res = await fetch(endPoint, createFetchPostInit({ channelId: embed.channelId, title: embed.title, description: embed.description }));

    if (!res.ok) throw new Error(createResErrorMessage('add embed', tableName));

    const data = await res.json();

    return data.result.insertId ?? null;
  } catch (error) {
    console.error(createCatchErrorMessage('insert', tableName, error));    
  }
}