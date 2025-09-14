// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

// ----------------------------------------
// Tipo personalizado opcional para Twitter v2
// ----------------------------------------
interface TwitterProfile {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
}

// ----------------------------------------
// Configuración principal de NextAuth
// ----------------------------------------
const handler = NextAuth({
  // 🔹 Proveedores de autenticación
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0", // usamos Twitter API v2
    }),
  ],

  // 🔹 Callbacks para personalizar JWT y sesión
  callbacks: {
    // Este callback se ejecuta al crear/actualizar el JWT
    async jwt({ token, profile }) {
      if (profile) {
        const twitterProfile = profile as TwitterProfile;
        token.name = twitterProfile.name; // nombre visible
        token.avatar = twitterProfile.profile_image_url; // avatar
      }
      return token;
    },

    // Este callback se ejecuta cuando la sesión se devuelve al cliente
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string; // nombre del usuario
        session.user.image = token.avatar as string; // avatar del usuario
      }
      return session;
    },
  },

  // 🔹 Clave secreta para encriptar JWT
  secret: process.env.NEXTAUTH_SECRET,

  // 🔹 Opciones de página (opcional)
  pages: {
    signIn: "/", // si quieres redirigir a tu home para login
  },
});

// Exportamos el handler para GET y POST
export { handler as GET, handler as POST };
