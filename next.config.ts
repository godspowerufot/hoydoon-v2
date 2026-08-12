import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { contentSecurityPolicy } from "./lib/csp";

const nextConfig = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
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
        {
          protocol: "https",
          hostname: "images.unsplash.com",
          port: "",
          pathname: "/**",
        },
      ],
    },
    async rewrites() {
      return [
        {
          source: "/hoydoon-api/:path*",
          destination:
            "https://hoydoon-backend-web.azurewebsites.net/api/:path*",
        },
      ];
    },
    async redirects() {
      return [
        {
          source: "/:path*",
          has: [
            {
              type: "host",
              value: "hoydoon.com",
            },
          ],
          destination: "https://www.hoydoon.com/:path*",
          permanent: true,
        },
      ];
    },
    async headers() {
      const headers: { key: string; value: string }[] = [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
      ];

      if (!isDev) {
        headers.push({
          key: "Content-Security-Policy",
          value: contentSecurityPolicy(false),
        });
      }

      return [
        {
          source: "/((?!_next/static|_next/image).*)",
          headers,
        },
      ];
    },
  };
};

export default nextConfig;
