export function createTableErrorMessage() {
  return 'No Table provided';
}

export function createIdErrorMessage() {
  return 'No ID provided';
}

export function createResErrorMessage(action: string, table: string) {
  return `Failed to ${action} ${table} Table.`;
}

export function createCatchErrorMessage(action: string, table: string, error?: unknown) {
  const base = `Failed to ${action} table data for ${table} Table.`

  if (error instanceof Error) {
    return `${base} Error: ${error.message}`;
  }

  return base;
}