import { useEffect, useMemo, useState } from "react";

import { DailyDisplay, SummaryItem } from "~/features/weather";
import { formatTemperature } from "~/utils/helpers";
import { DailyData, DailyUnits } from "~/utils/types";

interface WeatherDaySummaryProps {
  daysData: DailyData[];
  units: DailyUnits;
}

export function WeatherDaySummary({ daysData, units }: WeatherDaySummaryProps) {
  const [selected, setSelected] = useState<DailyData>(daysData[0]);

  useEffect(() => {
    setSelected(daysData[0]);
  }, [daysData]);

  const summaryItems = useMemo(
    () => [
      {
        description: "Min/Max",
        icon: "/icons/thermometer.svg",
        value: `${formatTemperature(selected.temperature_2m_min)}/${formatTemperature(
          selected.temperature_2m_max,
        )}`,
      },
      {
        description: "Precipitation",
        icon: "/icons/rain.svg",
        value: `${selected.precipitation_sum} ${units.precipitation_sum}`,
      },
      {
        description: "Wind",
        icon: "/icons/wind.svg",
        value: `${selected.windspeed_10m_max} ${units.windspeed_10m_max}`,
      },
      {
        description: "Sun raise",
        icon: "/icons/sun-horizon.svg",
        value: `${new Intl.DateTimeFormat("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(selected.sunrise))}`,
      },
      {
        description: "Sun set",
        icon: "/icons/sun-horizon.svg",
        value: `${new Intl.DateTimeFormat("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(selected.sunset))}`,
      },
      {
        description: "Hummidity",
        icon: "/icons/water-drop.svg",
        value: `${Math.round(
          selected.hourly.reduce((acc, current) => acc + current.relativehumidity_2m, 0) /
            selected.hourly.length,
        )}%`,
      },
    ],
    [selected, units],
  );

  return (
    <div className="flex flex-col justify-center gap-8">
      <div className="flex pl-12 sm:pl-0 max-w-xs sm:max-w-full gap-4 sm:gap-8 justify-center w-full overflow-x-auto sm:scrollbar">
        {daysData.map((day) => (
          <DailyDisplay
            key={day.time}
            date={day.time}
            selected={selected?.time === day.time}
            tempMax={day.temperature_2m_max}
            tempMin={day.temperature_2m_min}
            weatherCode={day.weathercode}
            onSelect={() => setSelected(day)}
          />
        ))}
      </div>
      <div className="flex flex-col section-container p-4 gap-4">
        <div className="flex justify-between text-m">
          <p className="font-bold">Summary</p>{" "}
          <p>
            {new Date(selected.time).toLocaleDateString(undefined, {
              month: "short",
              day: "2-digit",
            })}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-y-4">
          {summaryItems.map((item) => (
            <SummaryItem {...item} key={item.description} />
          ))}
        </div>
      </div>
    </div>
  );
}
