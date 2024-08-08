import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

// Extend the session type
declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      email: string;
      name: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name: string;
  }
}

// Extend the JWT type
declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    id?: string;
    email?: string;
    name?: string;
  }
}
