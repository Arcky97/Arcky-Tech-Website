export interface LevelSettings {
  guildId: string;
  globalMultiplier: number;
  levelRoles: LevelRoles[];
  roleReplace: boolean;
  announceChannel: string;
  announcePing: boolean;
  announceDefaultMessage: AnnounceEmbed;
  announceLevelMessages: LevelAnnounceEmbed[];
  roleMultipliers: RoleMultiplier[];
  channelMultipliers: ChannelMultiplier[];
  categoryMultipliers: CategoryMultiplier[];
  multiplierReplace: MultiplierReplace;
  blackListRoles:  BlackListRole[];
  blackListChannels: BlackListChannel[];
  blackListCategory: BlackListCategory[];
  xpCooldown: number;
  xpSettings: XPSettings;
  xpType: XPType;
  clearOnLeave: boolean;
  voiceEnable: boolean;
  voiceMultiplier: number;
  voiceCooldown: number;
  deletionDate: Date;
}

export interface LevelRoles {
  level: number;
  roleId: string;
}

export interface AnnounceEmbed {
  title: string;
  description: string;
  color: string;
  thumbnailUrl: string | null;
  imageUrl: string | null;
  footer: {
    text: string;
    iconUrl: string | null;
  };
  timeStamp: boolean;
}

export interface LevelAnnounceEmbed {
  lv: number;
  options: AnnounceEmbed;
}

export interface RoleMultiplier {
  roleId: string;
  value: number;
}

export interface ChannelMultiplier {
  channelId: string;
  value: number;
}

export interface CategoryMultiplier {
  categpryId: string;
  value: number;
}

export interface MultiplierReplace {
  category: boolean;
  channel: boolean;
}

export interface BlackListRole {
  roleId: string;
}

export interface BlackListChannel {
  channelId: string;
}

export interface BlackListCategory {
  categoryId: string;
}

export interface XPSettings {
  step: number;
  min: number;
  max: number;
  minLength: number;
  maxLength: number;
}

export type XPType = 'random' | 'length';