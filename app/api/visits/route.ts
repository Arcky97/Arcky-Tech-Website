// /app/api/visits/route.ts
export async function POST(req: Request) {
  return fetch(`${process.env.API_BASE}/api/visits/v1`, {
    method: "POST",
    headers: {
      "x-api-key": process.env.API_KEY!
    },
    body: await req.text()
  });
}