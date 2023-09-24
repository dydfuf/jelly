import withBundleAnalyzer from "@next/bundle-analyzer";
import withPlugins from "next-compose-plugins";
import withPWA from "next-pwa";
import { env } from "./env.mjs";

/**
 * @type {import('next').NextConfig}
 */
const config = withPlugins(
  [
    [withBundleAnalyzer({ enabled: env.ANALYZE })],
    [
      withPWA({
        dest: "public",
        customWorkerDir: "service-worker",
        register: true,
        skipWaiting: true,
      }),
    ],
  ],
  {
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
  }
);

export default config;
