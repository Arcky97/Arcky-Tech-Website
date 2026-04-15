import { DocInputType } from "@/types/docInputType";

export const DocsInputNumber = ({label, value, width}: DocInputType) => {
  return (
    <div className="mt-4 text-left border rounded-lg border-gray-500/50">
      <label className="label-box">{label}</label>
      <input
        type="number"
        value={value}
        readOnly
        className={`content-box-w${width}`}
      />
    </div>
  )
}