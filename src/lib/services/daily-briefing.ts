import "server-only";

import { createOpenAIClient } from "@/lib/integrations/openai/client";
import { synthesizeSpeech } from "@/lib/integrations/slng/client";
import { listParcels } from "@/lib/services/parcels";
import { getWeatherBriefing } from "@/lib/services/weather";
import { formatExpectedHarvestDate } from "@/lib/utils/format";
import type { DailyBriefing } from "@/types/daily-briefing";
import type { Parcel } from "@/types/parcel";
import type { WeatherBriefing } from "@/types/weather";

const DAILY_BRIEFING_MODEL = "gpt-5.4-mini";
const DAILY_BRIEFING_FARMER_NAME = "Ruben";
const MAX_SCRIPT_LENGTH = 700;

const SYSTEM_PROMPT = [
  "You write daily spoken farm briefings for non-technical farmers.",
  "Use only the provided parcel and weather data.",
  "Do not invent facts, dates, locations, crop conditions, or actions.",
  "Use farmSummary as the source of truth for counts, attention parcels, nearest harvest, and recommended action.",
  "A parcel needs attention only when it is listed in farmSummary.attentionParcelNames.",
  "Keep it under 90 words.",
  "Always start with a short greeting that uses the farmer's name.",
  "Do not use numbered bullet points.",
  "Do not use markdown bullets, symbols, headings, or list formatting.",
  "Use short spoken sentences, separated by natural pauses.",
  "Write one briefing for the whole farm, not one briefing per parcel.",
  "Focus on dynamic information that can change today or this week.",
  "Do not mention static parcel details like total hectares, parcel area, parcel count, crop list, or location unless needed for the advice.",
  "Mention whether any fields need attention.",
  "Mention whether rain is expected in the next days and how that affects field work.",
  "Mention the nearest harvest only if it is soon enough to affect today's planning.",
  "End with one clear recommended action.",
  "Use everyday farming language.",
  "Avoid technical terms like vegetation index, NDVI, API, sensor threshold, or risk score.",
  "Avoid sounding like a dashboard.",
  "Tone: practical, calm, concise, and demo-friendly.",
].join("\n");

class DailyBriefingScriptUnavailableError extends Error {
  constructor() {
    super("Daily briefing script unavailable");
  }
}

export async function getDailyBriefing(): Promise<DailyBriefing> {
  const [parcels, weather] = await Promise.all([
    listParcels(),
    getWeatherBriefing(),
  ]);

  const script = await generateBriefingScript(
    DAILY_BRIEFING_FARMER_NAME,
    parcels,
    weather,
  );

  try {
    const audio = await synthesizeSpeech(script);

    return {
      script,
      audio,
    };
  } catch {
    return {
      script,
      audio: null,
      fallbackReason: "Audio is unavailable; showing text briefing.",
    };
  }
}

async function generateBriefingScript(
  farmerName: string,
  parcels: Parcel[],
  weather: WeatherBriefing,
) {
  const client = createOpenAIClient();

  if (!client) {
    throw new DailyBriefingScriptUnavailableError();
  }

  try {
    const farmSummary = createFarmSummary(parcels, weather);
    const response = await client.responses.create({
      model: DAILY_BRIEFING_MODEL,
      input: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: JSON.stringify({
            task: "Create today's spoken farm briefing.",
            farmerName,
            farmSummary,
            parcels: parcels.map((parcel) => ({
              name: parcel.name,
              status: parcel.status,
              harvestDays: parcel.harvestDays,
              riskLevel: parcel.riskLevel,
              soilMoisturePct: parcel.soilMoisturePct,
              vegetationIndex: parcel.vegetationIndex,
              rainfallMmNext48h: parcel.rainfallMmNext48h,
              summary: parcel.summary,
              actions: parcel.actions
                .filter((action) => !action.completed)
                .map((action) => ({
                  label: action.label,
                  description: action.description,
                })),
            })),
            weather: {
              location: weather.location,
              condition: weather.condition,
              temperatureC: weather.temperatureC,
              rainfallNext24hMm: weather.rainfallNext24hMm,
              irrigationSignal: weather.irrigationSignal,
              forecast: weather.forecast,
            },
          }),
        },
      ],
    });

    return normalizeScript(response.output_text);
  } catch {
    throw new DailyBriefingScriptUnavailableError();
  }
}

function createFarmSummary(parcels: Parcel[], weather: WeatherBriefing) {
  const attentionParcels = parcels.filter(
    (parcel) => parcel.status === "needs-attention",
  );
  const nearestHarvest = [...parcels].sort(
    (first, second) => first.harvestDays - second.harvestDays,
  )[0];
  const priorityParcel = attentionParcels[0] ?? nearestHarvest ?? parcels[0];
  const priorityAction =
    priorityParcel?.actions.find((action) => !action.completed)?.label ??
    "keep monitoring parcel conditions today";

  return {
    attentionParcelCount: attentionParcels.length,
    attentionParcelNames: attentionParcels.map((parcel) => parcel.name),
    weatherImpact: weather.irrigationSignal,
    nearestHarvestParcelName: nearestHarvest?.name ?? "",
    nearestHarvestDate: nearestHarvest
      ? formatExpectedHarvestDate(nearestHarvest.harvestDays)
      : "",
    nearestHarvestDays: nearestHarvest?.harvestDays ?? null,
    priorityParcelName: priorityParcel?.name ?? "",
    recommendedAction: priorityAction,
  };
}

function normalizeScript(script: string) {
  const normalized = script.replace(/\s+/g, " ").trim();

  if (!normalized) {
    throw new DailyBriefingScriptUnavailableError();
  }

  if (normalized.length <= MAX_SCRIPT_LENGTH) {
    return normalized;
  }

  return `${normalized.slice(0, MAX_SCRIPT_LENGTH - 1).trim()}.`;
}
