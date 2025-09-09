import clsx from "clsx";
import { ReactNode } from "react";

type Allignment = "right" | "center" | "left" | null;

interface DashboardTableProps {
  label?: string;
  headers: string[];
  rows: Array<Array<ReactNode>>;
  align?: Allignment[];
  noRowScroll?: boolean;
  noDataText?: string;
  maxHeight?: string;
}

export default function DashboardTable({ label, headers, rows, align, noRowScroll, noDataText, maxHeight }: DashboardTableProps) {
  const scrollClass = rows.length > 5 && !noRowScroll ? `${maxHeight ?? "max-h-84"} overflow-y-auto` : "";

  return (
    <>
      {label && <label className="block text-white text-lg font-bold mb-2">{label}</label>}
      <div className={clsx("overflow-x-auto rounded-lg border border-gray-700 z-16", scrollClass)}>
        <table className="min-w-full table-auto bg-gray-800 text-white">
          <thead className="sticky top-0 bg-gray-700 z-16">
            <tr>
              {headers.map((header, i) => (
                <th 
                  key={i} 
                  className="text-center px-4 py-2 font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length >= 1 ? (rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-t border-gray-700 hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                >
                  {row.map((cell, colIndex) => {
                    const rowSpan = colIndex === row.length - 1 ? (headers.length - row.length) + 1 : 1;
                    return (
                      <td
                        key={colIndex}
                        className={clsx("px-4 py-3", `text-${align && align[colIndex]}
                        `)}
                        colSpan={rowSpan}
                      >
                        <div
                          className="overflow-auto h-auto"
                        >
                          {cell}
                        </div>
                      </td>
                    )}
                  )}
                </tr>
              )
            )) : (
              <tr className="border-t border-gray-700 hover:bg-gray-800 transition-colors duration-300 ease-in-out">
                <td 
                  colSpan={headers.length} 
                  className="px-4 py-3 text-center"
                >
                  {noDataText ?? "No Data Available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}