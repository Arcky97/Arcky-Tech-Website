import { NextResponse } from "next/server";

export function checkRequestBody(body: { [key: string]: string }) {
  if (!body || Object.keys(body).length === 0) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  return true;
}