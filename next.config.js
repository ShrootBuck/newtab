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
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'Cache-Control',
            // 24 hours in seconds = 24 * 60 * 60 = 86400
            value: 'public, max-age=86400, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default config;