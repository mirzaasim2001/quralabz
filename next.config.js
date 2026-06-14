/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Frame-Options",           value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options",    value: "nosniff" },
  { key: "X-DNS-Prefetch-Control",    value: "on" },
  { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
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
