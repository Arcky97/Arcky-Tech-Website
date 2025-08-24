"use client"
import { CodeBlock } from "@/components/CodeBlock";
import { useDashboardSession } from "@/components/dashboard/provider";
import fetchTableData from "@/lib/db/fetchTableData";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"

export default function Home() {
  const { guildId } = useParams<{guildId: string }>();
  const session = useDashboardSession();
  const guild = session.user.guilds?.find(g => g.id === guildId);
  const { data, isLoading } = useQuery({
    queryKey: ["guildSettings", guildId],
    queryFn: () => fetchTableData("GuildSettings", guildId),
    staleTime: 1000 * 60 * 5,
    enabled: !!guildId,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  return (
    <div className="min-h-[calc(100vh-189px)]">
      <h1 className="head1">Welcome, {session?.user.name}, to Doggo Bot Dashboard</h1>
      <h2 className="head2">Your Server: {guild?.name ?? "unknown"}</h2>
      <p className="text-white text-center text-lg">It&#39;s still in early development so please come back later!</p>
      <div className="text-white text-center text-lg mt-8">
        {isLoading && (
          <p>Loading Data...</p>
        )}
        {data && (
          <p>Data was successfully fetched from the database! Hooray to Arcky!</p>
        )}
      </div>
    </div>
  )
}