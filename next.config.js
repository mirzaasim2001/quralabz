/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // ── Redirect non-www → www for canonical URL consistency ──
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "quralabz.com" }],
        destination: "https://www.quralabz.com/:path*",
        permanent: true, // 301 redirect — tells Google www is canonical
      },
    ];
  },
};

module.exports = nextConfig;
