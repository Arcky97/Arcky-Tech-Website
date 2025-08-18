import createMDX from '@next/mdx'
import type { NextConfig } from "next";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
  }
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com"
      }
    ]
  }
};

export default withMDX(nextConfig);