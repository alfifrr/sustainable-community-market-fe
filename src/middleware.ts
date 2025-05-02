import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/profile", "/cart"];
const sellerRoutes = ["/products/create"];
const buyerRoutes = ["/cart", "/checkout"];
const authRoutes = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken");
  const refreshToken = request.cookies.get("refreshToken");
  const userRole = request.cookies.get("userRole");
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

  // Check seller role for seller-specific routes
  if (
    sellerRoutes.some((route) => path.startsWith(route)) &&
    userRole?.value !== "seller"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Prevent sellers from accessing buyer-specific routes
  if (
    buyerRoutes.some((route) => path.startsWith(route)) &&
    userRole?.value === "seller"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
