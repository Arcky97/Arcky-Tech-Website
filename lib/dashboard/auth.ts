import { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { TypeORMAdapter } from "@auth/typeorm-adapter"; 
import { getDiscordAccessToken } from "./discord";

export const authOptions: NextAuthOptions = {
  adapter: TypeORMAdapter({
    type: "mariadb",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.AUTH_DB_NAME,
    synchronize: false
  }),

  session: {
    strategy: "database",
    maxAge: 60 * 60,
    updateAge: 15 * 60
  },

  cookies: {
    sessionToken: {
      name: "__Host-next-auth.session-token",
      options: { httpOnly: true, sameSite: "lax", secure: true, path: "/" }
    }
  },

  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { 
        params: { 
          scope: "identify guilds",
          response_type: "code",
          prompt: "consent"
        } 
      },
      checks: ["state", "pkce"]
    })
  ],

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        
        const token = await getDiscordAccessToken(user.id);

        if (token) {
          console.log("Attempting discord login.");
          const res = await fetch("https://discord.com/api/users/@me/guilds", {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            console.log("Discord login successfull!");
            session.user.guilds = await res.json();
          }
        }
      }
      console.log("Redirecting from discord login!");
      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET
}