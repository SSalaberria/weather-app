/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo } from "react";

import { Loading } from "~/components";
import { useLocationContext } from "~/features/location";

import { useWeather } from "../hooks";

export function withWeather(Component: () => JSX.Element) {
  const { location } = useLocationContext();

  const memoizedParams = useMemo(
    () => ({
      coords: {
        lat: location.latitude,
        lon: location.longitude,
      },
    }),
    [location.latitude, location.longitude],
  );

  const { weather, status } = useWeather(memoizedParams.coords);

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

  // @ts-expect-error
  return <Component weather={weather} />;
}
