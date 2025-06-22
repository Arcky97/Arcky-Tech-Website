"use client"
import Select from "react-select";

interface Channel {
  id: string;
  name: string;
  type: number;
  parent_id?: string | null;
}

interface Props {
  label: string;
  value: string | string[] | null;
  onChange: (value: string | string[] | null) => void;
  channels: Channel[];
  multiSelect?: boolean;
  onlyCategories?: boolean;
  disItems?: string[];
  className?: string;
}

export default function ChannelDropdown({ label, value, onChange, channels, multiSelect, onlyCategories, disItems, className }: Props) {
  const groupedChannels: Record<string, { value: string; label: string}[]> = {};
  let options;
  if (!onlyCategories) {
    if (disItems && disItems.length > 0) {
      channels = channels.filter(channel => !disItems.includes(channel.id))
    }
    channels.forEach(channel => {
      if (channel.type !== 0) return;
      const category = channels.find(chan => chan.id === channel.parent_id)?.name || "No Category";
      
      if (!groupedChannels[category]) {
        groupedChannels[category] = [];
      }
      groupedChannels[category].push({ value: channel.id, label: `# ${channel.name}` });
    
    });
    options = Object.entries(groupedChannels).flatMap(([category, options]) => ({
      label: category,
      options,
    }));
  } else {
    options = channels.filter(channel => channel.type === 4 && !disItems?.includes(channel.id)).map(category => {
      return { value: category.id, label: category.name }
    })
  }

  return (
    <div className={`mb-4 ${className ?? ""}`}>
      <label className="block text-white text-lg font-bold">{label}</label>
      {multiSelect ? (
        /** Multi-Select Dropdown */
        <Select
          isMulti
          options={options}
          value={!onlyCategories 
            ? (options as { label: string, options: { value: string, label: string }[]}[])
                .flatMap(group => group.options)
                .filter(option => Array.isArray(value) && value.includes(option.value)) 
            : (options as { value: string, label: string}[])
              .filter(option => Array.isArray(value) && value.includes(option.value))
          }
          onChange={(selectedOptions) => onChange(selectedOptions.map(option => option.value))}
          placeholder="Select channels..."
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
              color: isFocused || isSelected ? 'fff' : 'gray'
            }),
            multiValue: (provided) => ({
              ...provided,
              color: 'gray',
              border: '1px solid gray',
              borderRadius: '9999px',
              backgroundColor: 'white',
              marginRight: '4px'
            }),
            multiValueLabel: (provided) => ({
              ...provided,
              color: 'gray'
            }),
            multiValueRemove: (provided) => ({
              ...provided,
              backgroundColor: 'white',
              ':hover': {
                color: 'white',
                backgroundColor: 'gray'
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

      ) : (
        /** Native Single-Select Dropdown */
        <select
          className="bg-gray-800 text-white border border-gray-600 p-2.5 rounded w-full"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value || null)}
        >
          <option value="">No channel selected</option>
          {!onlyCategories ? (
            Object.entries(groupedChannels).map(([category, items]) => (
              <optgroup key={category} label={category}>
                {items.map(channel => (
                  <option key={channel.value} value={channel.value}>
                    {channel.label}
                  </option>
                ))}
              </optgroup>
            ))
          ) : (
            (options as { value: string; label: string }[]).map(channel => (
              <option key={channel.value} value={channel.value}>
                {channel.label}
              </option>
            ))
          )}
          
        </select>
      )}
    </div>
  );
}