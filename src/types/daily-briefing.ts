export type DailyBriefingAudio = {
  contentType: "audio/wav";
  base64: string;
};

export type DailyBriefing = {
  script: string;
  audio: DailyBriefingAudio | null;
  fallbackReason?: string;
};
