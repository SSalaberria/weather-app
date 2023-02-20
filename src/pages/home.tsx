import { useContext, useEffect, useState } from "react";

import { LocationContext } from "~/App";
import { Loading } from "~/components/ui/loading";
import api from "~/utils/api";
import { WeatherData } from "~/utils/types";
import ErrorIcon from "~/assets/error.svg";

const temperatureScale = "metric";

function Home() {
  const location = useContext(LocationContext);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<"fetching" | "success" | "error">("fetching");

  useEffect(() => {
    setStatus("fetching");
    api.weather
      .fetch({ lon: location.lon, lat: location.lat }, { units: temperatureScale })
      .then((weather) => {
        setStatus("success");
        setWeather(weather);
      })
      .catch(() => setStatus("error"));
  }, [location]);

  if (status === "fetching") {
    return <Loading />;
  }

  if (status === "error") {
    return (
      <>
        <img src={ErrorIcon} />
        <p>Error retrieving weather data</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-s font-light">{location.name}</h1>
      <img className="" src={"/src/assets/sunny.svg"} />
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
    </>
  );
}

export default Home;
