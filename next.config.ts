import createNextIntlPlugin from "next-intl/plugin";
import BundleAnalyzer from "@next/bundle-analyzer";
// @ts-ignore - next-pwa doesn't have proper TypeScript declarations for Next.js 15
import withPWA from "next-pwa";
import type { NextConfig } from "next";

// Initialize plugins
const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Experimental features for React 19 compatibility
  experimental: {
    // Disable React compiler to prevent conflicts
    reactCompiler: false,

    // Optimize package imports for smaller bundles
    optimizePackageImports: [
      "@radix-ui/react-icons",
      "lucide-react",
      "@radix-ui/react-accordion",
      "framer-motion",
    ],

    // Server Actions configuration
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["localhost:3000", "dreamtoapp.vercel.app"],
    },
  },

  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "d2yq1wt6p3tg8m.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },

  // Permanent redirect: root to default Arabic locale
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ar',
        permanent: true, // 308/301 for SEO signal consolidation
      },
    ];
  },


};

// PWA configuration - standard approach with aligned cache times
const pwaConfig = withPWA({
  dest: "public",
  register: true, // Enable automatic service worker registration
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: [
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp|avif)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-images",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 3600, // 1 hour - aligned with Next.js cache
        },
      },
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font\.css)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-fonts",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year for fonts (rarely change)
        },
      },
    },
    {
      urlPattern: /\/api\/.*$/i,
      handler: "NetworkFirst",
      method: "GET",
      options: {
        cacheName: "api-cache",
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 3600, // 1 hour - aligned with Next.js API cache
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
});

export default withBundleAnalyzer(withNextIntl(pwaConfig(nextConfig) as NextConfig));