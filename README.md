# wumonica.com

Portfolio site for Monica Wu — AI Frontend Engineer · Design Engineer. Designed and built end to end as one surface: typography, component system, accessibility, and performance are the same job here, not separate passes.

**Live:** https://wumonica.com

## What it is

A single-page, statically exported Next.js site with a hand-built design system: two themes (Obsidian dark, Vellum light), a display serif paired with a mono UI face and a compact body sans, and every color pair verified at WCAG 2.2 AA or better. All copy lives in one typed data file, so the components never carry strings and the site can be re-positioned by editing one file.

## Stack

- **Next.js 16** (App Router, `output: "export"`) · **React 19** · **TypeScript**
- **Tailwind CSS v4** with design tokens exposed through `@theme inline`, so a single class re-themes when `data-theme` flips
- **Self-hosted fonts** via `next/font/local` — Cormorant Garamond (display), DM Mono (UI), DM Sans (body); zero third-party requests
- Static hosting on Apache/LiteSpeed with a hardened `.htaccess`

## Decisions worth reading

**One source of truth for copy.** `src/data/site.ts` holds every string, list, and structured-data object on the page. Components receive plain data through props and render it through React — nothing is injected as raw HTML. Rewriting the site's positioning is a one-file change; the JSON-LD, meta tags, hero, and footer cannot drift from each other.

**Theme before paint.** A tiny constant script sets `data-theme` on `<html>` from `localStorage` or `prefers-color-scheme` before first paint, so there is no flash. The script is a static string; its SHA-256 goes into the Content-Security-Policy at build time.

**Strict CSP on a static host.** `scripts/csp-hashes.mjs` runs after `next build`, hashes every inline script Next.js emitted, and writes the completed `Content-Security-Policy` header into the exported `.htaccess`. `script-src` is `'self'` plus those hashes — no `unsafe-inline`, no external hosts. The build fails on unsafe patterns rather than shipping them.

**Accessibility as an acceptance criterion.** Skip link, `aria-current` on the scroll-spied nav, an accessible-name-stable theme toggle with `aria-pressed`, live-region feedback on copy-to-clipboard, `scroll-padding-top` so focused targets clear the sticky header (WCAG 2.4.11), and `prefers-reduced-motion` respected everywhere. Both themes were checked pair by pair; body and accent text sit at AAA.

**Progressive by default.** Fade-in-on-scroll only engages once the theme script has added `html.js`; with scripts blocked the page is fully readable. External links get `rel="noopener noreferrer"` in one place, so there is no other way to make one.

**Typography tuned per theme.** Light backgrounds thin glyphs under `antialiased` smoothing, so the light theme uses the platform default and steps the display cuts up one weight. The hero name is set at a weight chosen by looking at it on cream, not by default.

## Structure

```
src/
  app/          layout, page, globals.css (tokens + base), fonts, sitemap
  components/   Header, Hero, About, Projects, Stack, Experience, Education, Contact, Footer, ui primitives
  data/site.ts  all copy, projects, experience, education, JSON-LD
  lib/theme.ts  theme constants and the pre-paint init script
scripts/
  csp-hashes.mjs  post-build CSP completion
public/
  og.png        link-preview card, rendered with the site's own fonts
```

## Build

```bash
npm install
npm run build      # next build writes ./out, then csp-hashes.mjs completes .htaccess
```

Upload `./out` to the web root. The fonts in `src/app/fonts/` are under the SIL Open Font License.

## License

Code: MIT. Content and design: © Monica Wu. Please don't reuse the copy, name, or visual identity.
