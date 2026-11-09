import type { NextConfig } from "next";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, sep } from "node:path";

/**
 * wumonica.com — Next.js config
 *
 * Static export: `next build` writes a fully static site to ./out.
 * Security headers cannot be set by Next.js in a static export, so they live in
 *   - public/.htaccess  (Hostinger / Apache) and
 *   - vercel.json       (Vercel),
 * and the Content-Security-Policy in both is completed by scripts/csp-hashes.mjs.
 */

/**
 * Deterministic build ID.
 * Next embeds the build ID in an inline hydration script. The CSP allow-lists
 * inline scripts by SHA-256, and Vercel reads vercel.json *before* the build, so
 * the committed CSP must match the output exactly. A random ID would change the
 * hash on every build; hashing the inputs instead means identical source ⇒
 * identical ID ⇒ identical CSP. Changing any input still yields a new ID.
 *
 * Must produce the same ID on a Windows laptop (CRLF checkout, "\" paths) and
 * on Linux CI/Vercel, so paths are hashed as POSIX and text files with LF only.
 */
const TEXT_EXT = new Set([".ts", ".tsx", ".mjs", ".js", ".css", ".html", ".json", ".txt", ".xml", ".svg", ".htaccess", ".md"]);
function contentBuildId(): string {
  const h = createHash("sha256");
  const read = (p: string): Buffer => {
    const buf = readFileSync(p);
    return TEXT_EXT.has(extname(p) || p.slice(p.lastIndexOf("."))) ? Buffer.from(buf.toString("utf8").replace(/\r\n/g, "\n")) : buf;
  };
  const walk = (dir: string) => {
    for (const name of readdirSync(dir).sort()) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else h.update(p.split(sep).join("/")).update(read(p));
    }
  };
  for (const d of ["src", "public"]) walk(d);
  for (const f of ["package-lock.json", "next.config.ts", "postcss.config.mjs", "tsconfig.json"]) h.update(read(f));
  return h.digest("base64url").slice(0, 21); // same length/charset as Next's default IDs
}

/**
 * `next dev` serves a file in `public/` only at its exact path. A request for
 * `/case-studies/digital-twin/` does not resolve to `index.html`, so the App
 * Router 404s. Apache does resolve it (`DirectoryIndex` in public/.htaccess),
 * which is why the same links work on wumonica.com. Map those directory URLs
 * to the file during dev only. A static export has no server to apply rewrites,
 * and Hostinger already serves the directory.
 */
function caseStudyDevRewrites() {
  const root = join(process.cwd(), "public", "case-studies");
  if (!existsSync(root)) return [];
  const beforeFiles = [];
  for (const name of readdirSync(root)) {
    const dir = join(root, name);
    if (!statSync(dir).isDirectory() || !existsSync(join(dir, "index.html"))) continue;
    beforeFiles.push(
      { source: `/case-studies/${name}`, destination: `/case-studies/${name}/index.html` },
      { source: `/case-studies/${name}/`, destination: `/case-studies/${name}/index.html` },
    );
  }
  return beforeFiles;
}

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,          // /about/ style URLs map cleanly to Apache/LiteSpeed folders
  poweredByHeader: false,       // no X-Powered-By fingerprint (belt-and-braces; static hosts don't send it anyway)
  reactStrictMode: true,
  images: { unoptimized: true }, // no image optimizer in static export (site ships no raster images)
  productionBrowserSourceMaps: false,
  generateBuildId: async () => contentBuildId(),
  async rewrites() {
    if (process.env.NODE_ENV === "production") return [];
    return { beforeFiles: caseStudyDevRewrites() };
  },
};

export default nextConfig;
