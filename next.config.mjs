/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // pathname: "**",
        protocol: "https",
        hostname: "images.unsplash.com",
      },
       {
        // pathname: "**",
       
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
