import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "wedding-web-app-session-token",
  });

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/conversations/:path*",
    "/overview/:path*",
    "/my-profile/:path*",
    "/blocked-users/:path*",
    "/liked-profiles/:path*",
    "/user-management/:path*",
    "/admin-management/:path*",
    "/report-management/:path*",
    "/pricing-management/:path*",
    "/recommended-matches/:path*",
    "/subscription-payment/:path*",
  ],
};
