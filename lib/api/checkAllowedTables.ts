import { NextResponse } from "next/server";

const allowedTables = ["GuildSettings", "LevelSettings", "LevelSystem", "GeneratedEmbeds", "EventEmbeds"];

export function checkAllowedTables(table: string) {
  if (!allowedTables.includes(table)) {
    return NextResponse.json({ error: `Table ${table} is not allowed!` }, { status: 400 });
  }
  return true;
}