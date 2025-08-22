export interface ModerationLogs {
  id: number;
  guildId: string;
  userId: string;
  modId: string;
  timeoutId: string | null;
  action: string;
  reason: string;
  status: 'completed' | 'pending' | 'scheduled' | 'failed';
  formatDuration: string | null;
  logging: boolean;
  logChannel: string | null;
  date: Date;
  endTime: Date;
  deletionDate: Date;
}