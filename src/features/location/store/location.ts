import { createContext } from "react";

import { DEFAULT_POSITION } from "~/utils/helpers";
import { City } from "~/utils/types";

export const LocationContext = createContext<City>(DEFAULT_POSITION);
