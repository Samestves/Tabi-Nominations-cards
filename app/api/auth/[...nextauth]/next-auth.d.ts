import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      avatar?: string;
    } & DefaultSession["user"]; // name, email, image ya existen
  }

  interface User extends DefaultUser {
    id?: string;
    avatar?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string;
    avatar?: string;
  }
}
