import { City, UnitsSystem } from "./types";

export function formatTemperature(n?: number, units?: UnitsSystem) {
  if (!n) return `- °`;

  const roundedTemp = Math.round(n);

  if (!units) return `${roundedTemp}°`;

  return (
    roundedTemp +
    {
      imperial: `°F`,
      metric: `°C`,
    }[units]
  );
}

export const DEFAULT_LOCATION: City = {
  id: "buenos-aires",
  city: "Buenos Aires",
  latitude: -34.61315,
  longitude: -58.37723,
  subdivision: {
    code: "B",
    name: "Buenos Aires",
  },
  country: {
    code: "AR",
    name: "Argentina",
  },
};

export const weatherCodeMapping = {
  0: { icon: "/weather-icons/sunny.svg", description: "Clear sky" },
  1: { icon: "/weather-icons/sunny.svg", description: "Mainly clear" },
  2: {
    icon: "/weather-icons/partiallycloud.svg",
    description: "Partly cloudy",
  },
  3: { icon: "/weather-icons/overcast.svg", description: "Overcast" },
  45: { icon: "/weather-icons/overcast.svg", description: "Fog" },
  48: { icon: "/weather-icons/heavysnow.svg", description: "Rime fog" },
  51: { icon: "/weather-icons/rainshower.svg", description: "Light drizzle" },
  53: {
    icon: "/weather-icons/rainshower.svg",
    description: "Drizzle",
  },
  55: { icon: "/weather-icons/rainy.svg", description: "Heavy drizzle" },
  56: {
    icon: "/weather-icons/snowyrainy.svg",
    description: "Freezing drizzle",
  },
  57: {
    icon: "/weather-icons/heavysnow.svg",
    description: "Heavy freezing drizzle",
  },
  61: { icon: "/weather-icons/rainshower.svg", description: "Slight rain" },
  63: { icon: "/weather-icons/rainshower.svg", description: "Moderate rain" },
  65: { icon: "/weather-icons/rainy.svg", description: "Heavy rain" },
  66: { icon: "/weather-icons/snowyrainy.svg", description: "Freezing rain" },
  67: {
    icon: "/weather-icons/snowyrainy.svg",
    description: "Heavy freezing rain",
  },
  71: { icon: "/weather-icons/snowy.svg", description: "Snowy" },
  73: { icon: "/weather-icons/snowy.svg", description: "Moderate snow" },
  75: { icon: "/weather-icons/heavysnow.svg", description: "Heavy snow" },
  77: { icon: "/weather-icons/heavysnow.svg", description: "Snowy" },
  80: { icon: "/weather-icons/rainshower.svg", description: "Rain shower" },
  81: {
    icon: "/weather-icons/rainshower.svg",
    description: "Moderate rain shower",
  },
  82: {
    icon: "/weather-icons/rainy.svg",
    description: "Violent rain shower",
  },
  85: { icon: "/weather-icons/snowy.svg", description: "Snow shower" },
  86: {
    icon: "/weather-icons/heavysnow.svg",
    description: "Heavy snow shower",
  },
  95: {
    icon: "/weather-icons/rainythunder.svg",
    description: "Thunderstorm",
  },
  96: {
    icon: "/weather-icons/rainythunder.svg",
    description: "Heavy thunderstorm",
  },
  99: {
    icon: "/weather-icons/rainythunder.svg",
    description: "Heavy thunderstorm",
  },
  default: { icon: "/weather-icons/sunny.svg", description: "Clear sky" },
};
