export type Province = "Barcelona" | "Girona" | "Lleida" | "Tarragona";

export type Race = {
  id: string;
  name: string;
  location: string;
  province: Province;
  date: string;
  distanceKm: number;
  elevationGainM: number;
};
