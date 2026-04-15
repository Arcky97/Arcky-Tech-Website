import { DocInputType } from "@/types/docInputType"

export const DocsInputText = ({label, value, width}: DocInputType) => {
  return (
    <div className="mt-4 text-left border rounded-lg border-gray-500/50" style={{ width: `${width * 4}px` }}>
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