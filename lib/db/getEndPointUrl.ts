export default function getEndPointUrl(tableName: string, guildId?: string) {
  const isServer = typeof window === "undefined";
  const baseUrl = isServer 
    ? process.env.NEXTAUTH_URL?.replace(/\$/, "")
    : "";

  return guildId 
      ? `${baseUrl}/api/db/${tableName}/${guildId}`
      : `${baseUrl}/api/db/${tableName}`;
}