"use client"
import { useEffect, useState } from "react";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function ColorPicker({ label, value: initialValue, onChange}: ColorPickerProps) {
  const [localValue, setLocalValue] = useState(initialValue);
  const [errorValue, setErrorValue] = useState<string | null>(null);
  
  useEffect(() => {
    setLocalValue(initialValue);
    setErrorValue(null);
  }, [initialValue]);
  
  const handleBlur = () => {
    let value = localValue;

    if (!value.startsWith("#")) value = "#" + value;

    if (!/^#([0-9A-Fa-f]{6})$/.test(value)) {
      setErrorValue(value);
      value = initialValue ?? "#000000";
      setLocalValue(value);
    }

    onChange(value);
  }
  
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="block text-white text-lg font-bold">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={localValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-25 h-25 border-none rounded-md cursor-pointer"
        />
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          className="p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 w-30 text-center"
        />
      </div>
      {errorValue && (
        <span className="text-red-600 text-lg font-semibold">
          <span><span className="font-bold text-orange-400">{errorValue}</span>is not a valid HEX Color!</span>
        </span>
      )}
    </div>
  )
}