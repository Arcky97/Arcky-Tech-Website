export interface DiscordEmbed {
  message: string | null;
  color: string | null;
  author: EmbedAuthor;
  title: string;
  url: string | null;
  description: string;
  fields: EmbedField[];
  imageUrl: string | null;
  thumbnailUrl: string;
  footer: EmbedFooter;
  timeStamp: Date;
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