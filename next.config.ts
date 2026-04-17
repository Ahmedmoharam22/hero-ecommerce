import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/**', // ده بيسمح بكل الصور اللي جاية من المسار ده
      },
    ],
  },
};  


export default nextConfig;
