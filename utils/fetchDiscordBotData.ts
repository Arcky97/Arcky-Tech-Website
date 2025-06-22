export const fetchDiscordBotData = async (guildId: string) => {
  try {
    if (!guildId) throw new Error('No guild ID provided.');

    const res = await fetch(`/api/guilds/${guildId}/bot`);
    if (!res.ok) throw new Error('Failed to fetch Bot Data.');

    const data = await res.json();
    return data ?? null;
  } catch (error: any) {
    console.error(`Error fetching Bot Data for guild "${guildId}":`, error);
    throw error;
  }
};