"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { ChatIcon, CodeIcon, CogIcon, DocumentTextIcon, HomeIcon, ShieldCheckIcon, TagIcon } from "@heroicons/react/outline";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    //router.push("/api/auth/signin/discord");
    redirect("/doggo-bot");
  }

  const menuItems = [
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
        { path: "#lvssys-modify", text: "Modify" },
        { path: "#lvsys-reset", text: "Reset" },
      ] 
    },
    { 
      path: "logging", 
      icon: <DocumentTextIcon className="w-6 h-6"/>, 
      text: "Logging",
      subItems: [
        { path: "#message", text: "Message Logging" },
        { path: "#member", text: "Member Logging" },
        { path: "#server", text: "Server Logging" },
        { path: "#voice", text: "Voice Logging" },
        { path: "#join-leave", text: "Join-Leave Logging" },
        { path: "#report-ignore", text: "Report/Ignore Logging" }
      ]
    },
    { 
      path: "moderation", 
      icon: <ShieldCheckIcon className="w-6 h-6"/>, 
      text: "Moderation",
      subItems: [
        { path: "#mod-settings", text: "Settings" },
        { path: "#mod-mute", text: "Mute Role"},
        { path: "#mod-join", text: "Join Roles"}
      ]
    },
    { 
      path: "reactionroles", 
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
      <div className="flex-1 bg-gray-900">
        {children}
      </div>
    </div>
  );
}
