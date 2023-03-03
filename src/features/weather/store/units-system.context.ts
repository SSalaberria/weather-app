import { createContext, useContext } from "react";

import { UnitsSystem } from "~/utils/types";

interface IUnitsContext {
  unitsSystem: UnitsSystem;
  setUnitsSystem: (newUnits: UnitsSystem) => void;
}

export const UnitsSystemContext = createContext<IUnitsContext>({
  unitsSystem: "metric",
  setUnitsSystem: () => {},
});

export const useUnitsSystemContext = () => useContext(UnitsSystemContext);
