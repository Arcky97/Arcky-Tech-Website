import { useState, useEffect } from "react";

interface Props {
  label: string;
  configKey: string;
  value: string;
  onChange: (value: string) => void;
  configData: Record<string, Record<string, Record<string, any>>>;
  singleOpen?: boolean;
}

export default function CheckboxGroup({ label, configKey, value, onChange, configData, singleOpen = false }: Props) {
  const options = configData[configKey] || {};
  const parsedValue = value ? JSON.parse(value) : {};

  const isNested = typeof Object.values(parsedValue)[0] === "object";
  const [checkedItems, setCheckedItems] = useState<Record<string, any>>(parsedValue);
  const [openDescription, setOpenDescription] = useState<Record<string, boolean>>({});

  useEffect(() => {
    onChange(JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    setCheckedItems(parsedValue);
  }, [value]);

  const handleToggleDescription = (key: string) => {
    setOpenDescription((prev) => {
      if (singleOpen) {
        return { [key]: !prev[key] };
      } else {
        return { ...prev, [key]: !prev[key] };
      }
    })
  };

  const handleResetDescription = () => {
    setOpenDescription({});
  };

  const anyDescriptionOpen = () => {
    return Object.keys(openDescription).length > 0;
  };

  const handleChange = (key: string, parentKey?: string) => {
    setCheckedItems((prev) => {
      if (parentKey) {
        return {
          ...prev,
          [parentKey]: {
            ...prev[parentKey],
            [key]: !prev[parentKey]?.[key] || false,
          }
        };
      } else {
        return {
          ...prev,
          [key]: !prev[key] || false
        }
      }
    });
  };


  const isAllChecked = (groupKey?: string) => {
    const target = groupKey ? checkedItems[groupKey] ||{} : checkedItems;
    return Object.keys(target).every((key) => target[key]);
  };

  const handleSelectAll = (groupKey?: string) => {
    setCheckedItems((prev) => {
      if (groupKey) {
        const allChecked = isAllChecked(groupKey);
        return {
          ...prev,
          [groupKey]: Object.fromEntries(Object.keys(options[groupKey]).map((key) => [key, !allChecked]))
        };
      } else {
        const allChecked = isAllChecked();
        return Object.fromEntries(Object.keys(options).map((key) => [key, !allChecked]));
      }
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg">
      <label className="block text-white text-lg font-bold mb-2 mt-5">
        {label}
        <span 
          className={`transition-all duration-300 ease-in-out ${
            anyDescriptionOpen() ? 'opacity-100' : 'opacity-0'
          } text-sm cursor-pointer select-none`} 
          onClick={() => handleResetDescription()}
        >
          {anyDescriptionOpen() ? " hide all" : ""}
        </span>
      </label>
      {isNested ? (
        Object.entries(options).map(([groupKey, groupOptions]) => (
          <div key={groupKey} className="mb-4">
            <div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isAllChecked(groupKey)}
                  onChange={() => handleSelectAll(groupKey)}
                  className="w-5 h-5 cursor-pointer"
                />
                <span className="text-lg font-bold cursor-pointer select-none" onClick={() => handleToggleDescription(`${groupKey}`)}>{options?.[groupKey].all?.name}</span>
              </div>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openDescription[`${groupKey}`] ? "max-h-40 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}
              >
                <p className="text-gray-400 mt-1 ml-7 select-none">{options?.[groupKey].all?.description}</p>
              </div>
            </div>
            <div className="ml-6 my-2 space-y-2">
              {Object.keys(groupOptions).map((key) => 
                key !== "all" ? (
                  <div key={key} className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checkedItems[groupKey]?.[key] || false}
                        onChange={() => handleChange(key, groupKey)}
                        className="w-5 h-5 cursor-pointer"
                      />
                      <span className="cursor-pointer select-none" onClick={() => handleToggleDescription(`${groupKey}${key}`)}>{options?.[groupKey]?.[key].name}</span>
                    </div>
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${openDescription[`${groupKey}${key}`] ? "max-h-40 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2" }`}
                    
                    >
                      <p className="text-gray-400 mt-1 ml-7 select-none">{options?.[groupKey]?.[key].description}</p>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        ))
      ) : (
        <div>
          <div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isAllChecked()}
                onChange={() => handleSelectAll()}
                className="w-5 h-5 cursor-pointer"
              />
              <span className="text-lg font-bold cursor-pointer select-none" onClick={() => handleToggleDescription("all")}>{options.all?.name}</span>
            </div>
            <div
              className={`transiton-all duration-300 ease-in-out overflow-hidden ${openDescription["all"] ? "max-h-40 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}
            >
              <p className="text-gray-400 mt-1 ml-7 select-none">{options.all?.description}</p>
            </div>
          </div>
          <div className="ml-6 my-2 space-y-2">
            {Object.keys(options).map((key) => 
              key !== "all" ? (
                <div key={key} className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checkedItems[key] || false}
                      onChange={() => handleChange(key)}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <span className="cursor-pointer select-none" onClick={() => handleToggleDescription(key)}>{options[key]?.name}</span>
                  </div>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openDescription[key] ? "max-h-40 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-0"}`}
                  >
                    <p className="text-gray-400 mt-1 ml-7 select-none">{options[key]?.description}</p>

                  </div>
                </div>
              ) : null 
            )}
          </div>
        </div>
      )}
    </div>
  );
}
