import { RowDataPacket } from "mysql2";
import { botDb } from "../dashboard/db";

interface GuildRow extends RowDataPacket {
  guildId: string;
}

export async function getBotGuildIds(): Promise<Set<string>> {
  const [rows] = await botDb.query<GuildRow[]>(
    "SELECT guildId FROM ?? WHERE deletionDate IS NULL", 
    ["GuildSettings"]
  );
  return new Set(rows.map(r => r.guildId));
}