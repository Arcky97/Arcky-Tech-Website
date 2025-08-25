"use client"
import fetchTableData from "@/lib/db/fetchTableData";
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

export default function Embeds() {

  const { guildId } = useParams<{ guildId: string }>();
  const { data: genEmbeds, isLoading: genEmbedsLoading } = useQuery({
    queryKey: ["generatedEmbeds", guildId],
    queryFn: () => fetchTableData("GeneratedEmbeds", guildId),
    staleTime: 1000 * 60 * 5,
    enabled: !!guildId,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  const { data: eventEmbeds, isLoading: eventEmbedsLoading } = useQuery({
    queryKey: ["eventEmbeds", guildId],
    queryFn: () => fetchTableData("EventEmbeds", guildId),
    staleTime: 1000 * 60 * 50,
    enabled: !!guildId,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  return (
    <div>
      <p>does this even ever update now after a min of time? but did it update?</p>
    </div>
  )
}