import { ReactNode } from "react";
import { getColorFromTailwindString } from "@/utils/getTailwindColor";

export const TextColor = ({ color = "white", children }: { color:string; children:ReactNode }) => {
  const textColor = getColorFromTailwindString(color)
  return (
    <span style={
      {color: textColor}
    }>{children}</span>
  )
}