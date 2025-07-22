import clsx from "clsx";
import { ReactNode } from "react";

type Alignment = "left" | "center" | "right";

export interface DocsTableProps {
  headers: Array<ReactNode>;
  alignment?: Alignment[];
  rows: Array<Array<ReactNode>>;
}

export default function DocsTable({ headers, alignment, rows }: DocsTableProps) {
  return (
    <div className="w-fit overflow-auto rounded-lg text-gray-300">
      <table className="border border-gray-600/75 px-2 select-none">
        <thead className="bg-blue-400/10">
          <tr className="">
            {headers.map((header, i) => (
              <th key={i} className="px-12 py-2 text-center font-bold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-t border-gray-600/75 hover:bg-blue-400/5 transition-all duration-300 ease-in-out"
            >
              {row.map((cell, colIndex) => (
                <td 
                  key={colIndex}
                  className={clsx("px-4 py-2 hover:bg-blue-400/5 transition-all duration-300 ease-in-out", `text-${alignment && alignment[colIndex]}`)}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}