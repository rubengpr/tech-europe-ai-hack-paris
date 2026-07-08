"use client";

import {
  ChevronDown,
  CloudRain,
  CloudSun,
  Droplets,
  Sun,
  Wind,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import type { WeatherBriefing, WeatherCondition } from "@/types/weather";

type WeatherSidebarSectionProps = {
  weather: WeatherBriefing;
};

const conditionIcons: Record<WeatherCondition, LucideIcon> = {
  "partly-cloudy": CloudSun,
  rain: CloudRain,
  storm: Zap,
  sunny: Sun,
};

const conditionCopy: Record<WeatherCondition, string> = {
  "partly-cloudy": "Partly cloudy",
  rain: "Rain",
  storm: "Storm risk",
  sunny: "Sunny",
};

export function WeatherSidebarSection({
  weather,
}: WeatherSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const CurrentIcon = conditionIcons[weather.condition];

  return (
    <section className="border-b border-slate-200 bg-sky-50/70 px-6 py-4">
      <div className="rounded-lg border border-sky-100 bg-white p-3.5 shadow-sm">
        <button
          type="button"
          className="flex w-full items-center justify-between gap-4 text-left"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          aria-expanded={isExpanded}
          aria-controls="weather-details"
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-amber-100 text-amber-700">
              <CurrentIcon aria-hidden="true" className="h-6 w-6" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                Weather
              </span>
              <span className="mt-1 block truncate text-lg font-semibold text-slate-950">
                {weather.temperatureC}° · {conditionCopy[weather.condition]}
              </span>
              <span className="mt-0.5 block truncate text-xs font-medium text-slate-500">
                {weather.location} · {weather.rainfallNext24hMm} mm next 24h
              </span>
            </span>
          </span>

          <span className="flex shrink-0 items-center gap-2 rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600">
            {isExpanded ? "Hide" : "More"}
            <ChevronDown
              aria-hidden="true"
              className={`h-4 w-4 transition ${isExpanded ? "rotate-180" : ""}`}
            />
          </span>
        </button>

        {isExpanded ? (
          <div id="weather-details">
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs font-medium text-slate-600">
              <WeatherMeta icon={Droplets} value={`${weather.humidityPct}%`} />
              <WeatherMeta icon={Wind} value={`${weather.windKmh} km/h`} />
              <WeatherMeta
                icon={CloudRain}
                value={`${weather.rainfallNext24hMm} mm`}
              />
            </div>

            <p className="mt-3 rounded-md border border-lime-200 bg-lime-50 px-3 py-2 text-sm font-medium leading-5 text-lime-900">
              {weather.irrigationSignal}
            </p>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {weather.forecast.map((day) => {
                const ForecastIcon = conditionIcons[day.condition];

                return (
                  <div
                    key={day.date}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2 py-2 text-center"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {day.label}
                    </p>
                    <ForecastIcon
                      aria-label={conditionCopy[day.condition]}
                      className="mx-auto mt-1.5 h-5 w-5 text-sky-700"
                    />
                    <p className="mt-1.5 text-sm font-semibold text-slate-950">
                      {day.highC}° / {day.lowC}°
                    </p>
                    <p className="mt-1 flex items-center justify-center gap-1 text-xs text-slate-500">
                      <CloudRain aria-hidden="true" className="h-3.5 w-3.5" />
                      {day.rainfallMm} mm
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function WeatherMeta({
  icon: Icon,
  value,
}: {
  icon: LucideIcon;
  value: string;
}) {
  return (
    <p className="flex items-center justify-center gap-1.5 rounded-md bg-slate-50 px-2 py-1.5">
      <Icon aria-hidden="true" className="h-3.5 w-3.5 text-sky-700" />
      {value}
    </p>
  );
}
