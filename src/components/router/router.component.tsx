import { Loading } from "~/components/loading";
import Home from "~/pages/home";
import Locations from "~/pages/locations";

export const paths = {
  "/": { page: () => <Home />, label: "Home", icon: "/icons/home.svg" },
  "/locations": {
    page: () => <Locations />,
    label: "Locations",
    icon: "/icons/magnifying-glass.svg",
  },
};

export type Path = keyof typeof paths;

export function Router({ path, loading }: { path: Path; loading: boolean }) {
  if (loading) {
    return <Loading />;
  }

  return paths[path].page();
}
