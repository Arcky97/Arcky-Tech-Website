interface Props {
  label?: string;
  min: number;
  max?: number;
  step: number;
  disabled?: boolean;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  className?: string;
  extraText?: string;
}

export default function InputNumber({ label, min, max, step, disabled, value, placeholder, onChange, className, extraText }: Props) {
  const paddingExtraText = extraText ? 'pr-' + (8 + ((extraText.length - 1) * 2)) : 'pr-0'
  return (
    <div className={`relative ${className ?? ""}`}>
      {label && (
        <label 
        className={`block text-lg font-bold mb-2 ${disabled ? "text-gray-400" : "text-white"
        }`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${extraText ? paddingExtraText : '' } p-2 rounded-md border border-gray-600 ${
            disabled
              ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
              : "bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
          }`}
        />
        {extraText && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {extraText}
          </span>
        )}
      </div>
    </div>
  )
}