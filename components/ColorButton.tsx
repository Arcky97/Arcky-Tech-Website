"use client"
import { getColorFromTailwindString } from "@/utils/getTailwindColor";
import clsx from "clsx";
import Link from "next/link";
import { ReactNode, useState } from "react";

interface Props {
  color: string;
  text: ReactNode;
  action?: () => void;
  extraClass?: string;
  href?: string;
}

export default function ColorButton({ color, text, action, extraClass = "", href }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const style = getColorFromTailwindString(color)
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const baseClass = "border select-none cursor-pointer hover:bg-transparent text-white px-3 py-2 rounded-lg transition-all duration-300 ease-in-out"

  if (href) {
    return (
      <Link 
        href={href} 
        className={clsx(baseClass, extraClass)}
        style={{
          borderColor: style,
          backgroundColor: isHovered ? "transparent" : style,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </Link>
    )
  }

  return (
    <button
      className={clsx(baseClass, extraClass)}
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