import { formatTemperature, weatherCodeMapping } from "~/utils/helpers";
import { WeatherCode, UnitsSystem } from "~/utils/types";

interface HourlyDisplayProps {
  time: string;
  weatherCode: WeatherCode;
  temperature: number;
  units?: UnitsSystem;
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

      <img
        alt={weatherCodeMapping[weatherCode].description}
        className="w-6"
        height="24"
        src={weatherCodeMapping[weatherCode].icon}
        width="24"
      />

      <p className=" text-l font-medium">{formatTemperature(temperature, units)}</p>
    </div>
  );
}
