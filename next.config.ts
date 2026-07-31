import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: false,
  compress: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hoydoonstorage.blob.core.windows.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'hoydoon.com',
          },
        ],
        destination: 'https://www.hoydoon.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    // Blocks BSC malware payload: eth_call → eval(atob(...))
    // Does NOT allow 'unsafe-eval' or *.publicnode.com
    const csp = [
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
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;