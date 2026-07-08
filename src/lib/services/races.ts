import { listRaces } from "@/lib/db/races";

export async function getFeaturedRaces() {
  const races = await listRaces();

  return races.slice(0, 3);
}
