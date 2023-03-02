import { useEffect, useState } from "react";

import { paths, useRouter } from "~/components/router";

import { Path } from "../router/router.component";

export function BottomNav() {
  const { push } = useRouter();
  const [scrollDir, setScrollDir] = useState<"down" | "up">("up");

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

  return (
    <nav
      className="fixed z-10 bottom-0 rounded-t-xl inset-x-0 bg-purple flex justify-between text-s uppercase transition-all duration-700"
      style={{
        transform: scrollDir === "up" ? "translate(0, 0px)" : "translate(0, 150px)",
      }}
    >
      {Object.entries(paths).map(([key, value]) => (
        <a
          key={key}
          className="w-full block py-5 px-3 text-center hover:bg-[#353554]  transition duration-300"
          href={key}
          onClick={(event) => handleNavigate(event, key as Path)}
        >
          <img alt={value.label} className="mx-auto" height="32" src={value.icon} width="32" />
          <p>{value.label}</p>
        </a>
      ))}
    </nav>
  );
}
