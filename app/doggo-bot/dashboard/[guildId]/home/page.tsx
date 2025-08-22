"use client"
import { useDashboardSession } from "@/app/provider";
import { useParams } from "next/navigation"

export default function Home() {
  const { guildId } = useParams<{guildId: string }>();
  const session = useDashboardSession();
  const guild = session.user.guilds?.find(g => g.id === guildId);
  
  return (
    <div className="min-h-[calc(100vh-189px)]">
      <h1 className="head1">Welcome, {session?.user.name}, to Doggo Bot Dashboard</h1>
      <h2 className="head2">Your Server: {guild?.name ?? "unknown"}</h2>
      <p className="text-white text-center text-lg">It&#39;s still in early development so please come back later!</p>
    </div>
  )
}