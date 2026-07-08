"use client";

import { AudioLines, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { fetchDailyBriefing } from "@/lib/api/daily-briefing";
import type { DailyBriefing } from "@/types/daily-briefing";

const AUDIO_PLAYBACK_RATE = 1;

export function DailyBriefingCard() {
  const [briefing, setBriefing] = useState<DailyBriefing | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const audioSrc = useMemo(() => {
    if (!briefing?.audio) {
      return "";
    }

    return `data:${briefing.audio.contentType};base64,${briefing.audio.base64}`;
  }, [briefing]);

  async function handleGenerateBriefing() {
    setError("");
    setBriefing(null);
    setIsLoading(true);

    try {
      const nextBriefing = await fetchDailyBriefing();

      setBriefing(nextBriefing);
    } catch {
      setError("It was not possible to generate the daily briefing.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="border-b border-slate-200 bg-slate-50 px-6 py-4">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-[linear-gradient(135deg,#fafafa_0%,#ffffff_68%,#f1f5f9_100%)] p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center">
              <div className="min-w-0">
                <p className="text-base font-semibold text-slate-950">
                  Daily Briefing
                </p>
                <div className="mt-2 flex h-5 items-end gap-1.5">
                  {[9, 15, 11, 18, 13, 7, 16, 10].map((height, index) => (
                    <span
                      key={`${height}-${index}`}
                      className="w-1 rounded-full bg-slate-400/70"
                      style={{ height }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-neutral-800 text-white shadow-sm transition-all duration-300 ease-out hover:bg-neutral-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-400"
              onClick={handleGenerateBriefing}
              disabled={isLoading}
              aria-label={
                isLoading ? "Generating daily briefing" : "Play daily briefing"
              }
            >
              {isLoading ? (
                <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              ) : (
                <AudioLines aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {briefing ? (
          <div className="space-y-3 p-4">
            <p className="rounded-md border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm leading-6 text-slate-700">
              {briefing.script}
            </p>

            {audioSrc ? (
              <div className="rounded-md border border-slate-200 bg-slate-50 p-2">
                <audio
                  className="w-full"
                  controls
                  src={audioSrc}
                  autoPlay
                  onLoadedMetadata={(event) => {
                    event.currentTarget.playbackRate = AUDIO_PLAYBACK_RATE;
                  }}
                />
              </div>
            ) : null}

            {briefing.fallbackReason ? (
              <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium leading-5 text-amber-800">
                {briefing.fallbackReason}
              </p>
            ) : null}
          </div>
        ) : null}

        {error ? (
          <p className="m-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  );
}
