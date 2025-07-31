import { ReactNode } from "react";

export const DocsHeader = ({title, children}: {title:string; children?: ReactNode;}) => {
  return (
    <header className="text-white text-center">
      <h1 className="text-3xl lg:text-4xl font-bold text-center">{title}</h1>
      <br/>
      <div className="[&>p]:text-center text-base font-normal">{children}</div>
      <hr className="border-gray-600/75 border-t-1 mt-2 mb-4"/>
    </header>
  )
}