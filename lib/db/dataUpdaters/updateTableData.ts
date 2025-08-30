import { EventEmbedRaw } from "../dataNormalizers/normalizeEventEmbedData";

/*export default function updateTableData(tableName: string, guildId: string, columns: string[]) {

}*/

export const updateEventEmbedTableData = async (tableName: string, guildId: string, updatedData: Partial<EventEmbedRaw>) => {
  try {
    if (!tableName) throw new Error('No Tablename provided.');

    const isServer = typeof window === "undefined";
    const baseUrl = isServer 
      ? process.env.NEXTAUTH_URL?.replace(/\$/, "")
      : "";

    const endPoint = `${baseUrl}/api/db/${tableName}/${guildId}`;

    const res = await fetch(endPoint, {
      method: "POST",
      body: JSON.stringify(updatedData),
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) throw new Error('Failed to Update EventEmbed Table');

  } catch (error) {
    console.error('Failed to update Table Data for EventEmbed:', error);
  }
}