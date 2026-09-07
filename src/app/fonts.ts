import localFont from "next/font/local";

/**
 * Self-hosted fonts via next/font/local — Next inlines the @font-face rules,
 * hashes the files, and preloads them. No request ever leaves the origin.
 * Variable fonts: one file covers weights 300–700.
 */
export const cormorant = localFont({
  src: [
    { path: "./fonts/CormorantGaramond-VariableFont_wght.ttf", weight: "300 700", style: "normal" },
    { path: "./fonts/CormorantGaramond-Italic-VariableFont_wght.ttf", weight: "300 700", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/**
 * DM Sans — body/UI sans. Replaces the system-ui stack so body text renders
 * identically on every OS (Segoe UI on Windows is markedly wider). Variable
 * font: one file covers 400–700; same family as DM Mono.
 * Files: download "DM Sans" from fonts.google.com → drop the two variable
 * TTFs into src/app/fonts/ with the names below.
 */
export const dmSans = localFont({
  src: [
    { path: "./fonts/DMSans-VariableFont_opsz,wght.ttf", weight: "400 700", style: "normal" },
    { path: "./fonts/DMSans-Italic-VariableFont_opsz,wght.ttf", weight: "400 700", style: "italic" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const dmMono = localFont({
  src: [
    { path: "./fonts/DMMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/DMMono-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-dm-mono",
  display: "swap",
  fallback: ["ui-monospace", "Menlo", "Consolas", "monospace"],
});
