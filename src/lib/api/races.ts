import type { Race } from "@/types/race";

type RacesResponse = {
  success: true;
  data: Race[];
};

export async function fetchRaces() {
  const response = await fetch("/api/races");

  if (!response.ok) {
    throw new Error("Failed to fetch races");
  }

  const body = (await response.json()) as RacesResponse;

  return body.data;
}
