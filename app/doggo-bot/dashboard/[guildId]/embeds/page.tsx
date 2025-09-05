"use client"
import EmbedBuilder from "@/components/dashboard/EmbedBuilder";
import EventEmbedCard from "@/components/dashboard/EventEmbedCard";
import GeneratedEmbedCard from "@/components/dashboard/GeneratedEmbedCard";
import fetchTableData from "@/lib/db/dataFetchers/fetchTableData";
import { insertGeneratedEmbed } from "@/lib/db/dataInserters/InsertTableData";
import { EventEmbedRaw, GeneratedEmbedRaw } from "@/lib/db/dataNormalizers/normalizeEventEmbedData";
import { deleteGeneratedEmbed } from "@/lib/db/dataRemovers/removeTableData";
import { updateEventEmbedTableData, updateGeneratedEmbedTableData } from "@/lib/db/dataUpdaters/updateTableData";
import fetchDiscordChannels from "@/lib/discord/fetchDiscordChannels";
import { EventEmbed, GeneratedEmbed } from "@/types/db";
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useState } from "react";

export default function Embeds() {

  const { guildId } = useParams<{ guildId: string }>();
  const queryClient = useQueryClient();

  const { data: guildChannels } = useQuery({
    queryKey: ["guildChannels", guildId],
    queryFn: () => fetchDiscordChannels(guildId),
    staleTime: 1000 * 60 * 5,
    enabled: !!guildId,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  const { data: eventEmbeds } = useQuery({
    queryKey: ["eventEmbeds", guildId],
    queryFn: () => fetchTableData("EventEmbeds", guildId),
    staleTime: 1000 * 60 * 5,
    enabled: !!guildId,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  const { data: generatedEmbeds } = useQuery({
    queryKey: ["generatedEmbeds", guildId],
    queryFn: () => fetchTableData("GeneratedEmbeds", guildId),
    staleTime: 1000 * 60 * 5,
    enabled: !!guildId,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });
  
  const [editingEmbed, setEditingEmbed] = useState<EventEmbed | GeneratedEmbed | null>(null);

  const handleSetEditingEmbed = (embed: EventEmbed | GeneratedEmbed) => {
    
    setEditingEmbed(embed);
  }

  const handleEmbedUpdate = async (updatedEmbed: EventEmbed | GeneratedEmbed, changedFields: Partial<EventEmbed | GeneratedEmbed>) => {
    const dbFields: Partial<EventEmbedRaw | GeneratedEmbedRaw> = { ...changedFields } as Partial<EventEmbedRaw | GeneratedEmbedRaw>;

    (["author", "fields", "footer"] as const).forEach((key) => {
      if (dbFields[key] !== undefined) {
        if (typeof dbFields[key] !== "string") {
          dbFields[key] = JSON.stringify(dbFields[key]) as unknown as EventEmbedRaw[typeof key] | GeneratedEmbedRaw[typeof key];
        }
      }
    });

    if ("type" in updatedEmbed) {
      await updateEventEmbedTableData("EventEmbeds", guildId, updatedEmbed.type, dbFields);
      queryClient.setQueryData(["eventEmbeds", guildId], (oldData: EventEmbed[]) => {
        if (!oldData) return [updatedEmbed];
        return oldData.map((e) =>
          e.type === updatedEmbed.type && e.guildId === updatedEmbed.guildId
            ? { ...e, ...changedFields}
            : e
        );
      });
    } else if ("id" in updatedEmbed) {
      await updateGeneratedEmbedTableData("GeneratedEmbeds", guildId, updatedEmbed.id, dbFields);
      queryClient.setQueryData(["generatedEmbeds", guildId], (oldData: GeneratedEmbed[]) => {
        if (!oldData) return [updatedEmbed];
        const newData = oldData.map((e) => 
          e.id === updatedEmbed.id && e.guildId === updatedEmbed.guildId
            ? { ...e, ...changedFields } 
            : e
        );
        return newData;
      });
    }
  };

  const handleGeneratedEmbedAdd = async (newEmbed: GeneratedEmbed): Promise<GeneratedEmbed> => {
    const embedId = await insertGeneratedEmbed("GeneratedEmbeds", guildId, newEmbed);

    queryClient.setQueryData(["generatedEmbeds", guildId], (oldData: GeneratedEmbed[] = []) => {
      return [...oldData, {...newEmbed, id: embedId}];
    });

    return {...newEmbed, id: embedId};
  };

  const handleGeneratedEmbedRemove = async (embed: GeneratedEmbed): Promise<void> => {
    if (!embed.id) return;
    await deleteGeneratedEmbed("GeneratedEmbeds", guildId, embed.id);

    queryClient.setQueryData(["generatedEmbeds", guildId], (oldData: GeneratedEmbed[] = []) => {
      return oldData.filter((e) => e.id !== embed.id );
    });
  };

  console.log(generatedEmbeds);

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold mb-2">Event and Generated Embeds</h1>
      <div className="xl:flex space-x-4">
        <div className="xl:w-1/2 w-full">
          <EventEmbedCard 
            type="welcome" 
            data={eventEmbeds.find((embed: EventEmbed) => embed.type === "welcome")} 
            channels={guildChannels || []} 
            onEdit={setEditingEmbed}
            onChange={handleEmbedUpdate}
          />
          <EventEmbedCard 
            type="leave" 
            data={eventEmbeds.find((embed: EventEmbed) => embed.type === "leave")}
            channels={guildChannels || []} 
            onEdit={handleSetEditingEmbed}
            onChange={handleEmbedUpdate}
          />
          <EventEmbedCard 
            type="ban" 
            data={eventEmbeds.find((embed: EventEmbed) => embed.type === "ban")}
            channels={guildChannels || []} 
            onEdit={setEditingEmbed}
            onChange={handleEmbedUpdate}
          />
        </div>
        <div className="xl:w-1/2 w-full">
          <GeneratedEmbedCard
            data={generatedEmbeds}
            channels={guildChannels || []}
            onEdit={handleSetEditingEmbed}
            onAdd={handleGeneratedEmbedAdd}
            onRemove={handleGeneratedEmbedRemove}
            onChange={handleEmbedUpdate}
          />
        </div>
      </div>

      {/* show Embed Builder */}
      {editingEmbed && (
        <EmbedBuilder embed={editingEmbed} onClose={() => setEditingEmbed(null)} onSave={handleEmbedUpdate}/>
      )}
    </div>
  )
}