"use client"
import EmbedBuilder from "@/components/dashboard/EmbedBuilder";
import EventEmbedCard from "@/components/dashboard/EventEmbedCard";
import fetchTableData from "@/lib/db/dataFetchers/fetchTableData";
import { EventEmbedRaw } from "@/lib/db/dataNormalizers/normalizeEventEmbedData";
import { updateEventEmbedTableData } from "@/lib/db/dataUpdaters/updateTableData";
import fetchDiscordChannels from "@/lib/discord/fetchDiscordChannels";
import { EventEmbed } from "@/types/db";
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useState } from "react";

export default function Embeds() {

  const { guildId } = useParams<{ guildId: string }>();
  const queryClient = useQueryClient();

  const { data: eventEmbeds } = useQuery({
    queryKey: ["eventEmbeds", guildId],
    queryFn: () => fetchTableData("EventEmbeds", guildId),
    staleTime: 1000 * 60 * 5,
    enabled: !!guildId,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  const { data: guildChannels } = useQuery({
    queryKey: ["guildChannels", guildId],
    queryFn: () => fetchDiscordChannels(guildId),
    staleTime: 1000 * 60 * 5,
    enabled: !!guildId,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
  
  const [editingEmbed, setEditingEmbed] = useState<EventEmbed | null>(null);

  const handleEmbedUpdate = async (updatedEmbed: EventEmbed, changedFields: Partial<EventEmbed>) => {
    const dbFields: Partial<EventEmbedRaw> = { ...changedFields } as Partial<EventEmbedRaw>;

    (["author", "fields", "footer"] as const).forEach((key) => {
      if (dbFields[key] !== undefined) {
        dbFields[key] = JSON.stringify(dbFields[key]) as unknown as EventEmbedRaw[typeof key];
      }
    })
    await updateEventEmbedTableData("EventEmbeds", guildId, dbFields);
    queryClient.setQueryData(["eventEmbeds", guildId], (oldData: EventEmbed[]) => {
      if (!oldData) return [updatedEmbed];
      return oldData.map((e) =>
        e.type === updatedEmbed.type && e.guildId === updatedEmbed.guildId
          ? { ...e, ...changedFields}
          : e
      );
    });
  };

  const handleEventEmbedChannelChange = async (updatedEmbed: EventEmbed, channel: string | null) => {
    await updateEventEmbedTableData("EventEmbeds", guildId, {channelId: channel});
    queryClient.setQueryData(["eventEmbeds", guildId], (oldData: EventEmbed[]) => {
      if (!oldData) return [updatedEmbed];
      console.log(oldData);
      return oldData.map((e) => 
        e.type === updatedEmbed.type && e.guildId === updatedEmbed.guildId
          ? { ...e, channelId: channel }
          : e
      );
    });
  };

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold mb-2">Event and Generated Embeds</h1>
      <div>
        <EventEmbedCard 
          type="welcome" 
          data={eventEmbeds.find((embed: EventEmbed) => embed.type === "welcome")} 
          channels={guildChannels || []} 
          onEdit={setEditingEmbed}
          onChange={handleEventEmbedChannelChange}
        />
        <EventEmbedCard 
          type="leave" 
          data={eventEmbeds.find((embed: EventEmbed) => embed.type === "leave")}
          channels={guildChannels || []} 
          onEdit={setEditingEmbed}
          onChange={handleEventEmbedChannelChange}
        />
        <EventEmbedCard 
          type="ban" 
          data={eventEmbeds.find((embed: EventEmbed) => embed.type === "ban")}
          channels={guildChannels || []} 
          onEdit={setEditingEmbed}
          onChange={handleEventEmbedChannelChange}
        />
      </div>

      {/* show Embed Builder */}
      {editingEmbed && (
        <EmbedBuilder embed={editingEmbed} onClose={() => setEditingEmbed(null)} onSave={handleEmbedUpdate}/>
      )}
    </div>
  )
}