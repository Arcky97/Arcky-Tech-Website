import { GuildsForGrid } from "@/types/dashboard/guildForGrid";
import GuildCard from "./GuildCard";

interface GuildGridProps {
  guilds: GuildsForGrid;
}

export default function GuildGrid({ guilds }: GuildGridProps) {
  
  return (
    <div className="w-7/8">
      <hr className="horRule mx-auto"/>
      <section className="mx-auto mb-4">
        <h2 className="text-3xl font-bold my-4">Your Managable Servers</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {guilds.botWithPerms.map(g => (
            <GuildCard key={g.id} guild={g} category="botWithPerms"/>
          ))}
        </div>
      </section>
      <hr className="horRule mx-auto"/>
      <section className="mx-auto mb-4">
        <h2 className="text-3xl font-bold my-4">Servers to invite Doggo Bot</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {guilds.noBotWithPerms.map(g => (
            <GuildCard key={g.id} guild={g} category="botWithoutPerms"/>
          ))}
        </div>
      </section>
    </div>
  )
}