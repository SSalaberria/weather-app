import { formatTemperature, weatherCodeMapping } from "~/utils/helpers";
import { City, DailyData } from "~/utils/types";

interface WeatherCardProps {
  location: City;
  dailyData: DailyData;
  currentTemperature: number;
}

export function LongWeatherCard({ location, dailyData, currentTemperature }: WeatherCardProps) {
  return (
    <div className="flex flex-row justify-between section-container p-4 w-full">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-m font-bold">My location</p>
          <p className="text-s font-medium">{`${location.city}, ${location.subdivision?.name}`}</p>
        </div>
        <div>
          <p className="text-s">{location.country?.name}</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <img
          alt="weathercode"
          className="w-8"
          height="32"
          src={weatherCodeMapping[dailyData.weathercode].icon}
          width="32"
        />
        <p className="text-xxl font-bold">{formatTemperature(currentTemperature)}</p>
        <div className="text-xxs pt-1">
          <p>
            L: {formatTemperature(dailyData.temperature_2m_min)} H:{" "}
            {formatTemperature(dailyData.temperature_2m_max)}
          </p>
        </div>
      </div>
    </div>
  );
}
