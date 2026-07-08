import type { WeatherBriefing } from "@/types/weather";

const demoWeather: WeatherBriefing = {
  location: "Saclay plateau",
  observedAt: "2026-05-16T10:30:00.000Z",
  condition: "partly-cloudy",
  temperatureC: 26,
  feelsLikeC: 28,
  humidityPct: 54,
  windKmh: 14,
  rainfallNext24hMm: 1.8,
  irrigationSignal: "Dry window today. Prioritize stressed wheat before dusk.",
  forecast: [
    {
      date: "2026-05-17",
      label: "Sun",
      condition: "sunny",
      highC: 29,
      lowC: 16,
      rainfallMm: 0.4,
      windKmh: 12,
    },
    {
      date: "2026-05-18",
      label: "Mon",
      condition: "partly-cloudy",
      highC: 27,
      lowC: 15,
      rainfallMm: 2.1,
      windKmh: 16,
    },
    {
      date: "2026-05-19",
      label: "Tue",
      condition: "rain",
      highC: 22,
      lowC: 13,
      rainfallMm: 8.6,
      windKmh: 19,
    },
  ],
};

export async function getWeatherRecord() {
  return demoWeather;
}
