const isServer = typeof window === "undefined";
const baseUrl = isServer 
  ? process.env.NEXTAUTH_URL?.replace(/\$/, "")
  : "";

export const deleteGeneratedEmbed = async (tableName: string, guildId: string, embedId: number) => {
  try {
    if (!tableName) throw new Error('No Tablename provided.');

    const endPoint = `${baseUrl}/api/db/${tableName}/${guildId}`;

    const res = await fetch(endPoint, {
      method: "DELETE",
      body: JSON.stringify({ id: embedId}),
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) throw new Error('Failed to remove embed from GeneratedEmbed Table.');

  } catch (error) {
    console.error('Failed to remove Table Data for GeneratedEmbed:', error);
  }
}