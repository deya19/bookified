import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "covers.openlibrary.org" },
      {
        protocol: "https",
        hostname: "r1zobryzkscgfafd.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
