"use client"
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Settings() { 
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const guildId = pathSegments[3] || "";
  return (
    <article className="flex flex-col px-8 mt-20 pb-30 min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Dashboard Settings</h1>
      <p>Guild ID: <span className="font-mono text-blue-400">{guildId || "N/A"}</span></p>
      {error && <p className="text-red-500">Error: {error}</p>}
    </article>
  )
}