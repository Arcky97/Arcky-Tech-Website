import { z } from "zod/v4";
import { guildSettingsSchema } from "./GuildSettings.zod";

export const schemaByTable: Record<string, z.ZodTypeAny> = {
  GuildSettings: guildSettingsSchema
}