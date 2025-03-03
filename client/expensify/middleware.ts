import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  // Redirect unauthenticated users away from protected pages
  if (!token && pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Prevent already authenticated users from accessing auth pages
  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home/:path*", "/auth/:path*"],
};
