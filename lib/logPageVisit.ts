export async function logPageVisit(path: string) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/visits/v1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY_WEBSITE!
      },
      body: JSON.stringify({
        path,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent
      })
    });
  } catch {
    
  }
}