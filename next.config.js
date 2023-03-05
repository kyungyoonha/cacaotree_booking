/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,

  images: {
    domains: ["user-images.githubusercontent.com"],
  },
};

module.exports = nextConfig;
