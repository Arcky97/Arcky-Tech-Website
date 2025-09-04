import QueryProvider from "@/components/dashboard/QueryProvider";
import Sidebar from "@/components/Sidebar";
import { dashboardMenuItems } from "@/config";
import { authOptions } from "@/lib/dashboard/auth";
import fetchTableData from "@/lib/db/dataFetchers/fetchTableData";
import fetchDiscordChannels from "@/lib/discord/fetchDiscordChannels";
import { checkUserGuildPerms } from "@/lib/discord/permissions";
import { SessionGuild } from "@/types/next-auth";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import normalizeEventEmbedData from "@/lib/db/dataNormalizers/normalizeEventEmbedData";

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
      queryFn: async () => {
        const data = await fetchTableData("EventEmbeds", guildId);
        return normalizeEventEmbedData(guildId, data);
      },
      staleTime: staleTime
    }),
    queryClient.prefetchQuery({
      queryKey: ["generatedEmbeds", guildId],
      queryFn: async () => {
        return await fetchTableData("GeneratedEmbeds", guildId);
      },
      staleTime: staleTime
    }),
    queryClient.prefetchQuery({
      queryKey: ["guildChannels", guildId],
      queryFn: () => fetchDiscordChannels(guildId),
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