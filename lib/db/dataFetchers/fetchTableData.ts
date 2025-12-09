import { createCatchErrorMessage, createResErrorMessage, createTableErrorMessage } from "../createErrorMessage";
import getEndPointUrl from "../getEndPointUrl";

export default async function fetchTableData(tableName: string, guildId?: string) {
  try {
    if (!tableName) throw new Error(createTableErrorMessage());

    console.log("Getting Endpoint url from fetchTableData.ts.");
    const endPoint = getEndPointUrl(tableName, guildId ?? undefined)

    const res = await fetch(endPoint);

    if (!res.ok) {
      if (res.status === 404) return [];
      throw new Error(createResErrorMessage('fetch', tableName));
    }

    console.log("Endpoint url request successfull!");
    const data = await res.json();
    return data ?? [];
  } catch (error: unknown) {
    console.error(createCatchErrorMessage('fetch', tableName, error));
    throw error;
  }
}