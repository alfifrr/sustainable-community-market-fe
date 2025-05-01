import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // for npm run build
  images: {
    // accepts any image from outside source
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  async rewrites() {
    // main api endpoint (relative sub urls in lib/endpoints)
    return [
      {
        source: "/api/:path*",
        destination:
          "https://sustainable-community-market.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
