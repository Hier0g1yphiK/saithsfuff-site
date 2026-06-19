/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        unoptimized: true,
        protocol: "https",
        hostname: "*.cdninstagram.com",
      },
    ],
  },
};

module.exports = nextConfig;
