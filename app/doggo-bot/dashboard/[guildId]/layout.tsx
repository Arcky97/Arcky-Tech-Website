import Sidebar, { MenuItem } from "@/components/Sidebar";
import { authOptions } from "@/lib/dashboard/auth";
import { ChatIcon, CodeIcon, CogIcon, DocumentTextIcon, ShieldCheckIcon, TagIcon } from "@heroicons/react/outline";
import { HomeIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/doggo-bot");

  const menuItems: MenuItem[] = [
    {
      path: "home",
      icon: <HomeIcon className="w-6 h-6"/>,
      text: "Home"
    },
    {
      path: "levels",
      icon: <ChatIcon className="w-6 h-6"/>,
      text: "Level System",
      subItems: [
        { path: "#lvsys-announce", text: "Announcements" },
        { path: "#lvsys-blacklist", text: "Blacklist" },
        { path: "#lvsys-roles", text: "Levels" },
        { path: "#lvsys-multipliers", text: "Multipliers" },
        { path: "#lvsys-voice", text: "Voice" },
        { path: "#lvsys-xp", text: "XP" },
        { path: "#lvsys-modify", text: "Modify" },
        { path: "#lvsys-reset", text: "Reset"}
      ]
    },
    {
      path: "logging",
      icon: <DocumentTextIcon className="w-6 h-6"/>,
      text: "Logging",
      subItems: [
        { path: "#message", text: "Message Logging"},
        { path: "#member", text: "Member Logging" },
        { path: "#server", text: "Sever Logging" },
        { path: "#voice", text: "Voice Logging" },
        { path: "#join-leave", text: "Join-Leave Logging" },
        { path: "#report-ignore", text: "Report/ Ignore Logging" }
      ]
    },
    {
      path: "moderation",
      icon: <ShieldCheckIcon className="w-6 h-6"/>,
      text: "Moderation",
      subItems: [
        { path: "#mod-settings", text: "Settings" },
        { path: "#mod-mute", text: "Mute Role" },
        { path: "#mod-join", text: "Join Roles" }
      ]
    },
    {
      path: "reationroles",
      icon: <TagIcon className="w-6 h-6"/>,
      text: "Reaction Roles"
    },
    {
      path: "embeds",
      icon: <CodeIcon className="w-6 h-6"/>,
      text: "Embeds"
    },
    {
      path: "settings",
      icon: <CogIcon className="w-6 h-6"/>,
      text: "Settings",
      subItems: [
        { path: "#chatting", text: "Chatting" }
      ]
    }
  ];

  return (
    <div className="flex">
      <Sidebar menuItems={menuItems}/>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}