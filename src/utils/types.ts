export type Units = "metric" | "imperial";

interface CommonWeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeather;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface RawWeatherData extends CommonWeatherData {
  hourly_units: HourlyUnits;
  hourly: RawHourly;
  daily_units: DailyUnits;
  daily: RawDaily;
}

export interface WeatherData extends CommonWeatherData {
  hourly: {
    units: HourlyUnits;
    data: HourlyData[];
  };
  daily: {
    units: DailyUnits;
    data: DailyData[];
  };
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: WeatherCode;
  time: string;
}

export interface DailyData {
  time: string;
  weathercode: WeatherCode;
  temperature_2m_max: number;
  temperature_2m_min: number;
  sunrise: string;
  sunset: string;
  precipitation_sum: number;
  windspeed_10m_max: number;
  hourly: HourlyData[];
}

export interface HourlyData {
  time: string;
  temperature_2m: number;
  precipitation: number;
  windspeed_10m: number;
}

export interface RawDaily {
  time: string[];
  weathercode: WeatherCode[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  precipitation_sum: number[];
  windspeed_10m_max: number[];
}

export interface RawHourly {
  time: string[];
  temperature_2m: number[];
  precipitation: number[];
  windspeed_10m: number[];
}

export interface HourlyUnits {
  time: string;
  temperature_2m: TemperatureUnit;
  precipitation: PrecipitationUnit;
  windspeed_10m: WindspeedUnit;
}

export interface DailyUnits {
  time: string;
  weathercode: string;
  temperature_2m_max: TemperatureUnit;
  temperature_2m_min: TemperatureUnit;
  sunrise: string;
  sunset: string;
  precipitation_sum: PrecipitationUnit;
  windspeed_10m_max: WindspeedUnit;
}

export type TemperatureUnit = "°F" | "°C";

export type PrecipitationUnit = "mm" | "inch";

export type WindspeedUnit = "km/h" | "mp/h";

export type WeatherCode =
  | 0
  | 1
  | 2
  | 3
  | 45
  | 48
  | 51
  | 53
  | 55
  | 56
  | 57
  | 61
  | 63
  | 65
  | 66
  | 67
  | 71
  | 73
  | 75
  | 77
  | 80
  | 81
  | 82
  | 85
  | 86;
