"use client"
import Sidebar from "@/components/Sidebar";
import { AdjustmentsIcon, CalendarIcon, ChartBarIcon, ChatIcon, ClipboardListIcon, CogIcon, DocumentDuplicateIcon, EmojiHappyIcon, HomeIcon, PresentationChartBarIcon, ShieldExclamationIcon, StarIcon, TableIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function DatabaseLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    
    if (session?.user.id) {
      fetch('/api/database', {
        headers: {
          'User-ID': session.user.id 
        }
      })
      .then(async (res) => {
        if (res.ok) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      })
      .finally(() => setLoading(false));
    } else {
      redirect('/doggo-bot');
    }
  }, [session, status]);

  if (loading) {
    return <div>Checking Authorization...</div>
  }

  const menuItems = [
    {
      path: "",
      icon: <HomeIcon className="w-6 h-6"/>,
      text: "Overview"
    },
    {
      path: "guild-settings",
      icon: <CogIcon className="w-6 h-6"/>,
      text: "Guild Settings"
    },
    {
      path: "level-system",
      icon: <StarIcon className="w-6 h-6"/>,
      text: "Level System"
    },
    {
      path: "level-settings",
      icon: <AdjustmentsIcon className="w-6 h-6"/>,
      text: "Level Settings"
    },
    {
      path: "event-embeds",
      icon: <CalendarIcon className="w-6 h-6"/>,
      text: "Event Embeds"
    },
    {
      path: "generated-embeds",
      icon: <DocumentDuplicateIcon className="w-6 h-6"/>,
      text: "Generated Embeds"
    },
    {
      path: "moderation-logs",
      icon: <ClipboardListIcon className="w-6 h-6"/>,
      text: "Moderation Logs"
    },
    {
      path: "premium-users-and-guilds",
      icon: <PresentationChartBarIcon className="w-6 h-6"/>,
      text: "Premium Users and Guilds"
    },
    {
      path: "reaction-roles",
      icon: <EmojiHappyIcon className="w-6 h-6"/>,
      text: "Reaction Roles"
    },
    {
      path: "user-stats",
      icon: <TableIcon className="w-6 h-6"/>,
      text: "User Stats"
    },
    {
      path: "bot-replies",
      icon: <ChatIcon className="w-6 h-6"/>,
      text: "Bot Replies"
    },
    {
      path: "bot-stats",
      icon: <ChartBarIcon className="w-6 h-6"/>,
      text: "Bot Stats"
    },
    {
      path: "doggo-board-pins",
      icon: <ShieldExclamationIcon className="w-6 h-6"/>,
      text: "Doggo Board Pins"
    },
    {
      path: "doggo-board-settings",
      icon: <AdjustmentsIcon className="w-6 h-6"/>,
      text: "Doggo Board Settings"
    }
  ];

  return (
    <div className="flex">
      <Sidebar menuItems={menuItems}/>
      <div className="flex-1 bg-gray-900">
        {children}
      </div>
    </div>
  )
}