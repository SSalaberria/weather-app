import { HourlyDisplay } from "~/features/weather";
import { HourlyData } from "~/utils/types";

interface HourlyForecastDisplayProps {
  hourlyData: HourlyData[];
  date: string;
}

export function HourlyForecastDisplay({ hourlyData, date }: HourlyForecastDisplayProps) {
  return (
    <div className="flex flex-col w-full p-4 section-container">
      <div className="flex justify-between pb-4 items-center">
        <p className="text-m font-bold">Today</p>
        <p className="text-m">
          {new Date(date).toLocaleDateString(undefined, { month: "short", day: "2-digit" })}
        </p>
      </div>

      <div className="grid gap-6 grid-flow-col w-full overflow-x-auto overflow-y-hidden pb-2 sm:scrollbar">
        {hourlyData.map((hourData) => (
          <HourlyDisplay
            key={hourData.time}
            temperature={hourData.temperature_2m}
            time={hourData.time}
            weatherCode={hourData.weathercode}
          />
        ))}
      </div>
    </div>
  );
}
