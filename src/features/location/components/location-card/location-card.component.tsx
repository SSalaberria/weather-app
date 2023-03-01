import { City } from "~/utils/types";

interface LocationCardProps {
  location: City;
  onSelect?: (location: City) => void;
}

export function LocationCard({ location, onSelect }: LocationCardProps) {
  return (
    <div
      key={location.id}
      className="section-container cursor-pointer p-4 hover:bg-[#ffffff40] hover:scale-105 transition-all"
      onClick={() => onSelect && onSelect(location)}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-l font-bold">{location.city}</p>
          <p className="text-s">
            {location.subdivision?.name}, {location.country?.name}
          </p>
        </div>
        <div className="flex flex-col justify-center text-xs w-20">
          <div className="flex">
            <p className="w-10">Lat. </p>
            <p>{location.latitude.toFixed(2)}</p>
          </div>
          <div className="flex">
            <p className="w-10">Lon.</p>
            <p>{location.longitude.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
