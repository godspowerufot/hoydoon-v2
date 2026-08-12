export function contentSecurityPolicy(isDev = process.env.NODE_ENV !== "production") {
  const scriptSrc = [
    "script-src 'self' 'unsafe-inline'",
    // Next.js dev bundles use eval() for source maps. Production stays locked down.
    isDev ? "'unsafe-eval'" : "",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://maps.googleapis.com",
    "https://maps.gstatic.com",
    "https://apis.google.com",
    "https://accounts.google.com",
    "https://www.google.com",
    "https://www.gstatic.com",
  ]
    .filter(Boolean)
    .join(" ");

  const connectSrc = [
    "connect-src 'self'",
    isDev ? "ws: wss:" : "",
    "https://www.hoydoon.com",
    "https://hoydoon.com",
    "https://hoydoon-backend-web.azurewebsites.net",
    "https://hoydoonstorage.blob.core.windows.net",
    "https://www.google-analytics.com",
    "https://*.google-analytics.com",
    "https://*.analytics.google.com",
    "https://www.googletagmanager.com",
    "https://maps.googleapis.com",
    "https://places.googleapis.com",
    "https://accounts.google.com",
    "https://oauth2.googleapis.com",
    "https://www.googleapis.com",
  ]
    .filter(Boolean)
    .join(" ");

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://hoydoonstorage.blob.core.windows.net https://lh3.googleusercontent.com https://images.unsplash.com https://maps.googleapis.com https://maps.gstatic.com https://www.google-analytics.com https://www.googletagmanager.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    connectSrc,
    "frame-src 'self' https://www.google.com https://www.googletagmanager.com https://accounts.google.com https://maps.google.com",
    "worker-src 'self' blob:",
    "form-action 'self' https://accounts.google.com",
    "upgrade-insecure-requests",
  ].join("; ");
}
