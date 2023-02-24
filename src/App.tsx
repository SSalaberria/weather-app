import { RouteContext, Router, useRouter } from "~/components";
import { LocationContext, useLocation } from "~/features/location";

function App() {
  const { loading, location } = useLocation();
  const { path, push } = useRouter();

  return (
    <RouteContext.Provider value={{ path, push }}>
      <LocationContext.Provider value={location}>
        <main className="relative flex h-full justify-center items-center pb-80 flex-col bg-gradient-to-b from-[#1F1F42] to-[#010C1F]">
          <Router loading={loading} path={path} />
          <div className="absolute h-1/6 w-full overflow-x-clip top-24 z-[1] bg-gradient-to-b from-[#ffffff09] rounded-t-[50%]" />
        </main>
      </LocationContext.Provider>
    </RouteContext.Provider>
  );
}

export default App;
