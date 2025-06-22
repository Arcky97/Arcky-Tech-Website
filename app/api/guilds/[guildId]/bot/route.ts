import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest, { 
    params 
  }: { 
    params: Promise<{ guildId: string }> 
  }
) {
  const { guildId } = await params;

  const apiToken = process.env.API_TOKEN;
  const botApiUrl = `http://localhost:3011/api/server-data?guildId=${guildId}&token=${apiToken}`;

  try {
    const res = await fetch(botApiUrl);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data from bot'}, { status: 500 });
  }
}