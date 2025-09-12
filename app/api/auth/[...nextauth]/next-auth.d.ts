import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      username?: string;
      avatar?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id?: string;
    username?: string;
    avatar?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    name?: string;
    avatar?: string;
  }
}
