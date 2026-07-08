import type { Race } from "@/types/race";

type RaceCardLabels = {
  distance: string;
  elevationGain: string;
  province: string;
};

type RaceCardProps = {
  labels: RaceCardLabels;
  race: Race;
};

export function RaceCard({ labels, race }: RaceCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(race.date));

  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="space-y-1">
        <p className="text-sm font-medium text-emerald-700">{formattedDate}</p>
        <h3 className="text-xl font-semibold text-zinc-950">{race.name}</h3>
        <p className="text-sm text-zinc-600">
          {race.location}, {race.province}
        </p>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-zinc-500">{labels.distance}</dt>
          <dd className="mt-1 font-semibold text-zinc-950">
            {race.distanceKm} km
          </dd>
        </div>
        <div>
          <dt className="text-zinc-500">{labels.elevationGain}</dt>
          <dd className="mt-1 font-semibold text-zinc-950">
            {race.elevationGainM} m
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="text-zinc-500">{labels.province}</dt>
          <dd className="mt-1 font-semibold text-zinc-950">{race.province}</dd>
        </div>
      </dl>
    </article>
  );
}
