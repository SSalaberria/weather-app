import { memo } from "react";

import { formatTemperature, weatherCodeMapping } from "~/utils/helpers";
import { WeatherCode } from "~/utils/types";

interface DailyDisplayProps {
  date: string;
  weatherCode: WeatherCode;
  tempMin: number;
  tempMax: number;
  selected?: boolean;
  onSelect: () => void;
}

function TDailyDisplay({
  date,
  weatherCode,
  tempMin,
  tempMax,
  selected,
  onSelect,
}: DailyDisplayProps) {
  return (
    <div
      className={`flex flex-col items-center gap-4 text-center hover:bg-[#ffffff10] hover:cursor-pointer hover:scale-95 transition-all duration-300  rounded-full py-6`}
      style={{ background: selected ? "#ffffff10" : "transparent" }}
      onClick={() => onSelect()}
    >
      <div>
        <p className="text-l font-medium pb-1">
          {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
        </p>
        <p className="text-m text-gray-400">
          {new Date(date).toLocaleDateString(undefined, {
            month: "2-digit",
            day: "2-digit",
          })}
        </p>
      </div>
      <img
        alt={weatherCodeMapping[weatherCode || "default"].description}
        className="w-11"
        height="44"
        src={weatherCodeMapping[weatherCode || "default"].icon}
        width="44"
      />
      <p className="text-m font-bold">
        {formatTemperature(tempMin)}/{formatTemperature(tempMax)}
      </p>
    </div>
  );
}

const DailyDisplay = memo(
  TDailyDisplay,
  (prevProps, nextProps) => prevProps.selected === nextProps.selected,
);

export { DailyDisplay };
