/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  async headers() {
    return [
      {
        source: "/(.*)\\.(svg|ico)$", // Apply to .svg and .ico files
        headers: [
          {
            key: "Cache-Control",
            // 1 week in seconds = 7 * 24 * 60 * 60 = 604800
            value: "public, max-age=604800",
          },
        ],
      },
      {
        source: "/(.*)", // Apply to all other routes
        headers: [
          {
            key: "Cache-Control",
            // 1 hour in seconds = 60 * 60 = 3600
            value: "public, max-age=3600, stale-while-revalidate=3600",
          },
        ],
      },
    ];
  },
};

export default config;
