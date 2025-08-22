export interface UserStats {
  guildId: string;
  memberId: string;
  attempts: {
    slap: string[];
    kick: string[];
    ban: string[];
    mute: string[];
    warn: string[];
    timeout: string[];
  }
}