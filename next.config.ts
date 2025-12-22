import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ enables standalone output for production deployment
  output: "standalone",
  reactStrictMode: false,
  // ✅ enables gzip compression when using `next start`
  compress: true,
  
  images: {
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    
    // Image sizes for different use cases
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Use WebP format for better compression (critical for iOS memory)
    formats: ["image/webp"],
    
    // Cache images for 60 seconds minimum
    minimumCacheTTL: 60,
    
    // Disable SVG support for security
    dangerouslyAllowSVG: false,
    
    // CRITICAL: Add quality settings to reduce memory usage
    loader: "default",
    
    // Remote patterns for external images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hoydoonstorage.blob.core.windows.net",
        port: "",
        pathname: "/**", // Allows all paths from this hostname
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**", // Google user profile images
      },
    ],
    
    // CRITICAL FOR IOS: Disable image optimization on client for better memory management
    unoptimized: false, // Keep this false to use Next.js optimization
  },
  
  // CRITICAL: Webpack optimizations to reduce bundle size and memory
  webpack: (config, { isServer }) => {
    // Optimize chunks to prevent memory issues
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Common chunk
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // CRITICAL: Headers for better caching and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
      // Cache images aggressively
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache static assets
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Enable experimental features for better performance
  experimental: {
    // Optimize CSS
    optimizeCss: true,
    
    // Optimize fonts
    optimizePackageImports: ['lucide-react', '@/components'],
  },
  
  // Production optimizations
  swcMinify: true,
  
  // Compiler options
  compiler: {
    // Remove console logs in production (optional but recommended)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
};

export default nextConfig;