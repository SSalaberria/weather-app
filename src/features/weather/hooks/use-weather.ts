import { useEffect, useState } from "react";

import api from "~/utils/api";
import { Coord, QueryStatus, UnitsSystem, WeatherData } from "~/utils/types";

import { useUnitsSystemContext } from "../store";

interface Options {
  units?: UnitsSystem;
}

export function useWeather(coords: Coord, options?: Options) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<QueryStatus>("fetching");
  const { unitsSystem } = useUnitsSystemContext();

  useEffect(() => {
    setStatus("fetching");
    api.weather
      .fetch(coords, {
        units: unitsSystem,
        ...options,
      })
      .then((weather) => {
        setStatus("success");
        setWeather(weather);
      })
      .catch(() => setStatus("error"));
  }, [coords, options, unitsSystem]);

  return { weather, status };
}
