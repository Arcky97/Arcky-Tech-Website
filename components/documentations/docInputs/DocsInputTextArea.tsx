export const DocsInputTextArea =(value: string, width: string) => {
  return (
    <textarea
      value={value}
      readOnly
      className={`content-box-w${width || 50} min-h-18 my-4 flex items-left`}
    />
  )
}