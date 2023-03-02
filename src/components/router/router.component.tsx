import { Loading } from "~/components/loading";

import { Path, paths } from "./routes.config";

export function Router({ path, loading }: { path: Path; loading: boolean }) {
  if (loading) {
    return <Loading />;
  }

  return paths[path].page();
}
