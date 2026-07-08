import type { Parcel } from "@/types/parcel";

type ParcelCardProps = {
  parcel: Parcel;
};

const riskStyles = {
  low: "border-emerald-200 bg-emerald-50 text-emerald-700",
  medium: "border-amber-200 bg-amber-50 text-amber-800",
  high: "border-red-200 bg-red-50 text-red-700",
};

export function ParcelCard({ parcel }: ParcelCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">
            {parcel.name}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {parcel.crop} · {parcel.areaHa} ha · {parcel.location}
          </p>
        </div>
        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${riskStyles[parcel.riskLevel]}`}
        >
          {parcel.riskLevel}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-700">{parcel.summary}</p>

      <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
        <div>
          <dt className="text-slate-500">Soil</dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {parcel.soilMoisturePct}%
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">NDVI</dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {parcel.vegetationIndex}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">Rain</dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {parcel.rainfallMmNext48h} mm
          </dd>
        </div>
      </dl>

      <div className="mt-5 space-y-2">
        {parcel.sources.map((source) => (
          <div
            key={source.id}
            className="flex items-center justify-between gap-3 rounded-md bg-slate-50 px-3 py-2 text-sm"
          >
            <span className="font-medium text-slate-700">{source.label}</span>
            <span className="capitalize text-slate-500">{source.status}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
