"use client";
import Select from "react-select";

interface Role {
  id: string;
  name: string;
  color: number;
}

interface Props {
  label: string;
  value: string | string[] | null;
  onChange: (value: string | string[] | null) => void;
  roles: Role[];
  multiSelect?: boolean;
  disItems?: string[];
  className?: string;
}

export default function RoleDropdown({ label, value, onChange, roles, multiSelect, disItems, className }: Props) {
  const options = roles.filter(role => role.name !== '@everyone' && !disItems?.includes(role.id)).map(role => {
    return { value: role.id, label: role.name, color: role.color !== 0 ? `#${role.color.toString(16).padStart(6, "0")}` : 'gray' }
  })

  function isColorBright(hex: string) {
    if (!hex.startsWith('#')) {
      hex = `#${parseInt(hex, 10).toString(16).padStart(6, "0")}`;
    }

    const r = parseInt(hex.substring(1, 2), 16);
    const g = parseInt(hex.substring(3, 2), 16);
    const b = parseInt(hex.substring(5, 2), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 400;
  }

  return (
    <div className={`mb-4 ${className ?? ""}`}>
      <label className="block text-white text-lg font-bold">{label}</label>
      {multiSelect ? (
        <Select
          isMulti
          options={options}
          value={options.filter(option => Array.isArray(value) && value.includes(option.value))}
          onChange={(selectedOptions) => onChange(selectedOptions.map(option => option.value))}
          placeholder="Select roles..."
          menuPlacement="auto"
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: '#1f2937',
              color: '#111828',
              borderColor: '#4b5563',
              borderRadius: '8px',
              padding: '8px'
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: '#1f2937',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            }),
            option: (provided, { data, isFocused, isSelected}) => ({
              ...provided,
              backgroundColor: isSelected ? '#081635' : isFocused ? '#2563eb' : 'transparent',
              color: isFocused || isSelected ? 'fff' : data.color 
            }),
            multiValue: (provided, { data }) => ({
              ...provided,
              color: isColorBright(data.color) ? '#808080' : data.color,
              border: `1px solid ${data.color}`,
              borderRadius: '9999px',
              backgroundColor: 'white',
              marginRight: '4px'
            }),
            multiValueLabel: (provided, { data }) => ({
              ...provided,
              color: isColorBright(data.color) ? '#808080' : data.color
            }),
            multiValueRemove: (provided, { data }) => ({
              ...provided,
              backgroundColor: 'white',
              ':hover': {
                color: 'white',
                backgroundColor: isColorBright(data.color) ? '#808080' : data.color
              },
              borderTopRightRadius: '9999px',
              borderBottomRightRadius: '9999px',
              marginLeft: '2px'
            }),
            placeholder: (provided) => ({
              ...provided,
              color: 'white'
            }),
            input: (provided) => ({
              ...provided,
              color: 'white'
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              color: 'gray',
              '&:hover': {
                color: 'white'
              },
              '&:active': {
                color: 'gray'
              }
            }),
            clearIndicator: (provided) => ({
              ...provided,
              color: 'gray',
              '&:hover': {
                color: 'white'
              },
              '&:active': {
                color: 'gray'
              }
            })
          }}
        />
      ): (
        <select
          className="bg-gray-800 text-white border border-gray-600 p-2.5 rounded w-full"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value || null)}
        >
          <option value="">No Role selected</option>
          {options.map((role) => (
            <option key={role.value} value={role.value} style={{color: role.color}}>
              {role.label}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}