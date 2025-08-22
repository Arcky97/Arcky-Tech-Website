export interface LevelSystem {
  guildId: string;
  memberId: string;
  level: number;
  xp: bigint;
  oldXp: bigint;
  color: string;
  deletionDate: Date;
}