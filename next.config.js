/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all hostnames
      },
      {
        protocol: "http",
        hostname: "**", // if you also want http
      },
    ],
  },
};

module.exports = nextConfig;
