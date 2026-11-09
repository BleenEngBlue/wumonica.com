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
  // Serif metrics — Arial (the localFont default) misses the hero heading and
  // produces desktop CLS when swap replaces the fallback. next/font emits one
  // normal-style override face; italic uses "Cormorant Fallback" in globals.css.
  adjustFontFallback: "Times New Roman",
  fallback: ["Cormorant Fallback", "Georgia", "Times New Roman", "serif"],
});

/**
 * DM Sans — body/UI sans and the LCP face (hero tagline). Weight axis only;
 * the site never sets opsz, and body italic is not used.
 */
export const dmSans = localFont({
  src: [{ path: "./fonts/dm-sans-latin-wght-normal.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-dm-sans",
  display: "swap",
  // Metric-matched Arial. The localFont default is already Arial; name it so
  // the override face stays in front of the system stack.
  adjustFontFallback: "Arial",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

/**
 * DM Mono — labels and chips in the header and hero. Preloaded so the
 * fallback→face swap does not shift desktop chrome (PSI CLS). The two Latin
 * WOFF2s are ~15 KB each, so they no longer dominate Slow 4G the way the
 * old TTFs did. 400 = dark default; 500 = font-medium and the light-theme bump.
 */
export const dmMono = localFont({
  src: [
    { path: "./fonts/dm-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-dm-mono",
  display: "swap",
  // next/font can metric-match Arial or Times New Roman only. Arial adjusted
  // to DM Mono's average width is the fallback used while the WOFF2 loads.
  // 400 and 500 share the same advance metrics, so one override face covers both.
  adjustFontFallback: "Arial",
  fallback: ["ui-monospace", "Menlo", "Consolas", "monospace"],
});
