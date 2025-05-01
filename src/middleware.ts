import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/profile"];
const sellerRoutes = ["/products/create"];
const authRoutes = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken");
  const refreshToken = request.cookies.get("refreshToken");
  const path = request.nextUrl.pathname;

  // Redirect authenticated users away from auth routes
  if ((authToken || refreshToken) && authRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check authentication for protected routes
  if (
    !authToken &&
    !refreshToken &&
    [...protectedRoutes, ...sellerRoutes].some((route) =>
      path.startsWith(route)
    )
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/products/create/:path*", "/login", "/signup"],
};
