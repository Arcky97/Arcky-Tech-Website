"use client"

interface Props {
  label?: string;
  headers: string[];
  rows: Array<Array<React.ReactNode>>;
  alignment?: string | "right" | "center" | "left";
  noRowScroll?: boolean;
}

export default function DashboardTable({ label, headers, rows, alignment, noRowScroll }: Props) {
  const scrollClass = rows.length > 5 && !noRowScroll ? "max-h-84 overflow-y-auto" : ""

  return (
    <>
      {label && <label className="block text-white text-lg font-bold mb-2">{label}</label>}
      <div className={`overflow-x-auto rounded-lg border border-gray-700 ${scrollClass}`}>
        <table className="min-w-full table-auto bg-gray-800 text-white">
          <thead className="sticky top-0 bg-gray-700 z-10">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="text-center px-4 py-2 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length >= 1 ? (rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-t border-gray-700 hover:bg-gray-750 transition-colors duration-300 ease-in-out`}
              >
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className={`px-4 py-3 text-${alignment ?? "center"}`}>
                    <div
                      className={`overflow-auto max-h-[148px]`}>
                      {cell}
                    </div>
                  </td>
                ))}
              </tr>
            ))) : (
              <tr className="border-t border-gray-700 hover:bg-gray-750 transition-colors duration-300 ease-in-out">
                <td colSpan={headers.length} className="px-4 py-3 text-center">No {label ?? "data"} have been added</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}