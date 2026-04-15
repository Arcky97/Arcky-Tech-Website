export const DocsInputText = ({label, value, width}: {label: string, value: string, width: number}) => {
  return (
    <div className="mt-4">
      <label className="label-box">{label}</label>
      <input
        type="text"
        value={value}
        readOnly
        className={`content-box-w${width} mb-4 flex items-left`}
      />
    </div>
  )
}