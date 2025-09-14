import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

// Perfil que devuelve Twitter V2
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
        const p = profile as TwitterProfile;
        token.id = p.id;
        token.username = p.username;
        token.name = p.name;
        token.avatar = p.profile_image_url;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id!;
        session.user.username = token.username!;
        session.user.name = token.name!;
        session.user.avatar = token.avatar!;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
