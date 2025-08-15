"use client"
import { getColorFromTailwindString } from "@/utils/getTailwindColor";
import clsx from "clsx";
import Link from "next/link";
import { ReactNode, useState } from "react";

interface Props {
  color: string;
  text: ReactNode;
  action?: () => void;
  padding?: string;
  href?: string;
  extraClass?: string;
  disabled?: boolean;
}

export default function ColorButton({ color, text, action, padding, href, extraClass = "", disabled }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const style = getColorFromTailwindString(color)
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const baseClass = `border select-none hover:bg-transparent text-sm lg:text-base text-white ${padding ?? "px-2 py-1 lg:px-3 lg:py-2"} rounded-lg transition-all duration-300 ease-in-out ${disabled ? "cursor-default" : "cursor-pointer"}`;

  if (href) {
    return (
      <Link 
        href={href} 
        className={clsx(baseClass, extraClass)}
        style={{
          borderColor: disabled ? "gray" : style,
          backgroundColor: disabled ? "gray" : isHovered ? "transparent" : style,
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
        borderColor: disabled ? "gray" : style,
        backgroundColor: disabled ? "gray" : isHovered ? "transparent" : style,
      }}
      onClick={action}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
    >
      {text}
    </button>
  )
}