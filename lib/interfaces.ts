/***
 * Discord Message Embed.
 */
export interface Embed {
  /**
   * Embed Title.
   */
  title?: string;
  /**
   * Embed Url.
   */
  url?: string;
  /**
   * Embed Description.
   */
  description?: string;
  /**
   * Embed Timestamp in epoch time.
   */
  timeStamp?: number;
  /**
   * Embed Color.
   */
  color?: string;
  /**
   * Embed Image Url.
   */
  imageUrl?: string;
  /**
   * Embed Thumbnail Url.
   */
  thumbnailUrl?: string;
  /**
   * Embed Footer Object.
   */
  footer?: EmbedFooter;
  /**
   * Embed Author Object.
   */
  author?: EmbedAuthor;
  /**
   * Embed Fields Array.
   */
  fields?: EmbedField[];
}

export interface EmbedFooter {
  /**
   * Embed Footer Text.
   */
  text: string;
  /**
   * Embed Footer Icon URL.
   */
  iconUrl?: string;
}

export interface EmbedAuthor {
  /**
   * Embed Author Name.
   */
  name: string;
  /**
   * Embed Author Url.
   */
  url?: string;
  /**
   * Embed Author Icon Url.
   */
  iconUrl?: string;
}

export interface EmbedField {
  /**
   * Embed Field Name.
   */
  name: string;
  /**
   * Embed Field Value.
   */
  value: string;
  /**
   * Embed Field Inline Flag.
   */
  inline: boolean;
}