import { NextResponse } from "next/server";

export async function GET(
  request: Request, { 
    params 
  }: { 
    params: Promise<{ guildId: string }> 
  }
) {
  const { guildId } = await params;

  if (!guildId) {
    return NextResponse.json({ error: "Guild ID is required"}, { status: 400 });
  }

  try {
    const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/channels`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch channels");
    }

    const channels = await response.json();
    return NextResponse.json(channels, { status: 200 });
  } catch (error) {
    console.error("Error fetching channels:", error);
    return NextResponse.json({ error: "Failed to fetch channels" }, { status: 500 });
  }
}