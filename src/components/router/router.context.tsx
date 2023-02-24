import { createContext, Dispatch, SetStateAction } from "react";

import { Path } from "./router.component";
import { getCurrentPath } from "./use-router";

export const RouteContext = createContext({
  path: getCurrentPath(),
  setPath: (() => {}) as Dispatch<SetStateAction<Path>>,
});
