import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ["localhost"],
//   },
// };

// export default nextConfig;



// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com", // ✅ Replace with your actual domain
      },
    ],
  },
};

