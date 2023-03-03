import { createContext, useContext } from "react";

import { DEFAULT_LOCATION } from "~/utils/helpers";
import { City } from "~/utils/types";

interface ILocationContext {
  location: City;
  savedLocations: City[];
  setDefaultLocation: (x: City) => void;
  deleteLocation: (x: City) => void;
}

export const LocationContext = createContext<ILocationContext>({
  location: DEFAULT_LOCATION,
  savedLocations: [],
  setDefaultLocation: () => {},
  deleteLocation: () => {},
});

export const useLocationContext = () => useContext(LocationContext);
