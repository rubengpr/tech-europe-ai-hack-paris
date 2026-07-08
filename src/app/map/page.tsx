import { AppShell } from "@/components/layout/app-shell";
import { MapWorkspace } from "@/components/map/map-workspace";
import { listParcels } from "@/lib/services/parcels";
import { getWeatherBriefing } from "@/lib/services/weather";

export default async function MapPage() {
  const [parcels, weather] = await Promise.all([
    listParcels(),
    getWeatherBriefing(),
  ]);

  return (
    <AppShell>
      <MapWorkspace parcels={parcels} weather={weather} />
    </AppShell>
  );
}
