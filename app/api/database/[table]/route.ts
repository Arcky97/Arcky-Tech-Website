import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  req: Request, { 
    params 
  }: { 
    params: Promise<{ table: string }> 
  }) {
  try {
    const { table } = await params;

    // Check if ?schema is true
    const url = new URL(req.url);
    const includeSchema = url.searchParams.get("schema") === "true";

    // Query table data first
    const [rows] = await pool.query(`SELECT * FROM ??`, [table]);
    // Query schema data next
    const [schema] = await pool.query(`SELECT COLUMN_NAME, DATA_TYPE, COLUMN_KEY, COLUMN_DEFAULT, CHARACTER_MAXIMUM_LENGTH, ORDINAL_POSITION FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ?`, [table]);
    // Pass table data and schema data as array if schema is wanted, else just table data.
    return NextResponse.json(includeSchema ? [rows, schema] : rows);
  } catch (error) {
    console.error("Error fetching data.", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

