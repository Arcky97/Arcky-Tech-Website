export default async function sendOrUpdateDiscordEmbed (guildId: string, embedId: number | null) {
  try {
    if (!guildId) throw new Error('No guild ID provided.');
    if (!embedId) throw new Error('No Embed ID provided.')
    const isServer = typeof window === "undefined";
    const baseUrl = isServer
      ? process.env.NEXTAUTH_URL?.replace(/\$/, "")
      : "";

    const endPoint = `${baseUrl}/api/discord/${guildId}/${embedId}`;

    const res = await fetch(endPoint, { method: "POST" });
    const data = await res.json();
    console.log(data);

    if (!res.ok) throw new Error('Failed to send Embed request');

    return data;
  } catch (error) {
    console.error(`Error sending Send Embed Request for guild "${guildId}" and embed "${embedId}":`, error);
    throw error;
  }
}