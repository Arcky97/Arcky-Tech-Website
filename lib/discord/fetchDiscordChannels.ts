import { DiscordChannel } from "@/types/botAPI/discordChannels";

export default async function fetchDiscordChannels (guildId: string): Promise<DiscordChannel[]> {
  try {
    if (!guildId) throw new Error('No guild ID provided.');

    const isServer = typeof window === "undefined";
    const baseUrl = isServer
      ? process.env.NEXTAUTH_URL?.replace(/\$/, "")
      : ""

    const endPoint = `${baseUrl}/api/discord/${guildId}/channels`

    const res = await fetch(endPoint);
    
    if (!res.ok) throw new Error('Failed to fetch Channels');

    const data = await res.json();
    return data ?? null;
  } catch (error) {
    console.error(`Error fetching Channel for guild "${guildId}":`, error);
    throw error;
  }
}