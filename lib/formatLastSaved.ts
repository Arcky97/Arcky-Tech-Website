export default function formatLastSaved(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  let relative = "";
  if (diffMinutes < 1) {
    relative = "just now";
  } else if (diffMinutes === 1) {
    relative = "1 min ago";
  } else {
    relative = `${diffMinutes} mins ago`;
  }

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });

/*
  const day = date.toLocaleTimeString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
*/

  return `${relative} at ${time}`;
}