import { HomeIcon, ChatIcon, DocumentTextIcon, ShieldCheckIcon, TagIcon, CodeIcon, CogIcon } from "@heroicons/react/outline";

export const dashboardMenuItems = [
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