export default function getEndPointUrl(tableName: string, guildId?: string) {
  console.log("Receiving Endpoint url request in getEndPointUrl.ts");
  const isServer = typeof window === "undefined";
  const baseUrl = isServer 
    ? process.env.NEXTAUTH_URL?.replace(/\$/, "")
    : "";

  return guildId 
      ? `${baseUrl}/api/db/${tableName}/${guildId}`
      : `${baseUrl}/api/db/${tableName}`;
}