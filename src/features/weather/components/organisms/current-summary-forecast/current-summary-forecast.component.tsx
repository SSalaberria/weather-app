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
    <div className="flex gap-1 justify-center">
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
  return (
    <div className="flex justify-center section-container gap-8 py-2 px-4 mx-auto">
      <ForecastItem
        icon={"/icons/rain.svg"}
        value={`${precipitation.value}${precipitation.units}`}
      />
      <ForecastItem icon={"/icons/water-drop.svg"} value={`${humidity}%`} />
      <ForecastItem icon={"/icons/wind.svg"} value={`${Math.round(wind.value)} ${wind.units}`} />
    </div>
  );
}
