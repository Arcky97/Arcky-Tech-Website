export const fetchDiscordRoles = async (guildId: string) => {
  try {
    if (!guildId) throw new Error('No guild ID provided.');

    const res = await fetch(`/api/discord/${guildId}/roles`);
    if (!res.ok) throw new Error('Failed to fetch Roles.');

    const data = await res.json();
    return data ?? null;
  } catch (error: any) {
    console.error(`Error fetching Roles for guild "${guildId}":`, error);
    throw error;
  }
}