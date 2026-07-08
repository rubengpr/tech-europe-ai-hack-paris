import { NextResponse } from "next/server";
import { getDailyBriefing } from "@/lib/services/daily-briefing";
import { internalServerError } from "@/lib/utils/handle-error";

export async function POST() {
  try {
    const briefing = await getDailyBriefing();

    return NextResponse.json(
      { success: true, data: briefing },
      { status: 200 },
    );
  } catch {
    return internalServerError();
  }
}
