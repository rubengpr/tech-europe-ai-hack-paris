import type { Race } from "@/types/race";

const races: Race[] = [
  {
    id: "ultra-pirineu",
    name: "Ultra Pirineu",
    location: "Baga",
    province: "Barcelona",
    date: "2026-10-03",
    distanceKm: 100,
    elevationGainM: 6600,
  },
  {
    id: "trail-cap-de-creus",
    name: "Trail Cap de Creus",
    location: "Roses",
    province: "Girona",
    date: "2026-04-12",
    distanceKm: 42,
    elevationGainM: 2100,
  },
  {
    id: "cursa-vall-de-boi",
    name: "Cursa Vall de Boi",
    location: "Barruera",
    province: "Lleida",
    date: "2026-07-18",
    distanceKm: 24,
    elevationGainM: 1400,
  },
];

export async function listRaces() {
  return races;
}
