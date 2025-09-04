import { EventEmbedRaw, GeneratedEmbedRaw } from "../dataNormalizers/normalizeEventEmbedData";

const isServer = typeof window === "undefined";
const baseUrl = isServer 
  ? process.env.NEXTAUTH_URL?.replace(/\$/, "")
  : "";


export const updateEventEmbedTableData = async (tableName: string, guildId: string, type: "welcome" | "leave" | "ban", updatedData: Partial<EventEmbedRaw>) => {
  try {
    if (!tableName) throw new Error('No Tablename provided.');

    const endPoint = `${baseUrl}/api/db/${tableName}/${guildId}`;

    const res = await fetch(endPoint, {
      method: "PATCH",
      body: JSON.stringify({
        keys: { type: type },
        data: updatedData
      }),
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) throw new Error('Failed to Update EventEmbed Table');

  } catch (error) {
    console.error('Failed to update Table Data for EventEmbed:', error);
  }
}

export const updateGeneratedEmbedTableData = async (tableName: string, guildId: string, id: number | null, updatedData: Partial<GeneratedEmbedRaw>) => {
  try {
    if (!tableName) throw new Error('No Tablename provided.');
    if (!id) throw new Error("ID cannot be null.");

    const endPoint = `${baseUrl}/api/db/${tableName}/${guildId}`;

    const res = await fetch(endPoint, {
      method: "PATCH",
      body: JSON.stringify({ 
        keys: { id: id },
        data: updatedData
      }),
      headers: { "Content-Type": "application/json"}
    });

    if (!res.ok) throw new Error('Failed to Update GeneratedEmbed Table');
  } catch (error) {
    console.error('Failed to update Table Data for GeneratedEmbed:', error);
  }
}