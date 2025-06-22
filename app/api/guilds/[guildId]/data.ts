import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { guildId } = req.query;

  if (!guildId || typeof guildId !== "string") {
    return res.status(400).json({ error: "Guild ID is required and must be a string" });
  }

  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

  if (!BOT_TOKEN) {
    return res.status(500).json({ error: "Bot token is missing from environment variables" });
  }

  try {
    // Fetch Roles
    const rolesRes = await fetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!rolesRes.ok) {
      const errorText = await rolesRes.text();
      return res.status(rolesRes.status).json({ error: `Failed to fetch roles: ${errorText}` });
    }

    const roles = await rolesRes.json();

    // Fetch Channels
    const channelsRes = await fetch(`https://discord.com/api/v10/guilds/${guildId}/channels`, {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!channelsRes.ok) {
      const errorText = await channelsRes.text();
      return res.status(channelsRes.status).json({ error: `Failed to fetch channels: ${errorText}` });
    }

    const channels = await channelsRes.json();

    res.status(200).json({ roles, channels });
  } catch (error) {
    console.error("Error fetching guild data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
