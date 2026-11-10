import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // packages/core est publié en TypeScript source : Next le transpile.
  transpilePackages: ["@mon-petit-garage/core"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
