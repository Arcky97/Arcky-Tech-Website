type Body = { [key: string]: string | number | boolean | null | Body }

function createFetchRequestInit(method: string, body: string) {
  return {
    method: method,
    body: body,
    headers: { "Content-Type": "application/json" }
  }
}

export const createFetchPostInit = (body: Body) => createFetchRequestInit("POST", JSON.stringify(body));

export const createFetchPatchInit = (body: Body) => createFetchRequestInit("PATCH", JSON.stringify(body));

export const createFetchRemoveInit = (body: Body) => createFetchRequestInit("DELETE", JSON.stringify(body));