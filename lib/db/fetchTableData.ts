export default async function fetchTableData(tableName: string, guildId?: string) {
  try {
    let res;
    if (guildId) {
      res = await fetch(`/api/db/${tableName}/${guildId}`);
    } else {
      res = await fetch(`/api/db/${tableName}`)
    }

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