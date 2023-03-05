import { useState } from "react";

import { BottomNav, RouteContext, Router } from "~/components";
import { LocationContext, useLocation } from "~/features/location";

import { useRouting } from "./components/router";
import { UnitsSystemContext } from "./features/weather/store";
import { UnitsSystem } from "./utils/types";

function App() {
  const { loading, location, savedLocations, setDefaultLocation, deleteLocation } = useLocation();
  const { path, push } = useRouting();
  const [unitsSystem, setUnitsSystem] = useState<UnitsSystem>("metric");

  return (
    <RouteContext.Provider value={{ path, push }}>
      <LocationContext.Provider
        value={{ location, savedLocations, setDefaultLocation, deleteLocation }}
      >
        <UnitsSystemContext.Provider value={{ unitsSystem, setUnitsSystem }}>
          <main className="relative flex h-full justify-center items-center pb-40 flex-col bg-gradient-to-b from-purple to-[#010C1F]">
            <Router loading={loading} path={path} />
            <BottomNav />
            <div className="absolute h-[5%] w-full overflow-x-clip top-24 bg-gradient-to-b from-[#ffffff09] rounded-t-[50%]" />
          </main>
        </UnitsSystemContext.Provider>
      </LocationContext.Provider>
    </RouteContext.Provider>
  );
}

export default App;
