import { ColorType, IntensityType } from "@/lib/colors/main";
import clsx from "clsx";
import { ReactNode } from "react";

const buttonStyle = (color: ColorType, intensity: IntensityType, className: string)  => ({
  border: `border-${color}-${intensity}`,
  bg: `bg-${color}-${intensity}`,
  class: className
})

interface Props {
  color: ColorType;
  intensity?: IntensityType;
  text: ReactNode;
  action: () => void;
  className?: string;
}

export default function ColorButton({ color, intensity = "600", text, action, className = "" }: Props) {
  const style = buttonStyle(color, intensity, className);
  
  return (
    <button
      className={clsx("border select-none cursor-pointer hover:bg-transparent text-white px-2 py-1 rounded-lg transition-all duration-300 ease-in-out",
        style.bg,
        style.border,
        style.class
      )}
      onClick={action}
    >
      {text}
    </button>
  )
}