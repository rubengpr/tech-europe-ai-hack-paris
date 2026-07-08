import type { Farmer } from "@/types/farmer";
import type { Parcel } from "@/types/parcel";

export const demoFarmer: Farmer = {
  id: "farmer-1",
  name: "Claire Martin",
  farmName: "Ferme du Plateau",
  region: "Ile-de-France",
  parcelsCount: 3,
};

export const demoParcels: Parcel[] = [
  {
    id: "parcel-north-wheat",
    name: "North Wheat Field",
    crop: "Winter wheat",
    areaHa: 18.4,
    status: "needs-attention",
    harvestDays: 12,
    location: "Meaux, France",
    riskLevel: "high",
    soilMoisturePct: 22,
    vegetationIndex: 0.46,
    temperatureC: 29,
    rainfallMmNext48h: 2,
    center: { lat: 48.9604, lng: 2.8883 },
    boundary: [
      { lat: 48.9651, lng: 2.8782 },
      { lat: 48.9664, lng: 2.8981 },
      { lat: 48.9557, lng: 2.9004 },
      { lat: 48.9548, lng: 2.8816 },
      { lat: 48.9651, lng: 2.8782 },
    ],
    summary:
      "Low soil moisture and weak vegetation signal indicate drought stress in the north-east section.",
    sources: [
      {
        id: "satellite-ndvi",
        label: "Satellite NDVI",
        status: "fresh",
        updatedAt: "2026-05-16T09:15:00.000Z",
        summary: "Vegetation index down 12% compared with last week.",
      },
      {
        id: "soil-sensor",
        label: "Soil sensor",
        status: "fresh",
        updatedAt: "2026-05-16T10:05:00.000Z",
        summary: "Topsoil moisture below the crop comfort threshold.",
      },
      {
        id: "weather",
        label: "Weather API",
        status: "fresh",
        updatedAt: "2026-05-16T10:20:00.000Z",
        summary: "Only light rainfall expected in the next 48 hours.",
      },
    ],
    actions: [
      {
        id: "schedule-irrigation",
        label: "Schedule irrigation",
        description: "Apply 18 mm within 24 hours if water allocation allows.",
        completed: false,
      },
      {
        id: "drone-scout",
        label: "Request drone scout",
        description: "Confirm whether stress is localized or field-wide.",
        completed: false,
      },
    ],
  },
  {
    id: "parcel-east-corn",
    name: "East Corn Block",
    crop: "Corn",
    areaHa: 11.2,
    status: "needs-attention",
    harvestDays: 18,
    location: "Coulommiers, France",
    riskLevel: "medium",
    soilMoisturePct: 37,
    vegetationIndex: 0.62,
    temperatureC: 27,
    rainfallMmNext48h: 6,
    center: { lat: 48.8136, lng: 3.0847 },
    boundary: [
      { lat: 48.8178, lng: 3.0776 },
      { lat: 48.8187, lng: 3.0922 },
      { lat: 48.8096, lng: 3.0941 },
      { lat: 48.8083, lng: 3.0794 },
      { lat: 48.8178, lng: 3.0776 },
    ],
    summary:
      "Crop health is stable, but drone imagery suggests early weed pressure near the southern boundary.",
    sources: [
      {
        id: "drone-imagery",
        label: "Drone imagery",
        status: "fresh",
        updatedAt: "2026-05-15T15:40:00.000Z",
        summary: "Patchy weed signatures detected on 9% of the parcel.",
      },
      {
        id: "public-documents",
        label: "Public documents",
        status: "stale",
        updatedAt: "2026-04-22T08:00:00.000Z",
        summary: "No new restriction documents found this month.",
      },
    ],
    actions: [
      {
        id: "field-inspection",
        label: "Plan field inspection",
        description: "Inspect southern boundary before treatment.",
        completed: false,
      },
    ],
  },
  {
    id: "parcel-west-barley",
    name: "West Barley Strip",
    crop: "Spring barley",
    areaHa: 7.8,
    status: "all-good",
    harvestDays: 26,
    location: "Provins, France",
    riskLevel: "low",
    soilMoisturePct: 48,
    vegetationIndex: 0.71,
    temperatureC: 25,
    rainfallMmNext48h: 8,
    center: { lat: 48.5601, lng: 3.2996 },
    boundary: [
      { lat: 48.5636, lng: 3.2932 },
      { lat: 48.5644, lng: 3.3059 },
      { lat: 48.5568, lng: 3.3074 },
      { lat: 48.5559, lng: 3.2951 },
      { lat: 48.5636, lng: 3.2932 },
    ],
    summary:
      "Healthy canopy and adequate moisture. No immediate action required.",
    sources: [
      {
        id: "satellite-ndvi",
        label: "Satellite NDVI",
        status: "fresh",
        updatedAt: "2026-05-16T09:20:00.000Z",
        summary: "Vegetation signal is above the farm baseline.",
      },
      {
        id: "weather",
        label: "Weather API",
        status: "fresh",
        updatedAt: "2026-05-16T10:20:00.000Z",
        summary: "Moderate rain likely this week.",
      },
    ],
    actions: [],
  },
];
