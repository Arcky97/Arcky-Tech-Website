export interface ReactionRoles {
  guildId: string;
  channelId: string;
  messageId: string;
  emojiRolePairs: EmojiRolePair[];
  maxRoles: number;
  maxReactions: number;
  type: ReactionType;
  deletionDate: Date;
}

export interface EmojiRolePair {
  emojiId: string;
  roleId: string;
}

export type ReactionType = 'normal';