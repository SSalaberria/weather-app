import { useMemo } from "react";

import { ForecastSummary } from "~/features/weather";
import {
  CurrentSummaryForecast,
  HourlyForecastDisplay,
  SunsetDisplay,
  WeatherDaySummary,
} from "~/features/weather";
import { useLocationContext } from "~/features/location";
import { WeatherData } from "~/utils/types";

function Home({ weather }: { weather: WeatherData }) {
  const { location } = useLocationContext();

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

  return (
    <div className="page-container">
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
