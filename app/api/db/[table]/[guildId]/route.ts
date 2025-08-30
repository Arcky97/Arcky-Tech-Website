import { NextResponse } from "next/server";
import { botDb } from "@/lib/dashboard/db";

const allowedTables = ["GuildSettings", "LevelSettings", "LevelSystem", "GeneratedEmbeds", "EventEmbeds"];

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
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(
  req: Request, {
    params
  }: {
    params: Promise<{table: string; guildId: string; }>
  }
) {
  try {
    const { table, guildId } = await params;
    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "Inavid request body" }, { status: 400 });
    }

    const fields = Object.keys(body).map((key) => `\`${key}\` = ?`).join(", ");
    const values = Object.values(body);

    if (!allowedTables.includes(table)) return NextResponse.json(
      { error: "Table not allowed"}, { status: 400 }
    );

    const query = `UPDATE \`${table}\` SET ${fields} WHERE guildID = ?`;

    const [result] = await botDb.query(query, [...values, guildId]);

    return NextResponse.json({ message: "Data updated successfully", result});
  } catch (error) {
    console.error("Error update data:", error);
    return NextResponse.json({ error: "Database update error" }, { status: 500 });
  }
}