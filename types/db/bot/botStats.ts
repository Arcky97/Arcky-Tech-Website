export interface BotStats {
  guildId: string;
  totalCount: {
    current: number;
    total: number;
  }
  eventCount: {
    current: string[];
    total: string[];
  }
  commandCount: {
    current: string[];
    total: string[];
  }
  levelSystemCount: {
    current: {
      xp: number;
      levels: number;
    };
    total: {
      xp: number;
      levels: number;
    }
  }
}