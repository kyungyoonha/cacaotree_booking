const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  i18n,
  images: {
    domains: [
      "user-images.githubusercontent.com",
      "github.com",
      "cdn.imweb.me",
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
