"use client"
import Select from "react-select";
import clsx from "clsx";
import { selectStyles } from "@/lib/reactSelectStyles";

type Option = {
  value: string;
  label: string;
};

interface InputSelectProps {
  label: string,
  width: number,
  initValue: string,
  initLabel?: string,
  placeholder: string,
  handleChange?: (option: string) => void,
  options: readonly ({ value: string; label: string; })[],
  isDisabled?: boolean
  isClearable?: boolean
}

export const DocsInputSelect = ({label, width, initValue, initLabel, placeholder, handleChange, options, isDisabled, isClearable }: InputSelectProps) => {
  return (
    <div className={clsx("my-4", width ? `w-62.5` : "")}>
      <label className="label-box">{label}</label>
      <Select
        value={initValue
          ? { value: initValue, label: initLabel || initValue }
          : null
        }
        //onChange={(option: Option) => handleChange(option?.value)}
        options={options}
        placeholder={placeholder}
        isSearchable
        isClearable={isClearable}
        styles={selectStyles}
        isDisabled={isDisabled}
        menuPortalTarget={document.body}
        menuPlacement="auto"
        menuShouldScrollIntoView={false}
      />
    </div>
  )
}