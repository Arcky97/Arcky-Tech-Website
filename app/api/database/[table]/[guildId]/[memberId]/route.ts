import { NextResponse } from "next/server";
import pool from "@/lib/db";

// POST Request - Insert or update data in the database
export async function POST(
  req: Request, { 
    params 
  }: { 
    params: Promise<{ table: string; guildId: string; memberId: string }> 
  }
) {
  try {
    const { table, guildId, memberId } = await params;
    const body = await req.json(); // Extract data from the request body

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    // Generate dynamic query for updating the row
    const fields = Object.keys(body).map((key) => `\`${key}\` = ?`).join(", ");
    const values = Object.values(body);

    // ✅ Use string interpolation for the table name (table name can't be parameterized)
    const query = `UPDATE \`${table}\` SET ${fields} WHERE guildId = ? AND memberId = ?`;

    // ✅ Execute the query with values + guildId
    const [result] = await pool.query(query, [...values, guildId, memberId]);

    return NextResponse.json({ message: "Data updated successfully", result });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json({ error: "Database update error" }, { status: 500 });
  }
}