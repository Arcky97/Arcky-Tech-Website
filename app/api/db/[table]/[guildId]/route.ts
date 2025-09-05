import { NextResponse } from "next/server";
import { botDb } from "@/lib/dashboard/db";
import { checkAllowedTables } from "@/lib/api/checkAllowedTables";
import { checkRequestBody } from "@/lib/api/checkRequestBody";

export async function GET(
  req: Request, {
    params
  }: {
    params: Promise<{table: string; guildId: string }>
  }
) {
  try {
    const { table, guildId } = await params;

    const validateTable = checkAllowedTables(table);
    if (validateTable !== true) return validateTable;

    const query = `SELECT * FROM ?? WHERE guildId = ?`;

    const [rows] = await botDb.query(query, [table, guildId]);

    if (Array.isArray(rows) && rows.length === 0) {
      return NextResponse.json({ error: "Guild not found in the specified table."}, { status: 404 });
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Database Get Error" }, { status: 500 });
  }
}

export async function POST(
  req: Request, {
    params 
  }: {
    params: Promise<{table: string; guildId: string }>
  }
) {
  try {
    const { table, guildId } = await params;

    const validateTable = checkAllowedTables(table);
    if (validateTable !== true) return validateTable;

    const body = await req.json();
    
    const validateBody = checkRequestBody(body);
    if (validateBody !== true) return validateBody;

    const keys = ["guildId", ...Object.keys(body)];
    const values = [guildId, ...Object.values(body)];
    const placeholders = keys.map(() => "?").join(", ");
    const columns = keys.map((key) => `\`${key}\``).join(", ");

    const query = `INSERT INTO ?? (${columns}) VALUES (${placeholders})`;

    const [result] = await botDb.query(query, [table, ...values]);

    return NextResponse.json({ message: "Data inserted successfully", result});
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json({ error: "Database Insert Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request, {
    params
  }: {
    params: Promise<{table: string; guildId: string; }>
  }
) {
  try {
    const { table, guildId } = await params;

    const validateTable = checkAllowedTables(table);
    if (validateTable !== true) return validateTable;

    const { keys, data } = await req.json();

    const validateBody = checkRequestBody(data);
    if (validateBody !== true) return validateBody;

    const setClause = Object.keys(data)
      .map((key) => `\`${key}\` = ?`)
      .join(", ");

    const whereClause = ["guildId = ?", ...Object.keys(keys).map((k) => `\`${k}\` = ?`)].join(" AND ");

    const query = `UPDATE ?? SET ${setClause} WHERE ${whereClause}`;

    const values = [table, ...Object.values(data), guildId, ...Object.values(keys)];

    const [result] = await botDb.query(query, values);

    return NextResponse.json({ message: "Data updated successfully", result});
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json({ error: "Database Update Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request, {
    params
  }: {
    params: Promise<{ table: string; guildId: string }>
  }
) {
  try {
    const { table, guildId } = await params;

    const validateTable = checkAllowedTables(table);
    if (validateTable !== true) return validateTable;

    const body = await req.json();

    const validateBody = checkRequestBody(body);
    if (validateBody !== true) return validateBody;
    
    const keys = Object.keys(body);
    const values = Object.values(body);

    const whereClause = keys.map((key) => `\`${key}\` = ?`).join(' AND ');

    const query = `DELETE FROM ?? WHERE guildId = ? AND ${whereClause}`;

    await botDb.query(query, [table, guildId, ...values]);

    return NextResponse.json({ success: true, deleted: body });
  } catch (error) {
    console.error("Error deleting data:", error);
    return NextResponse.json({ error: "Database Remove Error" }, { status: 500 });
  }
}