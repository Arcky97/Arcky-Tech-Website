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

interface MessageConfig {
  all: boolean;
  edits: boolean;
  deletes: boolean;
  bulks: boolean;
}

interface MemberConfig {
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

interface ServerConfig {
  channels: CUDConfig;
  roles: CUDConfig;
  updates: { all: boolean; }
  emojis: CUDConfig;
  stickers: CUDConfig;
}

interface VoiceConfig {
  joins: boolean;
  moves: boolean;
  leaves: boolean;
  mutes: boolean;
  unmutes: boolean;
  deafens: boolean;
  undeafens: boolean;
}

interface JoinLeaveConfig {
  joins: boolean;
  leaves: boolean;
}

interface ModerationConfig {
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

interface ARConfig {
  adds: boolean;
  removes: boolean;
}

interface ARCConfig extends ARConfig {
  clears: boolean;
}

interface CUDConfig {
  creates: boolean;
  updates: boolean;
  deletes: boolean;
}