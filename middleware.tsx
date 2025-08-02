export { default } from "next-auth/middleware";

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
