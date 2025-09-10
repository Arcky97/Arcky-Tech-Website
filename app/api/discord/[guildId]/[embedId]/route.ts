import { NextResponse } from "next/server";

export async function POST(
  req: Request, {
    params
  }: {
    params: Promise<{guildId: string, embedId: string}>
  }
) {
  const { guildId, embedId } = await params;

  if (!guildId || !embedId) {
    return NextResponse.json({ error: 'Guild ID and Embed ID are both required.' }, { status: 400 });
  }

  const apiUrl = process.env.API_URL;
  const apiToken = process.env.API_TOKEN;
  const botApiUrl = `${apiUrl}/api/discord/${guildId}/${embedId}/send-embed?token=${apiToken}`;

  try {
    const res = await fetch(botApiUrl, { method: "POST" });

    if (!res.ok) throw new Error("Failed to request send or update Embed.");

    const botResponse = await res.json();
    return NextResponse.json(botResponse, { status: res.status });
  } catch (error) {
    console.error('Error requesting to send embed:', error);
    return NextResponse.json({ error: "Failed request to send embed to bot." }, { status: 500 });
  }
}