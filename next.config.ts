/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lxxcereaiqakpdwukaaz.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
