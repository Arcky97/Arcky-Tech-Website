import { NextResponse } from "next/server";
import { botDb } from "@/lib/dashboard/db";

const allowedTables = ["GuildSettings", "LevelSettings", "LevelSystem"];

export async function GET(
  req: Request, {
    params
  }: {
    params: Promise<{table: string; guildId: string }>
  }
) {
  try {
    const { table, guildId } = await params;

    if (!allowedTables.includes(table)) return NextResponse.json(
      { error: "Table not allowed"}, { status: 400 }
    );

    const query = `SELECT * FROM \`${table}\` WHERE guildId = ?`;

    const [rows] = await botDb.query(query, [guildId]);

    if (Array.isArray(rows) && rows.length === 0) {
      return NextResponse.json({ error: "Guild not found in the specified table."}, { status: 404 });
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Errror fetching data:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}