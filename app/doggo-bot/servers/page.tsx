"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchTableData } from "@/utils/fetchTableData";
import Image from "next/image";

export default function Servers() {
  const { data: session, status } = useSession();
  const [botGuilds, setBotGuilds] = useState<string[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/doggo-bot"); // Redirect to login page if not authenticated
    }
  }, [session, status]);

  const tableName = "GuildSettings"
  useEffect(() => {

    const fetchData = async () => {
      try {
        const tableData = await fetchTableData(tableName);
        setBotGuilds(tableData.map((guild: { guildId: any; }) => guild.guildId));
      } catch (error) {
        console.error("Error fetching Guild Ids:", error);
      }
    };

    fetchData();
  }, [tableName]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <article className="flex flex-col mt-16 min-h-screen bg-gray-900 text-white items-center">
      <section className="text-center p-8 w-7/8">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {session?.user?.name}!<br />
          Select one of the available Servers:
        </h1>
        <div className="flex flex-wrap justify-center">
          {session?.user?.guilds?.length ? (
            session.user.guilds.map((guild) => {
              const botInGuild = botGuilds.includes(guild.id);
              // Check if the user has either the Administrator or Manage Server permission
              const isAdmin = (guild.permissions & 0x8 || guild.permissions & 0x20) !== 0;
              if (!isAdmin) return null; // Skip guilds without the permissions

              const initials = guild.name
                .split(' ')
                .map(part => part[0])
                .join('');
              
              return (
                <div
                  key={guild.id}
                  className={`p-4 rounded-lg text-center min-w-[150px] max-w-[200px] w-1/6 ${
                    botInGuild ? "bg-gray-800" : "bg-gray-700 grayscale"
                  } transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-blue-500/50 hover:ring-2 hover:ring-blue-500 m-2`}
                >
                  <Link
                    href={
                      botInGuild
                        ? `/doggo-bot/dashboard/${guild.id}/home`
                        : `https://discord.com/oauth2/authorize?&client_id=1256260023361863732&scope=applications.commands+bot&permissions=66321471&guild_id=${guild.id}&response_type=code&redirect_uri=http://localhost:3000/doggo-bot/dashboard/${guild.id}/home`
                    }
                    className="block"
                  >
                    {guild.icon ? (
                      <Image
                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                        alt={initials}
                        className="w-16 h-16 rounded-full mx-auto"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-gray-600 text-white font-bold text-lg">
                        {initials}
                      </div>
                    )} 
                    <p className="mt-2">{guild.name}</p>
                  </Link>
                </div>
              );
            })
          ) : (
            <p className="flex flex-col text-center">Join 1 or more Discord servers to get started.</p>
          )}
        </div>
      </section>
    </article>
  );
}
