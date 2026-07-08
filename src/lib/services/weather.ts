import { getWeatherRecord } from "@/lib/db/weather";

export async function getWeatherBriefing() {
  return getWeatherRecord();
}
