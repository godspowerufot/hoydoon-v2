import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // ✅ enables standalone output for production deployment
    output: "standalone",
    // ✅ enables gzip compression when using `next start`
    compress: true,
    images: {
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
    },
};

export default nextConfig;
