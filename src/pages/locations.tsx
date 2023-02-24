import { useContext } from "react";

import { RouteContext } from "~/components";

function Locations() {
  const { push, path } = useContext(RouteContext);

  return (
    <div>
      Locations
      <button onClick={() => push(path === "/" ? "/locations" : "/")}>Toggle</button>
    </div>
  );
}

export default Locations;
