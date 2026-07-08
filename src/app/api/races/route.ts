import { NextResponse } from "next/server";
import { getFeaturedRaces } from "@/lib/services/races";

export async function GET() {
  try {
    const races = await getFeaturedRaces();

    return NextResponse.json({ success: true, data: races }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
