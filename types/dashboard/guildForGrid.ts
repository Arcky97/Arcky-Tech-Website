export type GuildsForGrid = {
  botWithPerms: GuildForGrid[];
  botWithoutPerms: GuildForGrid[];
  noBotWithPerms: GuildForGrid[];
};

export interface GuildForGrid {
  id: string;
  name: string;
  avatar: string | null;
  inviteUrl: string | undefined;
}