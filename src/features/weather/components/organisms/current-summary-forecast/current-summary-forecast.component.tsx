import { useMemo } from "react";

interface CurrentSummaryForecastProps {
  humidity: number;
  precipitation: {
    value: number;
    units: string;
  };
  wind: {
    value: number;
    units: string;
  };
}

interface ForecastItem {
  icon: string;
  value: string;
}

function ForecastItem({ icon, value }: ForecastItem) {
  return (
    <div className="flex gap-1 justify-center items-center">
      <img alt={value} height="24" src={icon} width="24" />
      <p className="text-m">{value}</p>
    </div>
  );
}

export function CurrentSummaryForecast({
  precipitation,
  humidity,
  wind,
}: CurrentSummaryForecastProps) {
  const items = useMemo(
    () => [
      {
        icon: "/icons/rain.svg",
        value: `${precipitation.value} ${precipitation.units}`,
      },
      {
        icon: "/icons/water-drop.svg",
        value: `${humidity}%`,
      },
      {
        icon: "/icons/wind.svg",
        value: `${Math.round(wind.value)} ${wind.units}`,
      },
    ],
    [precipitation, humidity, wind],
  );

  return (
    <div className="flex justify-center section-container gap-8 py-2 px-4 mx-auto">
      {items.map((item) => (
        <ForecastItem {...item} key={item.icon} />
      ))}
    </div>
  );
}
