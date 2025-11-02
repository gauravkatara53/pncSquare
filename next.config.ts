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
        destination: "http://13.203.80.218/api/:path*",
      },
    ];
  },
};

export default nextConfig;
//http://localhost:5002/api/v1 ,, https://pnc-backend.onrender.com
