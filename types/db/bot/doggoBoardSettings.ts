export interface DoggoBoardSettings {
  guildId: string;
  pinChannel: string;
  emojiId: string[];
  requiredReactions: number;
  messageAgeHour: number;
  pinAgeDay: number;
  updateTimeMin: number;
  reactionSettings: 'and' | 'or' | 'sum';
  deletionDate: Date;
}