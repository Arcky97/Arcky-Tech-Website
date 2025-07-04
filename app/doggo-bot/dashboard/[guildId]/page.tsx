import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

export default async function DashboardRedirect(
  {
    params
  }: {
    params: Promise<{ guildId: string }>;
  }
) {
  const session = await getServerSession(authOptions);
  const { guildId } = await params;

  if (!session) {
    redirect("/doggo-bot");
  }

  redirect(`/doggo-bot/dashboard/${guildId}/home`);
}
