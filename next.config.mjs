import { withContentlayer } from "next-contentlayer2"; // eslint-disable-line

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      import("./scripts/generate-sitemap.js");
      import("./scripts/generate-rss.js");
    }

    return config;
  },
};

export default withContentlayer(nextConfig);
