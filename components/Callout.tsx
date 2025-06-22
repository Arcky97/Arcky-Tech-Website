import { ReactNode } from "react";
import clsx from "clsx";

type CalloutType = "hint" | "attention" | "warning" | "check";

const calloutStyles: Record<CalloutType, { border: string; bg: string; label: string}> = {
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
  }
};

export const Callout = ({ type = "hint", children }: { type?: CalloutType; children: ReactNode }) => {
  const style = calloutStyles[type];

  return (
    <blockquote
      className={clsx(
        "border-l-3 rounded-md py-4 pl-4 pr-8 my-6 mr-16",
        style.border,
        style.bg,
      )}
    >
      <strong className={clsx("block mb-1 font-semibold text-lg", style.border)}>
        {style.label}
      </strong>
      <div className="text-left text-lg">{children}</div>
    </blockquote>
  )
  
}