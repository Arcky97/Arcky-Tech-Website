import { DocInputType } from "@/types/docInputType";

export const DocsInputNumber = ({label, value, width}: DocInputType) => {
  return (
    <div className="my-4 p-2 text-left border rounded-lg border-gray-500/50 w-full">
      <label className="label-box">{label}</label>
      {typeof value === "object" ? (
        <div className="flex space-x-4">
          {value.map((v, index) => (
            <input
              key={index}
              type="number"
              value={v}
              readOnly
              className={`content-box-w${width}`}
            />
          ))}
        </div>
      ) : (
        <input
          type="number"
          value={value}
          readOnly
          className={`content-box-w${width}`}
        />
      )}

    </div>
  )
}