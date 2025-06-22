import { NextResponse } from "next/server";
import pool from "@/lib/db";

const allowedTables = ["GuildSettings", "LevelSystem", "LevelSettings", "EventEmbeds", "GeneratedEmbeds", "ModerationLogs", "PremiumUserAndGuilds", "ReactionRoles", "UserStats", "BotReplies", "BotStats", "DoggoBoardPins", "DoggoBoardSettings"];

// GET Request - Fetch data from the database
export async function GET(
  req: Request, { 
    params 
  }: { 
    params: Promise<{ table: string; guildId: string }> 
  }
) {
  try {
    const { table, guildId } = await params;

    if (!allowedTables.includes(table)) {
      return NextResponse.json({ error: "Table not allowed" }, { status: 400 });
    }

    const query = `SELECT * FROM \`${table}\` WHERE guildId = ?`;
    
    const [rows] = await pool.query(query, [guildId]);

    if (Array.isArray(rows) && rows.length === 0) {
      return NextResponse.json({ error: "Guild not found in the specified table" }, { status: 404 });
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// POST Request - Insert or update data in the database
export async function POST(
  req: Request, { 
    params 
  }: { 
    params: Promise<{ table: string; guildId: string }> 
  }
) {
  try {
    const { table, guildId } = await params;
    const body = await req.json(); // Extract data from the request body

    
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const fields = Object.keys(body).map((key) => `\`${key}\` = ?`).join(", ");
    const values = Object.values(body);

    if (!allowedTables.includes(table)) {
      return NextResponse.json({ error: "Table not allowed" }, { status: 400 });
    }

    const query = `UPDATE \`${table}\` SET ${fields} WHERE guildId = ?`;

    const [result] = await pool.query(query, [...values, guildId]);

    return NextResponse.json({ message: "Data updated successfully", result });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json({ error: "Database update error" }, { status: 500 });
  }
}

// DELETE Request - Remove data in the database
export async function DELETE(
  req: Request, {
    params
  }: {
    params: Promise<{ table: string; guildId: string }>
  }
) {
  try {
    const { table, guildId } = await params;
    
    if (!allowedTables.includes(table)) {
      return NextResponse.json({ error: "Table not allowed" }, { status: 400 });
    }

    const query = `DELETE FROM \`${table}\` WHERE guildId = ?`;

    await pool.query(query, [guildId]);

    return NextResponse.json({ message: "Data removed successfully"});
  } catch (error) {
    console.error("Error removing data:", error);
    return NextResponse.json({ error: "Database remove error" }, { status: 500 });
  }
}