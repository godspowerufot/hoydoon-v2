import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Security headers to mitigate the BSC eth_call → eval(atob) malware
 * that was injected into production HTML (contract 0xDF132E… on BSC testnet).
 * Blocks unsafe-eval and known malicious RPC hosts via CSP allowlists.
 */
const securityHeaders: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(self)",
  // No 'unsafe-eval' — stops eval(atob(...)) payload execution
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://maps.gstatic.com https://apis.google.com https://accounts.google.com https://www.google.com https://www.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://hoydoonstorage.blob.core.windows.net https://lh3.googleusercontent.com https://maps.googleapis.com https://maps.gstatic.com https://www.google-analytics.com https://www.googletagmanager.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://www.hoydoon.com https://hoydoon.com https://hoydoon-backend-web.azurewebsites.net https://hoydoonstorage.blob.core.windows.net https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://maps.googleapis.com https://places.googleapis.com https://accounts.google.com https://oauth2.googleapis.com https://www.googleapis.com",
    "frame-src 'self' https://www.google.com https://www.googletagmanager.com https://accounts.google.com https://maps.google.com",
    "worker-src 'self' blob:",
    "form-action 'self' https://accounts.google.com",
    "upgrade-insecure-requests",
  ].join("; "),
};

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Apply to all paths except Next.js internals and static assets
     * that don't need CSP on every request.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
