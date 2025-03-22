import { getSession } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname === "/" ||
    pathname.startsWith("/auth") ||
    pathname === "/initialization"
  ) {
    return NextResponse.next();
  }

  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const userRole = session.user.type;

  if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(
      new URL(
        `/unauthorized?redirect=${encodeURIComponent(pathname)}`,
        req.url,
      ),
    );
  }

  if (pathname.startsWith("/teacher") && userRole !== "TEACHER") {
    return NextResponse.redirect(
      new URL(
        `/unauthorized?redirect=${encodeURIComponent(pathname)}`,
        req.url,
      ),
    );
  }

  if (pathname.startsWith("/student") && userRole !== "STUDENT") {
    return NextResponse.redirect(
      new URL(
        `/unauthorized?redirect=${encodeURIComponent(pathname)}`,
        req.url,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/teacher/:path*", "/student/:path*"],
};
