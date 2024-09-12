import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { withAuth } from "@/middlewares/withAuth";
import { stackMiddlewares } from "@/middlewares/chain";

const middlewares = [withAuth];
export default stackMiddlewares(middlewares);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
