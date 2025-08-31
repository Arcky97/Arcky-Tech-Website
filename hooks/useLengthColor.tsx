import { useMemo } from "react";

export function useLengthColor(length: number, maxLength?: number) {
  return useMemo(() => {
    if (!maxLength) return { color: "#a6a6a6" };

    let color = "#a6a6a6";
    const yellowStart = maxLength - 100;
    const redStart = maxLength - 50;

    if (length >= yellowStart && length < redStart) {
      const progress = (length - yellowStart) / (redStart - yellowStart);
      const hue = 50;
      const saturation = 0 + (100 - 0) * progress;
      const lightness = 65 - (75 - 50) * progress;
      color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    } else if (length >= redStart && length < maxLength) {
      const progress = (length - redStart) / (maxLength - redStart);
      const hue = 50 - 50 * progress;
      color = `hsl(${hue}, 100%, 50%)`;
    }

    if (length >= maxLength) {
      color = "#DC2626";
    }

    return { color };
  }, [length, maxLength]);
}