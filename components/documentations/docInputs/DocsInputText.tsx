import { DocInputType } from "@/types/docInputType"

export const DocsInputText = ({label, value = "", width}: DocInputType) => {
  return (
    <div className="my-4 p-2 text-left border rounded-lg border-gray-500/50">
      <label className="label-box">{label}</label>
      <input
        type="text"
        value={value}
        readOnly
        className={`content-box-w${width}`}
      />
    </div>
  )
}