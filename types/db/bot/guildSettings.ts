export interface GuildSettings {
  guildId: string;
  chattingChannel: string | null;
  messageLogging: string | null;
  messageConfig: MessageConfig;
  memberLogging: string | null;
  memberConfig: MemberConfig;
  serverLogging: string | null;
  serverConfig: ServerConfig;
  voiceLogging: string | null;
  voiceConfig: VoiceConfig;
  joinLeaveLogging: string | null;
  joinLeaveConfig: JoinLeaveConfig;
  moderationLogging: string | null;
  moderationConfig: ModerationConfig;
  reportLogging: string | null;
  ignoreLogging: { channelId: string }[];
  muteRole: string | null;
  joinRoles: { roleId: string }[];
  deletionDate: Date;
}

export interface MessageConfig {
  all: boolean;
  edits: boolean;
  deletes: boolean;
  bulks: boolean;
}

export interface MemberConfig {
  roles: ARConfig;
  names: {
    users: boolean;
    globals: boolean;
    nicks: boolean;
  };
  avatars: {
    globals: boolean;
    servers: boolean;
  };
  bans: ARConfig;
  timeouts: ARConfig;
}

export interface ServerConfig {
  channels: CUDConfig;
  roles: CUDConfig;
  updates: { all: boolean; }
  emojis: CUDConfig;
  stickers: CUDConfig;
}

export interface VoiceConfig {
  joins: boolean;
  moves: boolean;
  leaves: boolean;
  mutes: boolean;
  unmutes: boolean;
  deafens: boolean;
  undeafens: boolean;
}

export interface JoinLeaveConfig {
  joins: boolean;
  leaves: boolean;
}

export interface ModerationConfig {
  warns: ARCConfig;
  mutes: boolean;
  unmutes: boolean;
  timeouts: ARConfig;
  kicks: boolean;
  bans: {
    regulars: boolean;
    softs: boolean;
    temps: boolean;
  };
  unbans: boolean;
}

export interface ARConfig {
  adds: boolean;
  removes: boolean;
}

export interface ARCConfig extends ARConfig {
  clears: boolean;
}

export interface CUDConfig {
  creates: boolean;
  updates: boolean;
  deletes: boolean;
}