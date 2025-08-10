import { getAllSpecies } from "@/lib/scoreboard/getAllSpecies";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allSpecies = getAllSpecies();

    return NextResponse.json(allSpecies);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to receive all Species Data: ${error}`},
      { status: 500 }
    );
  }
}