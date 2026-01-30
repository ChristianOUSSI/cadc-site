/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: "export" to allow dynamic features
  // Add back only if you need pure static export
  images: {
    unoptimized: true, // Required for static export if used
  },
};

module.exports = nextConfig;
