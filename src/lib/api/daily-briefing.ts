import type { DailyBriefing } from "@/types/daily-briefing";

type DailyBriefingApiResponse =
  | {
      success: true;
      data: DailyBriefing;
    }
  | {
      error: string;
    };

export async function fetchDailyBriefing() {
  const response = await fetch("/api/daily-briefing", {
    method: "POST",
  });
  const body = (await response.json()) as DailyBriefingApiResponse;

  if (!response.ok || "error" in body) {
    throw new Error("Daily briefing request failed");
  }

  return body.data;
}
