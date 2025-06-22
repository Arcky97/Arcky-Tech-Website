import React from "react";

interface Props {
  id: string;
  title: string;
  extraClass?: string | "";
  children: React.ReactNode;
}

export default function DashboardCards({ id, title, extraClass, children }: Props) {
  return (
    <div id={id} className={`bg-gray-800 p-5 rounded-lg w-full h-full flex flex-col transition-all duration-300 ease-in-out ${extraClass}`}>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {children}
    </div>
  )
}