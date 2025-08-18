import { authOptions } from "@/lib/dashboard/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard (
  {
    params
  }: {
    params: Promise<{ guildId: string }>;
  }
) {
  const session = await getServerSession(authOptions);
  const { guildId } = await params;

  if (!session) redirect("/doggo-bot");

  redirect(`/doggo-bot/dashboard/${guildId}/home`);
}