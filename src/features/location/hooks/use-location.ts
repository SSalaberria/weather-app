import { useEffect, useState } from "react";

import api from "~/utils/api";
import { DEFAULT_LOCATION } from "~/utils/helpers";
import { City } from "~/utils/types";

const LOCAL_STORAGE_DEFAULT_LOCATION_KEY = "default-location";
const LOCAL_STORAGE_LOCATIONS_KEY = "saved-locations";

const getInitialState = (key: string) => {
  const state = localStorage.getItem(key);

  if (state) {
    return JSON.parse(state);
  }

  return null;
};

export function useLocation() {
  const [loading, setLoading] = useState(
    () => !localStorage.getItem(LOCAL_STORAGE_DEFAULT_LOCATION_KEY),
  );
  const [location, setLocation] = useState<City>(() =>
    getInitialState(LOCAL_STORAGE_DEFAULT_LOCATION_KEY),
  );
  const [savedLocations, setSavedLocations] = useState<City[]>(() =>
    getInitialState(LOCAL_STORAGE_LOCATIONS_KEY),
  );

  const setDefaultLocation = (city: City) => {
    localStorage.setItem(LOCAL_STORAGE_DEFAULT_LOCATION_KEY, JSON.stringify(city));
    setLocation(city);
    saveLocation(city);
  };

  const saveLocation = (city: City) => {
    const locations = localStorage.getItem(LOCAL_STORAGE_LOCATIONS_KEY);
    let newLocations: City[] = locations ? JSON.parse(locations) : [];

    if (!newLocations.find((loc) => loc.id === city.id)) {
      newLocations = [city, ...newLocations];
      localStorage.setItem(LOCAL_STORAGE_LOCATIONS_KEY, JSON.stringify(newLocations));
      setSavedLocations(newLocations);
    }
  };

  useEffect(() => {
    if (!location) {
      api.reverseGeocoding
        .fetch()
        .then((city) => setDefaultLocation(city))
        .catch(() => {
          setLocation(DEFAULT_LOCATION);
        })
        .finally(() => setLoading(false));
    }
  }, [location]);

  return { loading, location, savedLocations, setDefaultLocation };
}
