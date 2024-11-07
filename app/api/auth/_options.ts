import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/src/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultJWT, JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
	interface User extends DefaultUser {
		accessToken?: string; // Add accessToken to User type
		role?: string;
	}

	interface JWT extends DefaultJWT {
		accessToken?: string; // Add accessToken to JWT type
		role?: string;
	}

	interface Session extends DefaultSession {
		accessToken?: string; // Add accessToken to Session type
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
				console.log(profile);
				console.log(account);
				return {
					id: profile!.sub as string,
					name: profile.name,
					email: profile.email,
					accessToken: account.access_token, // Access token is now here
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
		async jwt({ token, user, account }) {
			if (user) {
				token.role = user.role;
			}
			// Check if user is present (on the first login)
			if (account) {
				// If user is undefined, check if account is defined
				token.accessToken = account.access_token; // Store access token if available
			}
			return token; // Return the updated token
		},
		async session({ session, token }) {
			// Include accessToken in the session
			session.accessToken = token.accessToken as unknown as string | undefined;
			session.role = token.role as unknown as string | undefined;
			return session;
		},
	},
};
