import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      guilds?: Array<{
        id: string;
        name: string;
        icon: string;
        permissions: number;
      }>;
    } & DefaultSession['user'];
  }

  interface JWT {
    accessToken?: string;
  }
}