export const fetchDiscordChannels = async (guildId: string) => {
  try {
    if (!guildId) throw new Error('No guild ID provided.');

    const res = await fetch(`/api/discord/${guildId}/channels`);
    if (!res.ok) throw new Error('Failed to fetch Channels.');

    const data = await res.json();
    return data ?? null;
  } catch (error: any) {
    console.error(`Error fetching Channel for guild "${guildId}":`, error);
    throw error;
  }
};