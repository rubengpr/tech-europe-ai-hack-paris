import "server-only";

const SLNG_TTS_URL = "https://api.slng.ai/v1/tts/deepgram/aura:2";
const SLNG_TTS_MODEL = "aura-2-arcas-en";

export class SlngUnavailableError extends Error {
  constructor() {
    super("SLNG TTS unavailable");
  }
}

export function hasSlngConfig() {
  return Boolean(process.env.SLNG_API_KEY?.trim());
}

export async function synthesizeSpeech(text: string) {
  const apiKey = process.env.SLNG_API_KEY?.trim();

  if (!apiKey) {
    throw new SlngUnavailableError();
  }

  const response = await fetch(SLNG_TTS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      container: "wav",
      encoding: "linear16",
      model: SLNG_TTS_MODEL,
      sample_rate: 24000,
      text,
    }),
  });

  if (!response.ok) {
    throw new SlngUnavailableError();
  }

  const audio = await response.arrayBuffer();

  return {
    contentType: "audio/wav" as const,
    base64: Buffer.from(audio).toString("base64"),
  };
}
