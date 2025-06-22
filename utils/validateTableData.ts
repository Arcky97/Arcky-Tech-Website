import { schemaByTable } from "@/lib/validation/schemaByTable";

export function validateTableData(table: string, data: unknown ) {
  const schema = schemaByTable[table];
  if (!schema) {
    throw new Error(`No schema defined for table: ${table}`);
  }
  return schema.parse(data);
} 