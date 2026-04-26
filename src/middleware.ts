import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let response = NextResponse.next();

  // API Route Protection
  if (request.nextUrl.pathname.startsWith("/api/layout")) {
    const hasSessionCookie = request.cookies.getAll().some((cookie) => 
      cookie.name.includes("better-auth.session_token")
    );

    if (!hasSessionCookie) {
      response = NextResponse.json(
        { layout: [], silentFallback: true },
        { status: 200 }
      );
    }
  }

  // Inject Strict Security Headers globally
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  
  // Note: CSP is defined in next.config.ts, which is recommended by Next.js
  // for static assets optimization, but headers here reinforce runtime security.

  return response;
}

export const config = {
  matcher: [
    // Apply globally, excluding Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ],
};
