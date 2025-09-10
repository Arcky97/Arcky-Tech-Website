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
import formatLastSaved from "@/lib/formatLastSaved";
import { EventEmbed, GeneratedEmbed } from "@/types/db";
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react";

export default function Embeds() {

  const { guildId } = useParams<{ guildId: string }>();
  const queryClient = useQueryClient();

  const updateTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const updateBuffer = useRef<Map<string, Partial<EventEmbed | GeneratedEmbed>>>(new Map());
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [displayTime, setDisplayTime] = useState<string>(formatLastSaved(lastSaved)); 

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTime(formatLastSaved(lastSaved));
    }, 60_000);

    setDisplayTime(formatLastSaved(lastSaved));

    return () => clearInterval(interval);
  }, [lastSaved]);

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

  const handleEmbedUpdate = async (updatedEmbed: EventEmbed | GeneratedEmbed, changedFields: Partial<EventEmbed | GeneratedEmbed>, duration: number = 5000) => {
    if ("type" in updatedEmbed) {
      queryClient.setQueryData(["eventEmbeds", guildId], (oldData: EventEmbed[]) => {
        if (!oldData) return [updatedEmbed];
        return oldData.map((e) =>
          e.type === updatedEmbed.type && e.guildId === updatedEmbed.guildId
            ? { ...e, ...changedFields}
            : e
        );
      });
    } else if ("id" in updatedEmbed) {
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

    handleAutoSaveEmbed(updatedEmbed, changedFields, duration);
  };

  const handleAutoSaveEmbed = async (updatedEmbed: EventEmbed | GeneratedEmbed, changedFields: Partial<EventEmbed | GeneratedEmbed>, duration: number = 5000) => {
    const embedKey = "type" in updatedEmbed ? `event-${updatedEmbed.type}` : `generated-${updatedEmbed.id}`;

    const existingBuffer = updateBuffer.current.get(embedKey) || {};
    updateBuffer.current.set(embedKey, {
      ...existingBuffer,
      ...changedFields
    });

    if (updateTimers.current.has(embedKey)) {
      clearTimeout(updateTimers.current.get(embedKey));
    }

    const timeout = setTimeout(async () => {
      const finalChanges = updateBuffer.current.get(embedKey);
      if (!finalChanges) return;
      
      const dbFields: Partial<EventEmbedRaw | GeneratedEmbedRaw> = { ...changedFields } as Partial<EventEmbedRaw | GeneratedEmbedRaw>;

      (["author", "fields", "footer"] as const).forEach((key) => {
        if (dbFields[key] !== undefined) {
          if (typeof dbFields[key] !== "string") {
            dbFields[key] = JSON.stringify(dbFields[key]) as unknown as EventEmbedRaw[typeof key] | GeneratedEmbedRaw[typeof key];
          }
        }
      });

      try {
        if ("type" in updatedEmbed) {
          await updateEventEmbedTableData("EventEmbeds", guildId, updatedEmbed.type, dbFields);
        } else {
          await updateGeneratedEmbedTableData("GeneratedEmbeds", guildId, updatedEmbed.id, dbFields);
        }
        setLastSaved(new Date());
      } catch (error) {
        console.error("Failed to update embed:", error);
      } finally {
        updateBuffer.current.delete(embedKey);
        updateTimers.current.delete(embedKey);
      }
    }, duration);

    updateTimers.current.set(embedKey, timeout);
  } 

  const handleGeneratedEmbedAdd = async (newEmbed: GeneratedEmbed): Promise<GeneratedEmbed> => {
    const embedId = await insertGeneratedEmbed("GeneratedEmbeds", guildId, newEmbed);

    queryClient.setQueryData(["generatedEmbeds", guildId], (oldData: GeneratedEmbed[] = []) => {
      return [...oldData, {...newEmbed, id: embedId}];
    });

    setLastSaved(new Date())
    return {...newEmbed, id: embedId};
  };

  const handleGeneratedEmbedRemove = async (embed: GeneratedEmbed): Promise<void> => {
    if (!embed.id) return;
    await deleteGeneratedEmbed("GeneratedEmbeds", guildId, embed.id);

    queryClient.setQueryData(["generatedEmbeds", guildId], (oldData: GeneratedEmbed[] = []) => {
      return oldData.filter((e) => e.id !== embed.id );
    });
    setLastSaved(new Date())
  };

  return (
    <div className="px-4">
      <div className="sticky z-20 top-12 bg-gray-900 lg:flex pt-2">
        <h1 className="flex-1 text-3xl font-bold ml-3 mb-2">Event and Generated Embeds</h1>
        <p className="font-bold my-2 lg:mr-4 ml-3 lg:pb-4 pb-2">last saved {displayTime}</p>
      </div>
        <div className="xl:flex space-x-4">
          <div className="xl:w-[45%] max-w-full">
            <EventEmbedCard 
              type="welcome" 
              data={eventEmbeds?.find((embed: EventEmbed) => embed.type === "welcome") ?? []} 
              channels={guildChannels || []} 
              onEdit={handleSetEditingEmbed}
              onChange={handleEmbedUpdate}
            />
            <EventEmbedCard 
              type="leave" 
              data={eventEmbeds?.find((embed: EventEmbed) => embed.type === "leave") ?? []}
              channels={guildChannels || []} 
              onEdit={handleSetEditingEmbed}
              onChange={handleEmbedUpdate}
            />
            <EventEmbedCard 
              type="ban" 
              data={eventEmbeds?.find((embed: EventEmbed) => embed.type === "ban") ?? []}
              channels={guildChannels || []} 
              onEdit={handleSetEditingEmbed}
              onChange={handleEmbedUpdate}
            />
          </div>
          <div className="xl:w-[55%] max-w-full">
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