import { BottomNav, RouteContext, Router } from "~/components";
import { LocationContext, useLocation } from "~/features/location";

import { useRouting } from "./components/router";

function App() {
  const { loading, location, savedLocations, setDefaultLocation } = useLocation();
  const { path, push } = useRouting();

  return (
    <RouteContext.Provider value={{ path, push }}>
      <LocationContext.Provider value={{ location, savedLocations, setDefaultLocation }}>
        <main className="relative flex h-full justify-center items-center pb-80 flex-col bg-gradient-to-b from-purple to-[#010C1F]">
          <Router loading={loading} path={path} />
          <BottomNav />
          <div className="absolute h-1/6 w-full overflow-x-clip top-24 bg-gradient-to-b from-[#ffffff09] rounded-t-[50%]" />
        </main>
      </LocationContext.Provider>
    </RouteContext.Provider>
  );
}

export default App;
