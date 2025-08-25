import { HomeIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, ShieldCheckIcon, TagIcon, CodeBracketIcon, CogIcon } from "@heroicons/react/24/outline";

export const dashboardMenuItems = [
  {
    path: "home",
    icon: <HomeIcon className="w-6 h-6"/>,
    text: "Home"
  },
  {
    path: "level-system",
    icon: <ChatBubbleLeftRightIcon className="w-6 h-6"/>,
    text: "Level System",
    disabled: true,
    subItems: [
      { path: "#announcements", text: "Announcements" },
      { path: "#blacklist", text: "Blacklist" },
      { path: "#roles", text: "Levels" },
      { path: "#multipliers", text: "Multipliers" },
      { path: "#voice", text: "Voice" },
      { path: "#xp", text: "XP" },
      { path: "#modify", text: "Modify" },
      { path: "#reset", text: "Reset"}
    ]
  },
  {
    path: "logging",
    icon: <DocumentTextIcon className="w-6 h-6"/>,
    text: "Logging",
    disabled: true,
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
    disabled: true,
    subItems: [
      { path: "#settings", text: "Settings" },
      { path: "#mute", text: "Mute Role" },
      { path: "#join", text: "Join Roles" }
    ]
  },
  {
    path: "reation-roles",
    icon: <TagIcon className="w-6 h-6"/>,
    text: "Reaction Roles",
    disabled: true,
  },
  {
    path: "embeds",
    icon: <CodeBracketIcon className="w-6 h-6"/>,
    text: "Embeds",
    subItems: [
      { path: "#welcome", text: "Welcome Embed" },
      { path: "#leave", text: "Leave Embed" },
      { path: "#ban", text: "Ban Embed" },
      { path: "#generated", text: "Generated Embeds" }
    ]
  },
  {
    path: "settings",
    icon: <CogIcon className="w-6 h-6"/>,
    text: "Settings",
    disabled: true,
    subItems: [
      { path: "#chatting", text: "Chatting" }
    ]
  }
];