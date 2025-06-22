"use client"
import { fetchDiscordChannels } from "@/utils/fetchDiscordChannels";
import { fetchTableData } from "@/utils/fetchTableData";
import { handleChange } from "@/utils/handleTableData";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Moderation() { 
  const [initialTableData, setInitialTableData] = useState<any>(null);
  const [tableData, setTableData] = useState<any>(null);
  const [changedData, setChangedData] = useState<Record<string, any>>({});
  const [channels, setChannels] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const guildId = pathSegments[3] || "";
  const tableName = "GuildSettings";

  useEffect(() => {
    if (!guildId) return;

    const fetchData = async () => {
      try {
        const tableData = await fetchTableData(tableName, guildId);
        setTableData(tableData[0]);
        setInitialTableData(tableData[0]);

        const channelsData = await fetchDiscordChannels(guildId);
        setChannels(channelsData);
      } catch (error: any) {
        console.error(`Error fetching data for guild "${guildId}":`, guildId);
        setError(error.message);
      }
    };

    fetchData();
  }, [guildId]);

  const callHandelChange = (key: string, value: string | string[] | number | boolean | null, type?:string) => {
    handleChange(setTableData, initialTableData, setChangedData, key, value, type);
  }
  
  return (
    <article className="flex flex-col px-8 mt-20 pb-30 min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Dashboard Moderation</h1>
      <p>Guild ID: <span className="font-mono text-blue-400">{guildId || "N/A"}</span></p>
      {error && <p className="text-red-500">Error: {error}</p>}
    </article>
  )
}