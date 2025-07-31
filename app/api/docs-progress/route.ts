import { getDocumentationProgress } from "@/lib/documentation/docsProgress";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rootDir = path.join(process.cwd(), "content", "documentation");

    const progress = await getDocumentationProgress(rootDir);
    
    return NextResponse.json(progress);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to calculate documentation progress: ${error}`},
      { status: 500 }
    );
  }
}