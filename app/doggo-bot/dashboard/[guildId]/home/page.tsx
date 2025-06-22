"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation";

export default function Home() {
  const [tableData, setTableData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const guildId = pathSegments[3] || "";

  useEffect(() => {
    if (!guildId) return;
    
    const fetchData = async () => {
      try {
        const tableName = "GuildSettings";
        const settingsRes = await fetch(`/api/database/${tableName}/${guildId}`);
        if (!settingsRes.ok) throw new Error(`Failed to fetch ${tableName}`);
        const settingsData = await settingsRes.json();
        setTableData(settingsData);
      } catch (error: any) {
        console.error(`Error fetching data for guild "${guildId}":`, guildId);
        setError(error.message);
      }
    };

    fetchData();
  }, [guildId]);

  return (
    <article className="flex flex-col mt-20 min-h-screen bg-gray-900 text-white">
      <section className="px-8 w-full max-w-screen-lg">
        <h1 className="text-2xl font-bold mb-4">Dasboard Home</h1>
        <p>Guild ID: <span className="font-mono text-blue-400">{guildId || "N/A"}</span></p>
        <h2 className="text-xl font-semibold mt-4">Retrieved Data:</h2>
        <pre className="bg-gray-800 p-4 rounded-md text-sm overflow-x-auto w-full">
          {tableData ? JSON.stringify(tableData, null, 2) : "Loading..."}
        </pre>
      </section>
    </article>
  )
}