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
    return NextResponse.json({ error: "Guild ID is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch roles");
    }

    const roles = await response.json();
    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return NextResponse.json({ error: "Failed to fetch roles" }, { status: 500 });
  }
}