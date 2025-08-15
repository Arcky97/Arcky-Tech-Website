import { AuthAccount } from "@/types/db";
import { RawAuthAccountRow } from "@/types/db/auth/rawAccount";

export default function mapRawToAuthAccount(row: RawAuthAccountRow): AuthAccount {
  return {
    ...row,
    expires_at: row.expires_at ? Number(row.expires_at) : null
  };
}