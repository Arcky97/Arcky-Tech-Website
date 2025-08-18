import { GuildForGrid } from "@/types/dashboard/guildForGrid";
import { getInitialsFromName } from "@/utils/getInitialsFromName";
import Image from "next/image";
import Link from "next/link";

type GuildCategory = "botWithPerms" | "botWithoutPerms";

export default function GuildCard({guild, category}: {guild: GuildForGrid, category: GuildCategory }){
  return (
    <div 
      key={guild.id}
      className={`p-4 rounded-lg text-center w-[250px] lg:w-[225px] h-[150px] ${
        category === "botWithPerms" ? "bg-gray-800" : "bg-gray-700 grayscale"
      } transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-blue-500/50 hover:ring-2 hover:ring-blue-500 m-2`}
    >
      <Link
        href={
          category === "botWithPerms"
            ? `/doggo-bot/dashboard/${guild.id}/home`
            : guild.inviteUrl || "#"
        }
        className="block"
      >
        {guild.avatar ? (
          <Image
            src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.avatar}.png`}
            alt={getInitialsFromName(guild.name)}
            className="rounded-full mx-auto"
            width={64}
            height={64}
          />
        ) : (
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-gray-600 text-white font-bold text-lg">
            {getInitialsFromName(guild.name)}
          </div>
        )}
        <p className="mt-2">{guild.name}</p>
      </Link>
    </div>
  )
}