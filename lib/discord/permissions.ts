import { SessionGuild } from "@/types/next-auth"

export const checkUserGuildPerms = (guild: SessionGuild): boolean => {
  return (BigInt(guild.permissions) & BigInt(0x20)) !== 0n || (BigInt(guild.permissions) & BigInt(0x8)) !== 0n;
}