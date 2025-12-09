import { DiscordChannel } from "@/types/botAPI/discordChannels";

export default async function fetchDiscordChannels (guildId: string): Promise<DiscordChannel[]> {
  try {
    if (!guildId) throw new Error('No guild ID provided.');

    const isServer = typeof window === "undefined";
    const baseUrl = isServer
      ? process.env.NEXTAUTH_URL?.replace(/\$/, "")
      : ""

    console.log("Attempting request api fetch channels.");
    const endPoint = `${baseUrl}/api/discord/${guildId}/channels`

    const res = await fetch(endPoint);
    
    if (!res.ok) throw new Error('Failed to fetch Channels');

    console.log("Request api fetch channels successfull!");
    const data = await res.json();
    return data ?? null;
  } catch (error) {
    console.error(`Error fetching Channel for guild "${guildId}":`, error);
    throw error;
  }
}