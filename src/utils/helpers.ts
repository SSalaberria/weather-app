import { Units } from "./types";

export function formatTemperature(n: number, units: Units) {
  return {
    standard: `${n} K`,
    imperial: `${n} °F`,
    metric: `${n} °C`,
  }[units];
}
