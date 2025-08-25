import QueryProvider from "@/components/dashboard/QueryProvider";
import Sidebar from "@/components/Sidebar";
import { dashboardMenuItems } from "@/config";
import { authOptions } from "@/lib/dashboard/auth";
import fetchTableData from "@/lib/db/fetchTableData";
import { checkUserGuildPerms } from "@/lib/discord/permissions";
import { SessionGuild } from "@/types/next-auth";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children, 
  params 
}: { 
  children: ReactNode; 
  params: Promise<{ guildId: string }>; 
}) {

  const session = await getServerSession(authOptions);

  if (!session) redirect("/doggo-bot");

  const { guildId } = await params;

  const guild = session.user.guilds?.find((g: SessionGuild) => g.id === guildId);

  if (!guild || !checkUserGuildPerms(guild)) redirect("/doggo-bot/servers");

  const staleTime = 1000 * 60 * 5;
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["guildSettings", guildId],
      queryFn: () => fetchTableData("GuildSettings", guildId),
      staleTime: staleTime
    }),
    queryClient.prefetchQuery({
      queryKey: ["levelSystem", guildId],
      queryFn: () => fetchTableData("LevelSystem", guildId),
      staleTime: staleTime
    }),
    queryClient.prefetchQuery({
      queryKey: ["levelSettings", guildId],
      queryFn: () => fetchTableData("LevelSettings", guildId),
      staleTime: staleTime
    }),
    queryClient.prefetchQuery({
      queryKey: ["eventEmbeds", guildId],
      queryFn: () => fetchTableData("EventEmbeds", guildId),
      staleTime: staleTime
    }),
    queryClient.prefetchQuery({
      queryKey: ["generatedEmbeds", guildId],
      queryFn: () => fetchTableData("GeneratedEmbeds", guildId),
      staleTime: staleTime
    })
  ]);

  const dehydratedState = dehydrate(queryClient)
  return (
    <QueryProvider dehydrateState={dehydratedState}>
      <div className="flex">
        <Sidebar menuItems={dashboardMenuItems}/>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </QueryProvider>
  )
}