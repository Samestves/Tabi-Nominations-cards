// /app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

// 1️⃣ Exporta la configuración de NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

// 2️⃣ Crea el handler usando la config
const handler = NextAuth(authOptions);

// 3️⃣ Exporta para App Router
export { handler as GET, handler as POST };
