import { getBotGuildIds } from "@/lib/db/getBotGuildIds";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const guildId = searchParams.get("guild_id");
  
  if (!code || !guildId) {
    return NextResponse.redirect(new URL("/doggo-bot/servers", req.url));
  }

  const botGuilds = await getBotGuildIds();
  const isBotInGuild = botGuilds.has(guildId);

  if (isBotInGuild) {
    return NextResponse.redirect(new URL(`/doggo-bot/dashboard/${guildId}/home`, req.url));
  } else {
    return NextResponse.redirect(new URL(`/doggo-bot/servers`, req.url));
  }
}