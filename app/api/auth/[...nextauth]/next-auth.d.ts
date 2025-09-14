// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      avatar: string;
    } & DefaultSession["user"]; // name, email, image ya existen
  }

  interface User {
    id: string;
    username: string;
    avatar: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    name: string;
    avatar: string;
  }
}
