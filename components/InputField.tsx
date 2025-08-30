import clsx from "clsx";

interface InputFieldProps {
  label: string;
  value: string;
  maxLength?: number;
  placeholder: string;
  onChange: (value: string) => void;
  className?: string
}

export default function InputField({ label, value, maxLength, placeholder, onChange, className = "" }: InputFieldProps ) {
  const length = value?.length || 0;

  const counterStyle: React.CSSProperties = { color: "#a6a6a6" };

  if (maxLength) {
    const yellowStart = maxLength - 100;
    const redStart = maxLength - 50;

    if (length >= yellowStart && length < redStart) {
      const progress = (length - yellowStart) / (redStart - yellowStart);
      const hue = 50;
      const saturation = 0 + (100 - 0) * progress;
      const lightness = 65 - (75 - 50) * progress;
      counterStyle.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    } else if (length >= redStart && length < maxLength) {
      const progress = (length - redStart) / (maxLength - redStart);
      const hue = 50 - 50 * progress;
      counterStyle.color = `hsl(${hue}, 100%, 50%)`;
    }

    if (length >= maxLength) {
      counterStyle.color = "#DC2626";
    }
  }

  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="block text-white text-lg font-bold">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength || Infinity}
        placeholder={placeholder}
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