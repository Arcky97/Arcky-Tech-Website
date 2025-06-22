interface Props {
  color: string | "black" | "white" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" | "slate" | "gray" | "zinc" | "neutral" | "stone";
  intensity?: string;
  text: string;
  action: () => void;
  className?: string;
}

export default function ColorButton({ color, intensity, text, action, className }: Props) {
  const colorIntensity = intensity ?? "600";
  
  return (
    <button
      className={`border border-${color}-${colorIntensity} bg-${color}-${colorIntensity} select-none cursor-pointer hover:bg-transparent text-white px-2 py-1 rounded-lg transition-all duration-300 ease-in-out ${className ?? ""}`}
      onClick={action}
    >
      {text}
    </button>
  )
}