/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,

  images: {
    domains: ["user-images.githubusercontent.com"],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

module.exports = nextConfig;
