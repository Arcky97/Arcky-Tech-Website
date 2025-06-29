import { ColorType, IntensityType } from "@/lib/colors/main";
import { getColorFromTailwindString } from "@/utils/getTailwindColor";
import clsx from "clsx";
import { ReactNode, useState } from "react";

interface Props {
  color: ColorType;
  intensity?: IntensityType;
  text: ReactNode;
  action: () => void;
  className?: string;
}

export default function ColorButton({ color, intensity = "600", text, action, className = "" }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const style = getColorFromTailwindString(`${color}-${intensity}`)
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  return (
    <button
      className={clsx(
        "border select-none cursor-pointer hover:bg-transparent text-white px-2 py-1 rounded-lg transition-all duration-300 ease-in-out",
        className
      )}
      style={{
        borderColor: style,
        backgroundColor: isHovered ? "transparent" : style,
      }}
      onClick={action}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </button>
  )
}