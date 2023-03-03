import {
  City,
  Coord,
  DailyData,
  Geolocation,
  HourlyData,
  RawDaily,
  RawGeolocationData,
  RawHourly,
  RawWeatherData,
  UnitsSystem,
  WeatherData,
} from "./types";

let cache: { [x: string]: { data: any; timestamp: number } } = {};
const CACHE_TIME = 120 * 1000;

const api = {
  weather: {
    fetch: async (coord: Coord, options?: { units?: UnitsSystem }): Promise<WeatherData> => {
      let extraParams = "";

      if (options?.units === "imperial") {
        extraParams += "&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch";
      }

      const fetchUrl = `${import.meta.env.VITE_WEATHER_API}/v1/forecast?latitude=${
        coord.lat
      }&longitude=${
        coord.lon
      }&hourly=temperature_2m,weathercode,relativehumidity_2m,precipitation,windspeed_10m&models=best_match&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max&current_weather=true${extraParams}&timezone=auto`;

      const cachedData = cache[fetchUrl];

      if (cachedData && new Date().getTime() - cachedData.timestamp <= CACHE_TIME) {
        return cachedData.data;
      }

      return fetch(fetchUrl)
        .then((res) => res.json() as Promise<RawWeatherData>)
        .then((data) => {
          const { hourly_units, hourly: raw_hourly, daily_units, daily: raw_daily, ...rest } = data;

          const hourly = {
            units: hourly_units,
            data: transformData<HourlyData>(raw_hourly),
          };

          const daily = {
            units: daily_units,
            data: transformData<DailyData>(raw_daily).map((dayData) => ({
              ...dayData,
              time: dayData.time.replace(/-/g, "/"),
              hourly: hourly.data.filter((hourlyData) => hourlyData.time.includes(dayData.time)),
            })),
          };

          const transformedData = { ...rest, daily, hourly };

          cache[fetchUrl] = { data: transformedData, timestamp: new Date().getTime() };

          return transformedData;
        });
    },
  },
  reverseGeocoding: {
    fetch: async (): Promise<City> => {
      return fetch("/api/geolocation")
        .then((res) => res.json() as Promise<Geolocation>)
        .then((data) => {
          const localPosition: City = {
            id: "local-position",
            city: data?.city || "My location",
            latitude: data.latitude,
            longitude: data.longitude,
            subdivision: data.subdivision,
            country: data.country,
          };

          return localPosition;
        });
    },
  },
  geocoding: {
    fetch: async (name: string): Promise<City[]> => {
      const fetchUrl =
        `${import.meta.env.VITE_GEOCODING_API}/v1/search?` +
        new URLSearchParams({ name: name.toLocaleLowerCase() });

      const cachedData = cache[fetchUrl];

      if (cachedData) return cachedData.data;

      return fetch(fetchUrl)
        .then((res) => res.json())
        .then(({ results }: { results?: RawGeolocationData[] }) => {
          if (!results) return [];

          const parsedCities: City[] = results.map((rawCity) => ({
            id: String(rawCity.id),
            city: rawCity.name,
            latitude: Number(rawCity.latitude.toFixed(3)),
            longitude: Number(rawCity.longitude.toFixed(3)),
            subdivision: {
              name: rawCity.admin1,
              code: rawCity.admin1,
            },
            country: {
              name: rawCity.country,
              code: rawCity.country_code,
            },
          }));

          return parsedCities;
        });
    },
  },
};

const transformData = <T>(rawData: RawDaily | RawHourly) =>
  rawData.time.map((_time, i) => {
    const dataPoint = {};

    Object.keys(rawData).forEach(
      (objKey) =>
        // @ts-ignore
        (dataPoint[objKey] = rawData[objKey][i]),
    );

    return dataPoint as T;
  });

export default api;
