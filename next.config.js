/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: ["*.s3.*.amazonaws.com"].map((hostname) => ({
      protocol: "https",
      hostname,
      port: "",
    })),
  },
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  reactStrictMode: true,
  swcMinify: true,
  cacheHandler: require.resolve("./cache-handler.js"),
  cacheMaxMemorySize: 0,
};

module.exports = nextConfig;
