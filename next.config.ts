import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ── افزایش محدودیت حجم برای آپلود رزومه (حداکثر ۱۰MB) ── */
  experimental: {
    serverActions: {
      bodySizeLimit: "11mb",
    },
  },
};

export default nextConfig;
