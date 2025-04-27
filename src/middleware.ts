import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/profile", "/products/create"];
const authRoutes = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken");
  const path = request.nextUrl.pathname;

  // Redirect authenticated users away from auth routes
  if (token && authRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect routes that require authentication
  if (!token && protectedRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/products/create/:path*", "/login", "/signup"],
};
