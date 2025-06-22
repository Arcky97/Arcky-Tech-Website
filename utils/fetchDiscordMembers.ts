export const fetchDiscordMembers = async (guildId: string) => {
  try {
    if (!guildId) throw new Error('No guild ID provided.');

    const res = await fetch(`/api/discord/${guildId}/members`);
    if (!res.ok) throw new Error('Failed to fetch Members.');

    const data = await res.json();
    return data ?? null;
  } catch (error: any) {
    console.error(`Error fetching Members for guild "${guildId}":`, error);
    throw error;
  }
};