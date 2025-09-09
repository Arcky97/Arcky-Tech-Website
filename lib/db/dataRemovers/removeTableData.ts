import { createFetchRemoveInit } from "../createFetchRequestInit";
import { createCatchErrorMessage, createResErrorMessage, createTableErrorMessage } from "../createErrorMessage";
import getEndPointUrl from "../getEndPointUrl";

export const deleteGeneratedEmbed = async (tableName: string, guildId: string, embedId: number | null) => {
  try {
    if (!tableName) throw new Error(createTableErrorMessage());

    const endPoint = getEndPointUrl(tableName, guildId);

    const res = await fetch(endPoint, createFetchRemoveInit({ id: embedId}));

    if (!res.ok) throw new Error(createResErrorMessage('remove embed', tableName));

  } catch (error) {
    console.error(createCatchErrorMessage('remove', tableName, error));
  }
}