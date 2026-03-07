// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("sb-access-token"); // Supabase sets this cookie

  // List of paths that require authentication
  const protectedPaths = [
    "/dashboard",
    "/shop",
    "/products",
    "/cart",
    "/orderhistory",
    "/checkout",
    "/placeorderdetails"
  ];

  // Check if the current path starts with any of the protected path prefixes
  const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));

  // If path is protected and no token is present, redirect to login
  if (isProtectedPath && !token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}


export const config = {
  // Match all protected routes and their sub-paths
  matcher: [
    "/dashboard/:path*",
    "/shop/:path*",
    "/products/:path*",
    "/cart/:path*",
    "/orderhistory/:path*",
    "/checkout/:path*",
    "/placeorderdetails/:path*"
  ],
};

