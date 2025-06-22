interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function ColorPicker({ label, value, onChange}: Props) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="block text-white text-lg font-bold">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-25 h-25 border-none rounded-md cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 w-30 text-center"
        />
      </div>
    </div>
  )
}