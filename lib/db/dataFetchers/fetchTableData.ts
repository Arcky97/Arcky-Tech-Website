export default async function fetchTableData(tableName: string, guildId?: string) {
  try {
    if (!tableName) throw new Error('No Tablename provided.');

    const isServer = typeof window === "undefined";
    const baseUrl = isServer
      ? process.env.NEXTAUTH_URL?.replace(/\$/, "")
      : ""

    const endPoint = guildId 
      ? `${baseUrl}/api/db/${tableName}/${guildId}`
      : `${baseUrl}/api/db/${tableName}`;

    const res = await fetch(endPoint);

    if (!res.ok) {
      if (res.status === 404) return [];
      throw new Error(`Failed to fetch ${tableName}`);
    }

    const data = await res.json();
    return data ?? [];
  } catch (error: unknown) {
    console.error(`Error fetching data from table "${tableName}" "${guildId ? `and guild "${guildId}"` : ""}:`, error);
    throw error;
  }
}