import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Mockup: lewati optimizer agar foto remote selalu termuat (dev & build).
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
