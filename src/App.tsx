import { useEffect, useLayoutEffect, useState } from "react";

import "./App.css";
import api from "./utils/api";
import { formatTemperature } from "./utils/helpers";
import { WeatherData } from "./utils/types";

type City = {
  id: string;
  name: string;
  lat: number;
  lon: number;
};

let CITIES: City[] = [
  {
    id: "buenos-aires",
    name: "Buenos Aires",
    lat: -34.61315,
    lon: -58.37723,
  },
  {
    id: "bariloche",
    name: "Bariloche",
    lat: -41.14557,
    lon: -71.30822,
  },
];

const temperatureScale = "metric";

const getInitialSelectedCityState = () => {
  const localPosition = localStorage.getItem("local-position");

  if (localPosition) {
    return JSON.parse(localPosition);
  }

  return CITIES[0];
};

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<"fetching" | "success" | "error">("fetching");
  const [selectedCity, setSelectedCity] = useState<City>(getInitialSelectedCityState);

  useLayoutEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (!CITIES.find((city) => city.id === "local-position")) {
          const localPosition = {
            id: "local-position",
            name: "My city",
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };

          localStorage.setItem("local-position", JSON.stringify(localPosition));

          CITIES = [localPosition, ...CITIES];
        }
      });
    }
  }, []);

  useEffect(() => {
    setStatus("fetching");
    api.weather
      .fetch({ lon: selectedCity.lon, lat: selectedCity.lat }, { units: temperatureScale })
      .then((weather) => {
        setStatus("success");
        setWeather(weather);
      })
      .catch(() => setStatus("error"));
  }, [selectedCity]);

  const handleSelectCity = (cityId: string) =>
    setSelectedCity(CITIES.find((city) => city.id === cityId) || CITIES[0]);

  if (status === "fetching") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error fetching data.</div>;
  }

  console.log(weather);

  return (
    <div>
      <select
        defaultValue={selectedCity.id}
        id="city"
        name="cities"
        onChange={(event) => handleSelectCity(event.target.value)}
      >
        {CITIES.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
      <h1 className="text-2xl">{selectedCity.name}</h1>
      <ul>
        {weather?.daily.data.map((dayData) => (
          <li key={dayData.time}>
            {new Intl.DateTimeFormat("es-AR").format(new Date(dayData.time))} - Current:{" "}
            {weather.current_weather.temperature}
            {weather.daily.units.temperature_2m_max} - Min:{" "}
            {dayData.temperature_2m_min + weather.daily.units.temperature_2m_min} - Max:{" "}
            {dayData.temperature_2m_max + weather.daily.units.temperature_2m_max}
            <ul>
              {dayData.hourly.map((hourData) => (
                <li key={hourData.time}>
                  {new Intl.DateTimeFormat("es-AR", {
                    hour: "numeric",
                    minute: "numeric",
                  }).format(new Date(hourData.time))}
                  , Temp:{" "}
                  {Math.round(hourData.temperature_2m) + weather.hourly.units.temperature_2m}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
