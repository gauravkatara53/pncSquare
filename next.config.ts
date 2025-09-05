import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://pnc-backend.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
//http://localhost:1083/api/v1 ,, https://pnc-backend.onrender.com
