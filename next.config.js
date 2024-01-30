/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "https://uikitperches.onrender.com",
      },
    ],
  },
};

module.exports = nextConfig;
