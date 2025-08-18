import { AuthAccount, RawAuthAccountRow } from "@/types/db";

export default function mapRawToAuthAccount(row: RawAuthAccountRow): AuthAccount {
  return {
    ...row,
    expires_at: row.expires_at ? Number(row.expires_at) : null
  };
}