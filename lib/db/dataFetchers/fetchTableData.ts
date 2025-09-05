import { createCatchErrorMessage, createResErrorMessage, createTableErrorMessage } from "../createErrorMessage";
import getEndPointUrl from "../getEndPointUrl";

export default async function fetchTableData(tableName: string, guildId?: string) {
  try {
    if (!tableName) throw new Error(createTableErrorMessage());

    console.log("when do we do this?");
    const endPoint = getEndPointUrl(tableName, guildId ?? undefined)

    const res = await fetch(endPoint);

    if (!res.ok) {
      if (res.status === 404) return [];
      throw new Error(createResErrorMessage('fetch', tableName));
    }

    const data = await res.json();
    return data ?? [];
  } catch (error: unknown) {
    console.error(createCatchErrorMessage('fetch', tableName, error));
    throw error;
  }
}