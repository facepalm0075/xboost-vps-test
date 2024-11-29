import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./chain";
import { getToken } from "next-auth/jwt";

export const withAuth: MiddlewareFactory = (next) => {
	return async (request: NextRequest, _next: NextFetchEvent) => {
		const pathname = request.nextUrl.pathname;
		const token = await getToken({ req: request });
		const baseUrl = new URL("/", request.url);
		const signinUrl = new URL("/signin", request.url);

		if (["/profile"]?.some((path) => pathname.startsWith(path))) {
			if (!token) {
				signinUrl.searchParams.set("callbackUrl", pathname);
				return NextResponse.redirect(signinUrl);
			}
			if (token.role !== "user") {
				//return NextResponse.redirect(baseUrl);
			}
		} else if (["/panel"]?.some((path) => pathname.startsWith(path))) {
			if (!token) {
				signinUrl.searchParams.set("callbackUrl", pathname);
				return NextResponse.redirect(signinUrl);
			}
			if (token.role !== "admin") {
				//return NextResponse.redirect(baseUrl);
			}
		} else if (["/booster"]?.some((path) => pathname.startsWith(path))) {
			if (!token) {
				signinUrl.searchParams.set("callbackUrl", pathname);
				return NextResponse.redirect(signinUrl);
			}
			if (token.role !== "booster") {
				//return NextResponse.redirect(baseUrl);
			}
		} else if (["/signin"]?.some((path) => pathname.startsWith(path))) {
			if (token) {
				return NextResponse.redirect(baseUrl);
			}
		} else if (["/form/booster"]?.some((path) => pathname.startsWith(path))) {
			if (token && token.role !== "user") {
				//return NextResponse.redirect(baseUrl);
			}
		}

		return next(request, _next);
	};
};
