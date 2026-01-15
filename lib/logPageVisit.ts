export async function logPageVisit(path: string) {
  try {
    await fetch(`https://api.arcky-tech.be/api/visits/v1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "ebc905a8edad5cdf605d9ad5d13f5d0873f0c8e661e3a48192d281e74def447d"
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