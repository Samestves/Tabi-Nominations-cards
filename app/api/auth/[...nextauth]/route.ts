// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession, JWT } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

// Extendemos la sesión y el token para incluir los campos extra
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      avatar: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    username: string;
    avatar: string;
  }
}

// Tipo personalizado para el profile que devuelve Twitter v2
interface TwitterProfile {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
}

const handler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
    }),
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        const twitterProfile = profile as TwitterProfile;
        token.id = twitterProfile.id;
        token.username = twitterProfile.username;
        token.name = twitterProfile.name;
        token.avatar = twitterProfile.profile_image_url;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.name = token.name as string;
        session.user.avatar = token.avatar as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // obligatorio en producción
});

export { handler as GET, handler as POST };
