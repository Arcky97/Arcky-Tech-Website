import nextMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = nextMDX({
  options: {
    remarkPlugins: [],
  }
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  ignoreDuringBuilds: true
};

export default withMDX(nextConfig);