/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    apiUrl: "https://restcountries.come/v3.1",
  },
  images: {
    images: {
      unoptimized: true,
    },
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/w320/**",
      },
    ],
  },
};

module.exports = nextConfig;
