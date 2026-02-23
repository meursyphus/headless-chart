import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/getting-started",
        destination: "/docs",
        permanent: true,
      },
      {
        source: "/charts/:slug",
        destination: "/docs/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
