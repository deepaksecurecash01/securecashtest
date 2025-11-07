/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
      },
      {
        protocol: "https",
        hostname: "vumbnail.com", // optional Vimeo thumbnail mirror
      },
    ],
  },
};

export default nextConfig;
