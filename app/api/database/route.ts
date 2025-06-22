import { NextResponse } from "next/server";

const adminIds = process.env.DB_IDS?.split(',');

export async function GET(request: Request) {
  const userId = request.headers.get('User-ID');

  if (adminIds?.includes(userId!)) {
    return NextResponse.json({ isAdmin: true });
  } else {
    return NextResponse.json({ isAdmin: false }, { status: 403 });
  }
}