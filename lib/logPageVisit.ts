export async function logPageVisit(path: string) {
  try {
    await fetch("http://144.91.102.161:3012/api/visits", {
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