import { useEffect, useState } from "react";

import api from "~/utils/api";
import { Coord, QueryStatus, Units, WeatherData } from "~/utils/types";

interface Options {
  units?: Units;
}

export function useWeather(coords: Coord, options?: Options) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<QueryStatus>("fetching");

  useEffect(() => {
    setStatus("fetching");
    api.weather
      .fetch(coords, options || {})
      .then((weather) => {
        setStatus("success");
        setWeather(weather);
      })
      .catch(() => setStatus("error"));
  }, [coords, options]);

  return { weather, status };
}
