import { ReactNode } from "react";
import clsx from "clsx";
import { ColorType, IntensityType } from "@/lib/colors";

const getRandomColor = (): { color: ColorType; intensity: IntensityType } => {
  const colors: ColorType[] = [
    "black", "white", "red", "orange", "amber", "yellow", "lime", "green", "emerald", 
    "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", 
    "rose", "slate", "gray", "zinc", "neutral", "stone"
  ];
  
  const intensities: IntensityType[] = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomIntensity = intensities[Math.floor(Math.random() * intensities.length)];
  
  return { color: randomColor, intensity: randomIntensity };
};

type CalloutType = "default" | "hint" | "attention" | "warning" | "check" | "random";

const calloutStyles: Record<CalloutType, { border: string; bg: string; label: string }> = {
  default: {
    border: "border-blue-500",
    bg: "bg-gray-800",
    label: ""
  },
  hint: {
    border: "border-gray-500",
    bg: "bg-zinc-800",
    label: "Hint"
  },
  attention: {
    border: "border-yellow-400",
    bg: "bg-yellow-900/20",
    label: "Attention"
  },
  warning: {
    border: "border-red-500",
    bg: "bg-red-900/20",
    label: "Warning"
  },
  check: {
    border: "border-green-500",
    bg: "bg-green-900/20",
    label: "Check"
  },
  random: {
    border: "",
    bg: "",
    label: "Random",
  }
};

export const Callout = ({ type = "default", title = "", children }: { type?: CalloutType; title?: string; children: ReactNode }) => {
  let style = calloutStyles[type];

  if (type === "random") {
    const { color, intensity } = getRandomColor();
    style = {
      border: `border-${color}-${intensity}`,
      bg: `bg-gray-800`,  
      label: title,
    };
  }

  return (
    <blockquote
      className={clsx(
        "border-l-3 rounded-md py-4 pl-4 px-8 my-6",
        style.border,
        style.bg,
      )}
    >
      <strong className={clsx("block mb-1 font-semibold text-lg text-left", style.border)}>
        {title || style.label}
      </strong>
      <div className="text-left text-base">{children}</div>
    </blockquote>
  );
};
