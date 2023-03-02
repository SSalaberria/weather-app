import { useMemo } from "react";

import { Loading, useRouter } from "~/components";
import { SearchBar } from "~/components/search-bar";
import { LocationCard, useLocationContext } from "~/features/location";
import { useLocationSearch } from "~/features/location/hooks/use-location-search";
import { CondensedWeatherCard, useWeather } from "~/features/weather";
import { LongWeatherCard } from "~/features/weather";

function Locations() {
  const { location, setDefaultLocation, savedLocations } = useLocationContext();
  const coords = useMemo(
    () => ({
      lat: location.latitude,
      lon: location.longitude,
    }),
    [location.latitude, location.longitude],
  );
  const { weather, status } = useWeather(coords);
  const { searchData, setLocationQuery, status: searchStatus } = useLocationSearch();
  const { push } = useRouter();

  if (status === "fetching") {
    return <Loading />;
  }

  if (status === "error" || !weather) {
    return (
      <>
        <img className="w-80" src={"/error.svg"} />
        <p className="text-xl text-center">Error retrieving weather data</p>
      </>
    );
  }

  return (
    <div className="page-container z-10">
      <div className="flex w-full">
        <SearchBar
          inputProps={{ placeholder: "Search city, country, or location" }}
          loading={searchStatus === "fetching"}
          onSubmit={(s) => setLocationQuery(s)}
        />
      </div>

      {searchStatus === "success" && searchData && (
        <div
          className="grid gap-4 w-full"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
          }}
        >
          {searchData.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onSelect={(location) => {
                setDefaultLocation(location);
                push("/");
              }}
            />
          ))}
          {searchData.length === 0 && "No results found."}
        </div>
      )}

      {searchStatus === "fetching" && <Loading />}

      {!searchData && searchStatus !== "fetching" && (
        <>
          <LongWeatherCard
            currentTemperature={weather?.current_weather.temperature}
            dailyData={weather.daily.data[0]}
            location={location}
          />
          <p className="text-xl font-semibold mr-auto">Saved locations</p>
          <div
            className="grid w-full gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            }}
          >
            {savedLocations?.map((city) => (
              <CondensedWeatherCard
                key={city.id}
                currentTemperature={weather.current_weather.temperature}
                dailyData={weather.daily.data[0]}
                location={city}
                time={weather.daily.data[0].time}
              />
            ))}
          </div>
          {!savedLocations && (
            <div className="flex justify-center text-center text-m">No saved locations</div>
          )}
        </>
      )}
    </div>
  );
}

export default Locations;
