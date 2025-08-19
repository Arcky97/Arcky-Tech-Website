import GuildGrid from "@/components/dashboard/GuildGrid";
import { authOptions } from "@/lib/dashboard/auth";
import { getBotGuildIds } from "@/lib/db/getBotGuildIds";
import { checkUserGuildPerms } from "@/lib/discord/permissions";
import { GuildForGrid, GuildsForGrid } from "@/types/dashboard/guildForGrid";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const INVITE_BASE = "https://discord.com/oauth2/authorize";
const CLIENT_ID = "1270100901067100230";
const REDIRECT_URI = encodeURIComponent("http://localhost:3000/api/auth/server") //encodeURIComponent("https://www.arcky-tech.be/api/auth/server");
const PERMISSIONS = "10191898143990";

export default async function Servers() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/doggo-bot");

  const userGuilds = session.user.guilds;
  const botGuilds = await getBotGuildIds();

  const guildsForGrid: GuildsForGrid = {
    botWithPerms: [],
    botWithoutPerms: [],
    noBotWithPerms: []
  };

  (userGuilds || []).forEach(guild => {
    const botInGuild = botGuilds.has(guild.id);
    const hasPerms = checkUserGuildPerms(guild);

    const entry: GuildForGrid = {
      id: guild.id,
      name: guild.name,
      avatar: guild.icon,
      inviteUrl: !botInGuild
        ? `${INVITE_BASE}?client_id=${CLIENT_ID}&scope=bot+applications.commands&permissions=${PERMISSIONS}&guild_id=${guild.id}&redirect_uri=${REDIRECT_URI}&response_type=code`
        : undefined
    }

    if (botInGuild && hasPerms) guildsForGrid.botWithPerms.push(entry);
    else if (botInGuild) guildsForGrid.botWithoutPerms.push(entry);
    else if (!botInGuild && hasPerms) guildsForGrid.noBotWithPerms.push(entry);
  });

  return (
    <article className="flex flex-col min-h-[calc(100vh-189px)] mt-8 text-center w-7/8 items-center mx-auto">
      <h1 className="head1">Welcome, {session?.user.name}!</h1>
      <p className="text-lg">Thank you for testing the Discord Authentication implementation on the website.</p>
      <p className="text-lg">Below you should see a list of your servers where the bot is in categorised by those you can manage and those which you cannot.</p>
      <GuildGrid guilds={guildsForGrid}/>
    </article>
  )
}