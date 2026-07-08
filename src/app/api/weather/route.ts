import { NextResponse } from "next/server";
import { getWeatherBriefing } from "@/lib/services/weather";
import { internalServerError } from "@/lib/utils/handle-error";

export async function GET() {
  try {
    const briefing = await getWeatherBriefing();

    return NextResponse.json(
      { success: true, data: briefing },
      { status: 200 },
    );
  } catch {
    return internalServerError();
  }
}
