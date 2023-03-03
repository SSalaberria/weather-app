import { Loading } from "~/components";
import { formatTemperature, weatherCodeMapping } from "~/utils/helpers";
import { City, DailyData } from "~/utils/types";

interface CondensedWeatherCard {
  location: City;
  dailyData?: DailyData;
  currentTemperature?: number;
  loading: boolean;
  selected?: boolean;
  onSelect?: (location: City) => void;
  onDelete?: (location: City) => void;
}

export function CondensedWeatherCard({
  location,
  dailyData,
  currentTemperature,
  loading,
  onSelect,
  onDelete,
  selected,
}: CondensedWeatherCard) {
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    if (onDelete) onDelete(location);
  };

  return (
    <div
      className="flex justify-between items-center relative section-container min-w-max gap-4 p-4 cursor-pointer transition-all hover:scale-105 hover:bg-[#ffffff40]"
      onClick={() => onSelect && onSelect(location)}
    >
      <div className="absolute -top-6 left-0">
        {loading || !dailyData ? (
          <div className="absolute scale-[35%] top-6 left-6">
            <Loading />
          </div>
        ) : (
          <img
            alt="weathercode"
            className="w-12"
            height="48"
            src={weatherCodeMapping[dailyData.weathercode].icon}
            width="48"
          />
        )}
      </div>

      <div className="absolute -top-2 right-0 ">
        {selected ? (
          <img alt="selected" height="24" src="/icons/check.svg" width="24" />
        ) : (
          <button onClick={handleDelete}>
            <img
              alt="selected"
              className=" fill-white"
              height="24"
              src="/icons/trash.svg"
              width="24"
            />
          </button>
        )}
      </div>

      <div className="flex flex-col max-w-[120px] gap-1">
        <p className="text-m font-bold">{location.city}</p>
        <p className="text-xs">
          {`${location.subdivision?.name}, 
          ${location.country?.code}`}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[3rem]">
        {loading ? (
          <img alt="loading" height="32" src="/icons/loading.svg" width="32" />
        ) : (
          <>
            <p className="text-xxl font-bold pb-1">{formatTemperature(currentTemperature)}</p>
            <p className="text-xs">
              L: {formatTemperature(dailyData?.temperature_2m_min)} H:{" "}
              {formatTemperature(dailyData?.temperature_2m_max)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
