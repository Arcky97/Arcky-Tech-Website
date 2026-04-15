"use client"
import Select from "react-select";
import { selectStyles } from "@/lib/reactSelectStyles";

interface InputSelectProps {
  label: string,
  width: number,
  initValue: string,
  initLabel?: string,
  placeholder: string,
  options: readonly ({ value: string; label: string; })[],
  isClearable?: boolean
}

export const DocsInputSelect = ({label, width, initValue, initLabel, placeholder, options, isClearable }: InputSelectProps) => {
  return (
    <div className="my-4 p-2 text-left border rounded-lg border-gray-500/50" style={{ width }}>
      <span className="label-box p-2">{label}</span>
      <Select
        id="select"
        value={{ value: initValue, label: initLabel || initValue }}
        options={options}
        placeholder={placeholder}
        isSearchable
        isClearable={isClearable}
        menuPortalTarget={window.document.body}
        styles={selectStyles}
        menuPlacement="auto"
      />
    </div>
  )
}