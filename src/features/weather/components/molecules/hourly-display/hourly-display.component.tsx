import { weatherCodeMapping } from "~/utils/helpers";
import { WeatherCode, TemperatureUnit } from "~/utils/types";

interface HourlyDisplayProps {
  time: string;
  weatherCode: WeatherCode;
  temperature: number;
  units?: TemperatureUnit;
}

export function HourlyDisplay({ time, weatherCode, temperature, units }: HourlyDisplayProps) {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-3">
      <p className=" text-xs font-medium">
        {new Date().getHours() === new Date(time).getHours()
          ? "Now"
          : new Intl.DateTimeFormat("es-AR", {
              hour: "numeric",
              minute: "numeric",
            }).format(new Date(time))}
      </p>

      <img className="w-6" src={weatherCodeMapping[weatherCode].icon} />

      <p className=" text-l font-medium">
        {Math.round(temperature)}
        {units ? units : "°"}
      </p>
    </div>
  );
}