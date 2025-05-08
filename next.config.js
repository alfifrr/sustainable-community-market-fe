/** @type {import('next').NextConfig} */
const nextConfig = {
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
        // "http://localhost:5000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
