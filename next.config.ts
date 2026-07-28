import type { NextConfig } from "next";

const commitSha =
  process.env.VERCEL_GIT_COMMIT_SHA ??
  (() => {
    try {
      return require("node:child_process")
        .execSync("git rev-parse HEAD", { encoding: "utf8" })
        .trim();
    } catch {
      return "";
    }
  })();

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_COMMIT_SHA: commitSha },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
