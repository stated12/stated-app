/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "ui-avatars.com",
      "lxxcereaiqakpdwukaaz.supabase.co",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "lxxcereaiqakpdwukaaz.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
