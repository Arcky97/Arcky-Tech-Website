
interface Props {
  label: string;
  value: string;
  rows: number;
  maxLength: number;
  placeholder: string;
  onChange: (value: string) => void;
}

export default function InputTextArea({ label, value, rows, maxLength, placeholder, onChange}: Props) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="block text-white text-lg font-bold">{label}</label>
      <textarea
        name={label}
        value={value}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}