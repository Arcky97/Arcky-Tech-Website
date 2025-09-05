import { createFetchPatchInit } from "../createFetchRequestInit";
import { EventEmbedRaw, GeneratedEmbedRaw } from "../dataNormalizers/normalizeEventEmbedData";
import { createCatchErrorMessage, createIdErrorMessage, createResErrorMessage, createTableErrorMessage } from "../createErrorMessage";
import getEndPointUrl from "../getEndPointUrl";

export const updateEventEmbedTableData = async (tableName: string, guildId: string, type: "welcome" | "leave" | "ban", updatedData: Partial<EventEmbedRaw>) => {
  try {
    if (!tableName) throw new Error(createTableErrorMessage());

    const endPoint = getEndPointUrl(tableName, guildId);

    const res = await fetch(endPoint, createFetchPatchInit({ keys: { type: type }, data: updatedData }));

    if (!res.ok) throw new Error(createResErrorMessage('update', tableName));
  } catch (error) {
    console.error(createCatchErrorMessage('update', tableName, error));
  }
}

export const updateGeneratedEmbedTableData = async (tableName: string, guildId: string, id: number | null, updatedData: Partial<GeneratedEmbedRaw>) => {
  try {
    if (!tableName) throw new Error(createTableErrorMessage());
    if (!id) throw new Error(createIdErrorMessage());

    const endPoint = getEndPointUrl(tableName, guildId);

    const res = await fetch(endPoint, createFetchPatchInit({ keys: { id: id }, data: updatedData }));

    if (!res.ok) throw new Error(createResErrorMessage('update', tableName));
  } catch (error) {
    console.error(createCatchErrorMessage('update', tableName, error));
  }
}