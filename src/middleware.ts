import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole, Permission } from "./lib/types";

// Define protected routes with required roles and permissions
const protectedRoutes = {
  "/profile": {
    roles: [UserRole.BUYER, UserRole.SELLER, UserRole.ADMIN],
    permissions: [Permission.VIEW_PROFILE]
  },
  "/products/create": {
    roles: [UserRole.SELLER, UserRole.ADMIN],
    permissions: [Permission.CREATE_PRODUCT]
  },
  "/products/manage": {
    roles: [UserRole.SELLER, UserRole.ADMIN],
    permissions: [Permission.MANAGE_INVENTORY]
  },
  "/admin": {
    roles: [UserRole.ADMIN],
    permissions: [Permission.MANAGE_USERS]
  },
  "/orders": {
    roles: [UserRole.BUYER, UserRole.SELLER, UserRole.ADMIN],
    permissions: [Permission.VIEW_ORDER]
  },
  "/admin/users": {
    roles: [UserRole.ADMIN],
    permissions: [Permission.MANAGE_USERS]
  },
  "/admin/roles": {
    roles: [UserRole.ADMIN],
    permissions: [Permission.MANAGE_ROLES]
  },
  "/seller/dashboard": {
    roles: [UserRole.SELLER],
    permissions: [Permission.SELLER_ANALYTICS]
  }
};

const authRoutes = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken");
  const refreshToken = request.cookies.get("refreshToken");
  const path = request.nextUrl.pathname;
  const userRole = request.cookies.get("userRole")?.value as UserRole;
  const userPermissions = request.cookies.get("userPermissions")?.value?.split(",") as Permission[];

  // Redirect authenticated users away from auth routes
  if ((authToken || refreshToken) && authRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check role-based and permission-based access for protected routes
  for (const [route, requirements] of Object.entries(protectedRoutes)) {
    if (path.startsWith(route)) {
      // If not authenticated, redirect to login
      if (!authToken && !refreshToken) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Check role-based access
      if (userRole && !requirements.roles.includes(userRole as UserRole)) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // Check permission-based access
      if (userPermissions && requirements.permissions) {
        const hasRequiredPermission = requirements.permissions.some(
          permission => userPermissions.includes(permission)
        );
        if (!hasRequiredPermission) {
          return NextResponse.redirect(new URL("/", request.url));
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/products/create/:path*",
    "/products/manage/:path*",
    "/admin/:path*",
    "/orders/:path*",
    "/seller/:path*",
    "/login",
    "/signup"
  ],
}; 