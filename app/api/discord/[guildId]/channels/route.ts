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

  const apiToken = process.env.API_TOKEN;
  const botApiUrl = `http://localhost:3011/api/discord/${guildId}/channels?token=${apiToken}`;
  try {
    const res = await fetch(botApiUrl);
    
    const data = await res.json();
    
    if (!res.ok) throw new Error(data.message || "Failed to fetch channels");

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching channels:', error);
    return NextResponse.json({ error: "Failed to fetch channels from bot." }, { status: 500 });
  }
}