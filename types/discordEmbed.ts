export interface DiscordEmbed {
  message: string | null;
  color: string | null;
  author: EmbedAuthor;
  title: string | null;
  url: string | null;
  description: string | null;
  fields: EmbedField[];
  imageUrl: string | null;
  thumbnailUrl: string | null;
  footer: EmbedFooter;
  timeStamp: boolean;
}

export interface EmbedAuthor {
  name: string | null;
  url: string | null;
  iconUrl: string | null;
}

export interface EmbedField {
  name: string;
  value: string;
  inline: boolean;
}

export interface EmbedFooter {
  text: string | null;
  iconUrl: string | null;
}