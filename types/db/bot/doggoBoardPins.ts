export interface DoggoBotPins {
  guildId: string;
  messageId: string;
  pinMessageId: string | null;
  reactionAmount: number;
  deletionDate: Date;
}