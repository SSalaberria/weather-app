import { RouteContext, Router, useRouter } from "~/components";
import { LocationContext, useLocation } from "~/features/location";

function App() {
  const { loading, location } = useLocation();
  const { path, setPath } = useRouter();

  return (
    <RouteContext.Provider value={{ path, setPath }}>
      <LocationContext.Provider value={location}>
        <main className="relative flex h-full justify-center items-center pb-80 flex-col bg-gradient-to-b from-[#1F1F42] to-[#010C1F]">
          <button onClick={() => setPath(path === "/" ? "/locations" : "/")}>Toggle</button>
          <Router loading={loading} path={path} />
          <div className="absolute h-1/6 w-full overflow-x-clip top-24 z-[1] bg-gradient-to-b from-[#ffffff09] rounded-t-[50%]" />
        </main>
      </LocationContext.Provider>
    </RouteContext.Provider>
  );
}

export default App;
