import { authDb } from "./db";
import { DiscordTokenResponse } from "@/types/authToken";
import mapRawToAuthAccount from "../db/authAccountMapper";
import { AuthAccount, RawAuthAccountRow } from "@/types/db";

export async function getDiscordAccessToken(userId: string) {
  const [rows] = await authDb.query<RawAuthAccountRow[]>(
    "SELECT * FROM accounts WHERE userId = ? AND provider = 'discord' LIMIT 1", 
    [userId]
  );
  const accountRow = rows[0];
  if (!accountRow) return null;

  const account = mapRawToAuthAccount(accountRow);
  const now = Math.floor(Date.now() / 1000);
  const earlySkew = 60;

  if (account.expires_at && account.expires_at - earlySkew > now) {
    return account.access_token;
  }

  if (account.refresh_token) {
    return await refreshToken(account);
  };

  return null;
}

async function refreshToken(account: AuthAccount) {
  if (!account.refresh_token) return null;
  const body = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID!,
    client_secret: process.env.DISCORD_CLIENT_SECRET!,
    grant_type: "refresh_token",
    refresh_token: account.refresh_token,
    scope: "identify guilds"
  });

  const res = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store"
  });

  if (!res.ok) {
    console.error("Failed to refresh Discord token", await res.text());
    return null;
  }

  const data: DiscordTokenResponse = await res.json();
  const expiresAt = Math.floor(Date.now() / 1000) + (data.expires_in ?? 3600);

  await authDb.query(
    "UPDATE accounts SET access_token = ?, refresh_token = ?, expires_at = ?, token_type = ?, scope = ? WHERE id = ?",
    [
      data.access_token,
      data.refresh_token ?? account.refresh_token,
      expiresAt,
      data.token_type,
      data.scope,
      account.id,
    ]
  );

  return data.access_token;
}