import Sidebar from "@/components/Sidebar";
import { dashboardMenuItems } from "@/config";
import { authOptions } from "@/lib/dashboard/auth";
import { checkUserGuildPerms } from "@/lib/discord/permissions";
import { SessionGuild } from "@/types/next-auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children, 
  params 
}: { 
  children: ReactNode; 
  params: Promise<{ guildId: string }
  >; 
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/doggo-bot");

  const { guildId } = await params;

  const guild = session.user.guilds?.find((g: SessionGuild) => g.id === guildId);

  if (!guild || !checkUserGuildPerms(guild)) redirect("/doggo-bot");

  return (
    <div className="flex">
      <Sidebar menuItems={dashboardMenuItems}/>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}