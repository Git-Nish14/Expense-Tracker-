import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;
  const protectedRoutes = [
    "/home",
    "/manageTransaction",
    "/contact",
    "/user-stats",
    "/saving",
  ];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (
    token &&
    (pathname.startsWith("/login") || pathname.startsWith("/auth"))
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/home/:path*",
    "/manageTransaction/:path*",
    "/contact/:path*",
    "/user-stats/:path*",
    "/saving/:path*",
    "/login/:path*",
    "/auth/:path*",
  ],
};
