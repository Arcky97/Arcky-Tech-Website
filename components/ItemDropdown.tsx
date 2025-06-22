"use client"

interface Props {
  label: string;
  value: string | string[] | null;
  disabled?: boolean;
  onChange: (value: string | string[] | null) => void;
  items: string[];
  className?: string;
}

export default function ItemDropdown({ label, value, disabled, onChange, items, className }: Props) {
  return (
    <div className={`mb-4 ${className ?? ""}`}>
      <label className={`block text-lg font-bold ${disabled ? "text-gray-400" : "text-white"}`}>{label}</label>
      <select
        className={`border border-gray-600 p-2.5 rounded w-full ${
          disabled
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-gray-800 text-white"
        }`}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        disabled={disabled}
      >
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}