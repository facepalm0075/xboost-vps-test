import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./chain";
import { getToken } from "next-auth/jwt";

export const withAuth: MiddlewareFactory = (next) => {
	return async (request: NextRequest, _next: NextFetchEvent) => {
		const pathname = request.nextUrl.pathname;
		// protecting profile pages
		if (["/profile"]?.some((path) => pathname.startsWith(path))) {
			const token = await getToken({ req: request });

			if (!token) {
				const signinUrl = new URL("/signin", request.url);
				signinUrl.searchParams.set("callbackUrl", pathname);
				return NextResponse.redirect(signinUrl);
			}
			// redirecting to home page if user logged in (login page)
		} else if (["/signin"]?.some((path) => pathname.startsWith(path))) {
			const token = await getToken({ req: request });

			if (token) {
				const signinUrl = new URL("/", request.url);

				return NextResponse.redirect(signinUrl);
			}
		}
		return next(request, _next);
	};
};
