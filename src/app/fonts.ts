import localFont from "next/font/local";

/**
 * Self-hosted fonts via next/font/local — Next inlines the @font-face rules,
 * hashes the files, and preloads them. No request ever leaves the origin.
 *
 * Latin WOFF2 subsets from Fontsource. Skip latin-ext / unused axes / unused
 * italics — next/font cannot attach unicode-range per file, so extra faces
 * would be preloaded and never painted.
 */
export const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin-wght-normal.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-wght-italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/**
 * DM Sans — body/UI sans and the LCP face (hero tagline). Weight axis only;
 * the site never sets opsz, and body italic is not used.
 */
export const dmSans = localFont({
  src: [{ path: "./fonts/dm-sans-latin-wght-normal.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-dm-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

/**
 * DM Mono — labels and chips. Not preloaded so Slow 4G spends first bytes on
 * DM Sans (LCP) and Cormorant (display). 400 = dark default; 500 = font-medium
 * and the light-theme .font-mono bump.
 */
export const dmMono = localFont({
  src: [
    { path: "./fonts/dm-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-dm-mono",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "Menlo", "Consolas", "monospace"],
});
