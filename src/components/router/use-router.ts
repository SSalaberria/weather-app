import { useState } from "react";

import { Path, paths } from "./routes.config";

export function getCurrentPath() {
  const currentPath = window.location.pathname as Path;

  if (paths[currentPath]) {
    return currentPath;
  } else {
    history.pushState({}, "", "/");

    return "/";
  }
}

export function useRouting() {
  const [path, setPath] = useState<Path>(getCurrentPath);

  const push = (path: Path) => {
    history.pushState({}, "", path);
    setPath(path);
  };

  return { path, push };
}
