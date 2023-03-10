import { formatTemperature, weatherCodeMapping } from "~/utils/helpers";
import { City, WeatherCode } from "~/utils/types";

interface ForecastSummaryProps {
  weatherCode: WeatherCode;
  currentTemperature: number;
  tempMin: number;
  tempMax: number;
  location: City;
}

export function ForecastSummary({
  weatherCode,
  currentTemperature,
  tempMax,
  tempMin,
  location,
}: ForecastSummaryProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img
        alt={weatherCode.toString()}
        className="w-40 z-10"
        height="160"
        src={weatherCodeMapping[weatherCode].icon}
        width="160"
      />
      <p className="text-[2rem] leading-3 font-bold">
        {weatherCodeMapping[weatherCode].description}
      </p>
      <p className="text-[4rem] font-bold pl-4">{formatTemperature(currentTemperature)}</p>
      <p className="text-l font-medium w-40 pb-2">
        {location.city}, {location.subdivision?.name}, {location.country?.code}
      </p>
      <div className="flex text-m font-medium gap-4">
        <p>L: {formatTemperature(tempMin)}</p>
        <p>H: {formatTemperature(tempMax)}</p>
      </div>
    </div>
  );
}
