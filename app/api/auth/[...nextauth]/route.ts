import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify email guilds",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.accessTokenExpires = Date.now() + 60 * 60 * 1000;
      }

      if (Date.now() > (token.accessTokenExpires as number)) return {};

      return token;
    },
    async session({ session, token }) {
      if (!session.user) return session;

      session.user.id = token.sub ?? "";

      if (token.accessToken) {
        const res = await fetch("https://discord.com/api/users/@me/guilds", {
          headers: { Authorization: `Bearer ${token.accessToken}` },
        });

        if (res.ok) session.user.guilds = await res.json();
      }

      return session;
    },
  },
};

// ✅ Export as an async function
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
