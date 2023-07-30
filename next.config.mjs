import withBundleAnalyzer from "@next/bundle-analyzer";
import withPlugins from "next-compose-plugins";
import { env } from "./env.mjs";

/**
 * @type {import('next').NextConfig}
 */
const config = withPlugins([[withBundleAnalyzer({ enabled: env.ANALYZE })]], {
  reactStrictMode: true,
  rewrites() {
    return [{ source: "/health", destination: "/api/health" }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
});

export default config;
