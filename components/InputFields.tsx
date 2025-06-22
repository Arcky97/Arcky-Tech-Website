interface Props {
  label: string;
  value: string;
  maxLength?: number;
  placeholder: string;
  onChange: (value: string) => void;
}

export default function InputFields({ label, value, maxLength, placeholder, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="block text-white text-lg font-bold">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength || Infinity}
        placeholder={placeholder}
        className="p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
      />
      {maxLength && (<span className="text-xs text-gray-400">{value?.length || 0} / {maxLength}</span>)}
    </div>
  )
}