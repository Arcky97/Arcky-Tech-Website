import createMDX from '@next/mdx'
import type { NextConfig } from "next";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
  }
});

const nextConfig: NextConfig = {
  reactStrictMode: true,

  generateBuildId: async () => {
    return process.env.GIT_COMMIT_SHA || Date.now().toString();
  },
  
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com"
      }
    ]
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        aggregateTimeout: 60000,
        poll: 10000,
      };
    }
    return config;
  }
};

export default withMDX(nextConfig);