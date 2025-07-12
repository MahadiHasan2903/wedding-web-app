/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  cacheHandler: require.resolve("./cache-handler.js"),
  cacheMaxMemorySize: 0,
};

module.exports = nextConfig;
