import { useState } from "react";

import { Path, paths } from "./router.component";

export function getCurrentPath() {
  const currentPath = window.location.pathname;

  if (paths[currentPath]) {
    return currentPath;
  } else {
    history.pushState({}, "/", "/");

    return "/";
  }
}

export function useRouter() {
  const [path, setPath] = useState<Path>(getCurrentPath);

  return { path, setPath };
}
