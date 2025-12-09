export default async function sendOrUpdateDiscordEmbed (guildId: string, embedId: number | null) {
  try {
    if (!guildId) throw new Error('No guild ID provided.');
    if (!embedId) throw new Error('No Embed ID provided.')
    const isServer = typeof window === "undefined";
    const baseUrl = isServer
      ? process.env.NEXTAUTH_URL?.replace(/\$/, "")
      : "";

    console.log("Attemting api request send Embed.");
    const endPoint = `${baseUrl}/api/discord/${guildId}/${embedId}`;

    const res = await fetch(endPoint, { method: "POST" });
    const data = await res.json();

    if (!res.ok) throw new Error('Failed to send Embed request');

    console.log("Request api send Embed successfull!");
    return data;
  } catch (error) {
    console.error(`Error sending Send Embed Request for guild "${guildId}" and embed "${embedId}":`, error);
    throw error;
  }
}