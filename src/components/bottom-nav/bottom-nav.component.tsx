import { useEffect, useState } from "react";

import { paths, useRouter } from "~/components/router";
import { useUnitsSystemContext } from "~/features/weather/store";

import { Path } from "../router/routes.config";

export function BottomNav() {
  const { push } = useRouter();
  const [scrollDir, setScrollDir] = useState<"down" | "up">("up");
  const { unitsSystem, setUnitsSystem } = useUnitsSystemContext();

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;

        return;
      }
      setScrollDir(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  const handleNavigate = (event: React.MouseEvent, path: Path) => {
    event.preventDefault();
    push(path);
  };

  const handleUnitSystemChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUnitsSystem(unitsSystem === "imperial" ? "metric" : "imperial");
  };

  return (
    <nav
      className="fixed z-10 bottom-0 rounded-t-3xl inset-x-0 bg-purple flex justify-between text-s uppercase transition-all duration-1000"
      style={{
        transform: scrollDir === "up" ? "translate(0, 0px)" : "translate(0, 150px)",
      }}
    >
      <button
        className="absolute text-s lg:text-m border px-1 border-gray-600 top-[50%] sm:right-[40%] right-[30%] w-[20%] sm:w-[10%] z-10 capitalize btn-primary min-w-[4rem]"
        style={{
          WebkitTransform: "translateY(-50%) translateX(-50%)",
        }}
        onClick={handleUnitSystemChange}
      >
        {unitsSystem}
      </button>
      {Object.entries(paths).map(([key, value]) => (
        <a
          key={key}
          className="w-full block py-3 px-3 text-center hover:bg-[#353554] [&:nth-child(2)]:rounded-tl-3xl last:rounded-tr-3xl transition duration-300"
          href={key}
          style={{
            background: window.location.pathname === key ? "#353554" : "",
          }}
          onClick={(event) => handleNavigate(event, key as Path)}
        >
          <img alt={value.label} className="mx-auto" height="24" src={value.icon} width="24" />
          <p>{value.label}</p>
        </a>
      ))}
    </nav>
  );
}
