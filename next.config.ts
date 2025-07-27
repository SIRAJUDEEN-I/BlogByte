import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        
      },
    ],
  },
  webpack: (config) => {
    config.watchOptions = {
      ignored: [
        '**/node_modules',
        '**/.git',
        '**/Application Data',
        '**/AppData'
      ]
    };
    return config;
  },
};

export default nextConfig;
