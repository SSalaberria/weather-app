import { useContext, useMemo } from "react";

import { ForecastSummary, useWeather } from "~/features/weather";
import {
  CurrentSummaryForecast,
  HourlyForecastDisplay,
  SunsetDisplay,
  WeatherDaySummary,
} from "~/features/weather";
import { Loading, RouteContext } from "~/components";
import { LocationContext } from "~/features/location";

function Home() {
  const location = useContext(LocationContext);
  const coords = useMemo(
    () => ({
      lat: location.latitude,
      lon: location.longitude,
    }),
    [location.latitude, location.longitude],
  );
  const { weather, status } = useWeather(coords);
  const { push, path } = useContext(RouteContext);

  const hourlyForecastData = useMemo(() => {
    if (!weather) {
      return [];
    }

    const currentDate = new Date();
    const currentHourIndex = weather.hourly.data.findIndex((hourlyData) => {
      const hourlyDataDate = new Date(hourlyData.time);

      return hourlyDataDate.getHours() === currentDate.getHours();
    });

    return weather.hourly.data.slice(currentHourIndex, currentHourIndex + 24);
  }, [weather]);

  if (status === "fetching") {
    return <Loading />;
  }

  if (status === "error" || !weather) {
    return (
      <>
        <img className="w-80" src={"/error.svg"} />
        <p className="text-xl text-center">Error retrieving weather data</p>
      </>
    );
  }

  return (
    <div className="flex flex-col w-full gap-8">
      <button onClick={() => push(path === "/" ? "/locations" : "/")}>Toggle</button>

      <ForecastSummary
        currentTemperature={weather?.current_weather.temperature}
        location={location}
        tempMax={weather?.daily.data[0].temperature_2m_max}
        tempMin={weather?.daily.data[0].temperature_2m_min}
        weatherCode={weather?.current_weather.weathercode}
      />
      <CurrentSummaryForecast
        humidity={hourlyForecastData[0].relativehumidity_2m}
        precipitation={{
          value: weather.daily.data[0].precipitation_sum,
          units: weather.daily.units.precipitation_sum,
        }}
        wind={{
          value: weather.current_weather.windspeed,
          units: weather.daily.units.windspeed_10m_max,
        }}
      />
      <HourlyForecastDisplay date={weather?.daily.data[0].time} hourlyData={hourlyForecastData} />
      <SunsetDisplay
        nextRise={weather.daily.data[1].sunrise}
        riseTime={weather.daily.data[0].sunrise}
        setTime={weather.daily.data[0].sunset}
      />
      <WeatherDaySummary daysData={weather.daily.data.slice(0, 7)} units={weather.daily.units} />
    </div>
  );
}

export default Home;
