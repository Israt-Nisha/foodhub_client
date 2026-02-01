import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";


const DASHBOARD_MAP = {
  ADMIN: "/dashboard/admin",
  CUSTOMER: "/dashboard/customer",
  PROVIDER: "/dashboard/provider",
} as const;

type Role = keyof typeof DASHBOARD_MAP;

export async function proxy(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;

  
   const { data: session } = await userService.getSession();

    if (!session?.user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = session.user.role as Role;
    const dashboardPath = DASHBOARD_MAP[role];

    if (pathname === "/dashboard" || pathname === "/dashboard/") {
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }

    if (!pathname.startsWith(dashboardPath)) {
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("Proxy auth error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};