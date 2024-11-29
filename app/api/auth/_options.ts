import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/src/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultJWT, JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
	interface User extends DefaultUser {
		role?: string;
	}

	interface JWT extends DefaultJWT {
		role?: string;
	}

	interface Session extends DefaultSession {
		role?: string;
	}
}
export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			async profile(profile, account) {
				return {
					id: profile!.sub as string,
					name: profile.name,
					email: profile.email,
					role: profile.role ?? "user",
				};
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/signin",
	},
	jwt: {
		secret: process.env.NEXTAUTH_SECRET,
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role;
			}
			return token; // Return the updated token
		},
		async session({ session, token }) {
			session.role = token.role as unknown as string | undefined;
			return session;
		},
	},
};
