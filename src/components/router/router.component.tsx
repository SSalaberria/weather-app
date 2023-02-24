import { Loading } from "~/components/loading";
import Home from "~/pages/home";
import Locations from "~/pages/locations";

export const paths = {
  "/": () => <Home />,
  "/locations": () => <Locations />,
};

export type Path = keyof typeof paths;

export function Router({ path, loading }: { path: Path; loading: boolean }) {
  if (loading) {
    return <Loading />;
  }

  return paths[path]();
}
