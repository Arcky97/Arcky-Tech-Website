"use client";
import ColorButton from "@/components/ColorButton";
import DashboardTable from "@/components/DashboardTable";
import { fetchTableData } from "@/utils/fetchTableData";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function toPascalCase(str: any) {
  return str.split('-').map((word: any) =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');
}

export default function DatabaseTablePage() {
  const params = useParams();
  const tableId = params.tableId;
  const tableName = toPascalCase(tableId);

  const [tableData, setTableData] = useState<any>(null);
  const [schemaData, setSchemaData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [rowToEdit, setRowToEdit] = useState<any>({});
  const [rowToRemove, setRowToRemove] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tableData, schemaData] = await fetchTableData(tableName, '', true);
        setSchemaData(schemaData);
        setTableData(tableData);
      } catch (error: any) {
        console.error(`Error fetching data from ${tableName}. Check if the name of the Table is correct.`);
        setError(error.message);
      }
    };
    fetchData();
  }, [tableId]);

  console.log(rowToEdit);
  function transformRow(row: any, schema: any) {
    return [
      schema.map((col: any) => {
        const columnName = col.COLUMN_NAME;
        const dataType = col.DATA_TYPE;

        const value = row[columnName];
        if (dataType === "tinyint") {
          return value === 1 ? "True" : "False";
        } else if (dataType === "longtext") {
          try {
            return <pre className="bg-gray-800 px-4 rounded-md overflow-auto">{JSON.stringify(JSON.parse(value), null, 2)}
            </pre>;
          } catch (error) {
            console.log(error);
            return <pre className="bg-gray-800 px-4 rounded-md overflow-auto">
              {value}
            </pre>;
          }
        } else if (value === null) {
          return "No value"
        }
        return value;
      }), 
      <div className="flex space-x-2">
        <ColorButton
          color="blue"
          text="Edit"
          action={() => {
            setRowToEdit(row);
            console.log("Editing row:", row);
          }}
        />
        <ColorButton
          color="red"
          text="Remove"
          action={()=> {
            setRowToRemove(row);
            console.log("Removing row:", row);
          }}
        />
      </div>
    ].flat(1);
  }

  return (
    <>
      <article className="flex flex-col px-8 mt-20 pb-30 min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl font-bold mb-4">Table: {tableName}</h1>
        {error && <p className="text-red-500">Error: {error}</p>}
        {tableData && (
          <DashboardTable
            headers={[schemaData.map((data: any) => data.COLUMN_NAME), "Action"].flat(1)}
            rows={
              tableData.map((entry: any) =>
                transformRow(entry, schemaData)
              )
            }
            alignment="left"
            noRowScroll={true}
          />
        )}
      </article>
      {/* Database Table Row Editor */}

      {/* Database Table Row Remover */}
      {rowToRemove.length > 0 && (
        <></>
      )}
    </>
  )
}