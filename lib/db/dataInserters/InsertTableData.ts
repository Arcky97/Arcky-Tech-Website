import { GeneratedEmbed } from "@/types/db";

const isServer = typeof window === "undefined";
const baseUrl = isServer 
  ? process.env.NEXTAUTH_URL?.replace(/\$/, "")
  : "";

export const insertGeneratedEmbed = async (tableName: string, guildId: string, embed: GeneratedEmbed) => {
  try {
    if (!tableName) throw new Error('No Tablename provided.');

    const endPoint = `${baseUrl}/api/db/${tableName}/${guildId}`;

    const res = await fetch(endPoint, {
      method: "POST",
      body: JSON.stringify({ channelId: embed.channelId, title: embed.title, description: embed.description }),
      headers: { "Content-Type": "application/json"}
    });

    if (!res.ok) throw new Error('Failed to Add Embed to GeneratedEmbed Table.');

    const data = await res.json();

    console.log(data.result.insertId);

    return data.result.insertId ?? null;
  } catch (error) {
    console.error('Failed to add Embed Data for GeneratedEmbed:', error);    
  }
}