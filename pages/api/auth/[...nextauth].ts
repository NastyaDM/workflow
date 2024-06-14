import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import { User as PrismaUser } from "@prisma/client";
import { db } from "@/prisma/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCookie, setCookie } from "cookies-next";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & Omit<PrismaUser, "password">;
  }
  interface User extends Omit<PrismaUser, "password"> {}
}

export const authOptions = (req: NextApiRequest, res: NextApiResponse) => {
  const adapter = PrismaAdapter(db);

  return [
    req,
    res,
    {
      adapter: adapter,
      providers: [
        CredentialsProvider({
          credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Пароль", type: "password" },
          },
          authorize: async (credentials) => {
            if (!credentials?.email || !credentials.password)
              throw new Error("Неверный логин или пароль!");

            const user = await db.user.findUnique({
              where: {
                email: credentials.email,
              },
            });

            if (!user) throw new Error("Неверный логин или пароль!");

            const isPasswordsMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (!isPasswordsMatch)
              throw new Error("Неверный логин или пароль!");

            return user;
          },
        }),
      ],
      callbacks: {
        session({ user, session }) {
          return { ...session, user: user };
        },
        async redirect({ url }) {
          return url;
        },
        async signIn({ user }) {
          if (user) {
            const sessionToken = crypto.randomUUID();
            const sessionExpiry = new Date(
              Date.now() + 60 * 60 * 24 * 30 * 1000
            );

            if (adapter.createSession) {
              await adapter.createSession({
                sessionToken,
                userId: user.id,
                expires: sessionExpiry,
              });
            }

            setCookie("next-auth.session-token", sessionToken, {
              req,
              res,
              expires: sessionExpiry,
            });
          }
          return true;
        },
      },
      secret: process.env.NEXTAUTH_SECRET,
      jwt: {
        maxAge: 60 * 60 * 24 * 30,
        async encode() {
          const cookie = getCookie("next-auth.session-token", { req, res });

          if (cookie) return cookie;
          return "";
        },
        async decode() {
          return null;
        },
      },
      debug: process.env.NODE_ENV === "development",
      events: {
        async signOut({ session }) {
          const { sessionToken = "" } = session as unknown as {
            sessionToken?: string;
          };

          if (sessionToken && adapter.deleteSession) {
            await adapter.deleteSession(sessionToken);
          }
        },
      },
    } as NextAuthOptions,
  ] as const;
};

const handler: NextApiHandler = (req, res) =>
  NextAuth(...authOptions(req, res));

export default handler;
