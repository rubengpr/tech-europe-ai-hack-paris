export type WeatherCondition =
  | "sunny"
  | "partly-cloudy"
  | "rain"
  | "storm";

export type WeatherForecastDay = {
  date: string;
  label: string;
  condition: WeatherCondition;
  highC: number;
  lowC: number;
  rainfallMm: number;
  windKmh: number;
};

export type WeatherBriefing = {
  location: string;
  observedAt: string;
  condition: WeatherCondition;
  temperatureC: number;
  feelsLikeC: number;
  humidityPct: number;
  windKmh: number;
  rainfallNext24hMm: number;
  irrigationSignal: string;
  forecast: WeatherForecastDay[];
};
