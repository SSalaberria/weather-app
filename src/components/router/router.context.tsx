import { createContext } from "react";

import { Path } from "./router.component";
import { getCurrentPath } from "./use-router";

export const RouteContext = createContext({
  path: getCurrentPath(),
  push: (_path: Path) => {
    console.log("Shouldnt come here");
  },
});
