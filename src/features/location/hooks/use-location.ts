import { createContext, useEffect, useState } from "react";

import api from "~/utils/api";
import { DEFAULT_POSITION } from "~/utils/helpers";
import { City } from "~/utils/types";

const LOCAL_STORAGE_POSITION_KEY = "local-position";

const getInitialSelectedCityState = () => {
  const localPosition = localStorage.getItem(LOCAL_STORAGE_POSITION_KEY);

  if (localPosition) {
    return JSON.parse(localPosition);
  }

  return DEFAULT_POSITION;
};

export function useLocation() {
  const [loading, setLoading] = useState(() => !localStorage.getItem(LOCAL_STORAGE_POSITION_KEY));
  const [location, setLocation] = useState<City>(getInitialSelectedCityState);

  useEffect(() => {
    api.geolocation
      .fetch()
      .then((geo) => {
        const localPosition: City = {
          id: LOCAL_STORAGE_POSITION_KEY,
          city: geo?.city || "My location",
          latitude: geo.latitude,
          longitude: geo.longitude,
          subdivision: geo.subdivision,
          country: geo.country,
        };

        localStorage.setItem(LOCAL_STORAGE_POSITION_KEY, JSON.stringify(localPosition));

        setLocation(localPosition);
      })
      .catch(() => {
        setLocation(DEFAULT_POSITION);
      })
      .finally(() => setLoading(false));
  }, []);

  return { loading, location };
}
