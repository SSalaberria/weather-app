import { createContext, useEffect, useState } from "react";

import Home from "~/pages/home";
import { Loading } from "~/components/ui/loading";
import api from "~/utils/api";
import { City } from "~/utils/types";

const LOCAL_STORAGE_POSITION_KEY = "local-position";

const DEFAULT_POSITION = {
  id: "buenos-aires",
  name: "Buenos Aires",
  lat: -34.61315,
  lon: -58.37723,
};

const getInitialSelectedCityState = () => {
  const localPosition = localStorage.getItem(LOCAL_STORAGE_POSITION_KEY);

  if (localPosition) {
    return JSON.parse(localPosition);
  }

  return DEFAULT_POSITION;
};

export const LocationContext = createContext<City>(DEFAULT_POSITION);

function App() {
  const [loading, setLoading] = useState(() => !localStorage.getItem(LOCAL_STORAGE_POSITION_KEY));
  const [location, setLocation] = useState<City>(getInitialSelectedCityState);

  useEffect(() => {
    api.geolocation.fetch().then((geo) => {
      const localPosition: City = {
        id: LOCAL_STORAGE_POSITION_KEY,
        name: geo?.city || "My location",
        lat: geo.latitude,
        lon: geo.longitude,
      };

      localStorage.setItem(LOCAL_STORAGE_POSITION_KEY, JSON.stringify(localPosition));

      setLocation(localPosition);

      setLoading(false);
    });
  }, []);

  return (
    <LocationContext.Provider value={location}>
      <main className="flex h-full justify-center items-center flex-col">
        {loading ? <Loading /> : <Home />}
      </main>
    </LocationContext.Provider>
  );
}

export default App;
