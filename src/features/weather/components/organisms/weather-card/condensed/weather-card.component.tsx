import { formatTemperature, weatherCodeMapping } from "~/utils/helpers";
import { City, DailyData } from "~/utils/types";

interface CondensedWeatherCard {
  location: City;
  dailyData: DailyData;
  currentTemperature: number;
  time: string;
}

export function CondensedWeatherCard({
  location,
  dailyData,
  currentTemperature,
}: CondensedWeatherCard) {
  return (
    <div className="flex justify-between items-center relative section-container min-w-max gap-4 p-4">
      <img
        alt="weathercode"
        className="w-12 absolute -top-6 left-0"
        height="48"
        src={weatherCodeMapping[dailyData.weathercode].icon}
        width="48"
      />
      <div className="flex flex-col max-w-[120px] gap-1">
        <p className="text-m font-bold">{location.city}</p>
        <p className="text-xs">
          {`${location.subdivision?.name}, 
          ${location.country?.code}`}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-xxl font-bold pb-1">{formatTemperature(currentTemperature)}</p>
        <p className="text-xs">
          L: {formatTemperature(dailyData.temperature_2m_min)} H:{" "}
          {formatTemperature(dailyData.temperature_2m_max)}
        </p>
      </div>
    </div>
  );
}
