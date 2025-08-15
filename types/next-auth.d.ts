import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      guilds?: {
        id: string;
        name: string;
        icon: string | null;
        owner: boolean;
        permissions: string;
        features: string[];
      }[]
    };
  }

  interface User {
    id: string;
    guilds?: {
      id: string;
      name: string;
      icon: string | null;
      owner: boolean;
      permissions: string;
      features: string[];
    }[];
  }
}