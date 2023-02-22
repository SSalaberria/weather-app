import Home from "~/pages/home";
import { Loading } from "~/components";

import { LocationContext, useLocation } from "./features/location";

function App() {
  const { loading, location } = useLocation();

  return (
    <LocationContext.Provider value={location}>
      <main className="relative flex h-full justify-center items-center pb-80 flex-col bg-gradient-to-b from-[#1F1F42] to-[#010C1F]">
        {loading ? <Loading /> : <Home />}
        <div className="absolute h-1/6 w-full overflow-x-clip top-24 z-[1] bg-gradient-to-b from-[#ffffff09] rounded-t-[50%]" />
      </main>
    </LocationContext.Provider>
  );
}

export default App;
