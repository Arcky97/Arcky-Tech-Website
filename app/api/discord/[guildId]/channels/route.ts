import { NextResponse } from "next/server";

export async function GET(
  request: Request, {
    params
  }: {
    params: Promise<{guildId: string}>
  }
) {
  const { guildId } = await params;

  if (!guildId) {
    return NextResponse.json({ error: 'Guild ID is required' }, { status: 400 });
  }

  const apiUrl = process.env.API_URL;
  const apiToken = process.env.API_TOKEN;
  const botApiUrl = `${apiUrl}/api/discord/${guildId}/channels?token=${apiToken}`;
  
  try {
    console.log("Attempting request fetch channels from discord.")
    const res = await fetch(botApiUrl);
    
    const data = await res.json();
    
    if (!res.ok) throw new Error(data.message || "Failed to fetch channels");

    console.log("Request fetching channels from discord successfull!")
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching channels:', error);
    return NextResponse.json({ error: "Failed to fetch channels from bot." }, { status: 500 });
  }
}