import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { contentSecurityPolicy } from "@/lib/csp";

/**
 * Security headers to mitigate the BSC eth_call → eval(atob) malware
 * that was injected into production HTML (contract 0xDF132E… on BSC testnet).
 * Production still blocks unsafe-eval. Development allows it because Next.js
 * bundles use eval() for source maps — without it layout.js fails to parse
 * and the client never hydrates or fetches listings.
 */
const securityHeaders: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(self)",
};

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();
  const isDev = process.env.NODE_ENV !== "production";

  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  // CSP blocks Next.js eval() source maps and can stop hydration + API
  // fetches in `next dev`. Keep it production-only.
  if (!isDev) {
    response.headers.set("Content-Security-Policy", contentSecurityPolicy(false));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Apply to all paths except Next.js internals and static assets
     * that don't need CSP on every request.
     */
    "/((?!_next/static|_next/image|hoydoon-api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
