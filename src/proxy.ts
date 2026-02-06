// src/proxy.ts
import { userService } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";
import { Roles } from "@/constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const { data } = await userService.getSession();
  const user = data?.user;

  
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  if (pathname === "/dashboard") {
    switch (user.role) {
      case Roles.admin:
        return NextResponse.redirect(new URL("/dashboard-admin", request.url));
      case Roles.provider:
        return NextResponse.redirect(new URL("/dashboard-provider", request.url));
      case Roles.customer:
        return NextResponse.redirect(new URL("/dashboard-customer", request.url));
      default:
        return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (user.role === Roles.admin) {
    if (pathname.startsWith("/dashboard-provider") || pathname.startsWith("/dashboard-customer")) {
      return NextResponse.redirect(new URL("/dashboard-admin", request.url));
    }
  }

  if (user.role === Roles.provider) {
    if (pathname.startsWith("/dashboard-admin") || pathname.startsWith("/dashboard-customer")) {
      return NextResponse.redirect(new URL("/dashboard-provider", request.url));
    }
  }

  if (user.role === Roles.customer) {
    if (pathname.startsWith("/dashboard-admin") || pathname.startsWith("/dashboard-provider")) {
      return NextResponse.redirect(new URL("/dashboard-customer", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/dashboard-admin",
    "/dashboard-admin/:path*",
    "/dashboard-provider",
    "/dashboard-provider/:path*",
    "/dashboard-customer",
    "/dashboard-customer/:path*",
  ],
};
