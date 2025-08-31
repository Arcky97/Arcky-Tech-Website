import { useLengthColor } from "@/hooks/useLengthColor";
import clsx from "clsx";

interface InputTextAreaProps {
  label: string;
  value: string;
  rows: number;
  maxLength?: number;
  placeholder: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function InputTextArea({ label, value, rows, maxLength, placeholder, onChange, className = ""}: InputTextAreaProps) {
  const length = value?.length || 0;

  const counterStyle = useLengthColor(length, maxLength);

  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="block text-white text-lg font-bold">{label}</label>
      <textarea
        name={label}
        value={value}
        rows={rows}
        maxLength={maxLength || Infinity}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={clsx("p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500", className)}
      />
      {maxLength && (
        <span className="text-xs transition-colors duration-150" style={counterStyle}>
          {length} / {maxLength}
        </span>
      )}
    </div>
  )
}