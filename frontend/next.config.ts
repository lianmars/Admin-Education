import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Admin-Education",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
