// @ts-nocheck
import { withWeather } from "~/features/weather/utils/with-weather.component";
import Home from "~/pages/home";
import Locations from "~/pages/locations";

export const paths = {
  "/": {
    page: () => withWeather(Home),
    label: "Home",
    icon: "/icons/home.svg",
  },
  "/locations": {
    page: () => withWeather(Locations),
    label: "Locations",
    icon: "/icons/magnifying-glass.svg",
  },
};

export type Path = keyof typeof paths;
