import { DocInputType } from "@/types/docInputType"

export const DocsInputTextArea = ({label, value, width}: DocInputType) => {
  return (
    <div className="mt-4 text-left border rounded-lg border-gray-500/50">
      <label className="label-box">{label}</label>
      <textarea
        value={value}
        readOnly
        className={`content-box-w${width || 50} min-h-18`}
      />
    </div>

  )
}