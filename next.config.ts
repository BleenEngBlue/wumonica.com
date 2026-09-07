import type { NextConfig } from "next";

/**
 * wumonica.com — Next.js config
 *
 * Static export: `next build` writes a fully static site to ./out, which is
 * uploaded to Hostinger's public_html. Security headers cannot be set by
 * Next.js in a static export, so they live in public/.htaccess (copied into
 * ./out by the build) and are finalized by scripts/csp-hashes.mjs.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,          // /about/ style URLs map cleanly to Apache/LiteSpeed folders
  poweredByHeader: false,       // no X-Powered-By fingerprint (belt-and-braces; static hosts don't send it anyway)
  reactStrictMode: true,
  images: { unoptimized: true }, // no image optimizer in static export (site ships no raster images)
  productionBrowserSourceMaps: false,
};

export default nextConfig;
