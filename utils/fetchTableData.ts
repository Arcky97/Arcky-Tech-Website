export const fetchTableData = async (tableName: string, guildId?: string, schema?: boolean) => {
  try {
    let res;
    if (guildId) {
      res = await fetch(`/api/database/${tableName}/${guildId}`);
    } else {
      res = await fetch(`/api/database/${tableName}${schema ? "?schema=true" : ''}`);
    }

    if (!res.ok) {
      if (res.status === 404) {
        return [];
      }
      throw new Error(`Failed to fetch ${tableName}`);
    }

    const data = await res.json();
    return data ?? null;
  } catch (error: any) {
    console.error(`Error fetching data for table "${tableName}" ${guildId ? ` and guild "${guildId}"`: ""}:`, error);
    throw error;
  }
};