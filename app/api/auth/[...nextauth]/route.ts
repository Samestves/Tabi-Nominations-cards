import NextAuth, { DefaultSession } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

// 🔹 Extender la sesión sin romper el tipo original
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      avatar?: string;
      // ⚠️ No agregamos username, usamos `name` en su lugar
    } & DefaultSession["user"];
  }
}

// 🔹 Extender el JWT para almacenar info extra
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string; // aquí guardamos el username de Twitter
    avatar?: string;
  }
}

// Tipo personalizado para el profile de Twitter v2
interface TwitterProfile {
  id: string;
  name: string; // nombre completo
  username: string; // username real de X/Twitter
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
        token.name = twitterProfile.username; // guardamos el username aquí
        token.avatar = twitterProfile.profile_image_url;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string; // accedemos al username
        session.user.avatar = token.avatar as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
