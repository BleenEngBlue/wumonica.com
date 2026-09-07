# wumonica.com — Next.js + React + Tailwind CSS

Monica Wu's portfolio, rewritten 27 Aug 2026 as a **Next.js (App Router, TypeScript) + React 19 + Tailwind CSS v4** static site, deployed to **Hostinger** shared hosting.

| | |
|---|---|
| Framework | Next.js 16 (App Router), `output: "export"` |
| UI | React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first config in `src/app/globals.css`) |
| Fonts | Cormorant Garamond + DM Mono, self-hosted via `next/font/local` — zero third-party requests |
| Accessibility | WCAG 2.2 AA: skip link, focus rings, 44 px targets, reduced-motion, contrast-checked tokens, live regions |
| Security | CSP with per-build script hashes, HSTS, COOP/CORP, nosniff, frame-ancestors none — see `public/.htaccess` |

## Project layout

```
src/app/            layout.tsx (metadata, theme bootstrap, JSON-LD) · page.tsx · globals.css · fonts.ts · sitemap.ts · not-found.tsx
src/components/     Header (theme toggle, mobile nav, scroll-spy) · Hero · About · Projects · Stack · Experience · Education · Contact · Footer · FadeIn · CopyEmail · JsonLd · ui.tsx
src/data/site.ts    ALL copy — edit here to update the site (synced to LinkedIn 27 Aug 2026)
src/lib/theme.ts    pre-paint theme script (static constant)
public/.htaccess    Hostinger security headers + caching (CSP completed post-build)
scripts/csp-hashes.mjs  computes inline-script hashes into the CSP after every build
```

## Local development

```bash
npm install          # Node 20.9+ (Node 22 LTS recommended)
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run audit        # npm audit (fails on moderate+)
```

## Build for Hostinger

```bash
npm run build        # = next build && node scripts/csp-hashes.mjs
```

This writes a fully static site to `./out/` (`index.html`, `404.html`, `_next/static/...`, `.htaccess`, `robots.txt`, `sitemap.xml`).

## Deploy to Hostinger (shared / cloud hosting)

1. In **hPanel → Websites → Manage → File Manager** (or via FTP/SFTP), open `public_html`.
2. Delete the old site files (`index.html`, `css/`, `js/`, `fonts/`).
3. Upload **the contents of `out/`** (not the folder itself) — including the hidden `.htaccess`. In File Manager enable "Show hidden files"; with FTP clients, make sure dotfiles are transferred.
4. hPanel → **Security → SSL**: confirm the free SSL is active (the `.htaccess` redirects HTTP → HTTPS and sends HSTS).
5. Open https://wumonica.com and check headers, e.g. https://securityheaders.com — expect an A/A+ with `Content-Security-Policy` present.

Re-deploy = `npm run build` → re-upload `out/`. Because Next hashes asset filenames, uploading over the old files is safe; the `.htaccess` sets long-lived immutable caching for `_next/static` and `no-cache` for HTML.

> Hostinger's Node.js hosting can also run `next start`, but this site has no server-side features, so the static export is simpler, faster, and has a smaller attack surface.

## Updating content

Everything is data in `src/data/site.ts` (hero, about, projects, stack, experience, education, contact, JSON-LD). Change the text there, bump `SITE.updated`, and rebuild. No HTML strings are rendered raw anywhere.

## Security notes (what the build enforces)

- **CSP**: `script-src 'self' 'sha256-…'` — only the exact inline scripts produced by this build are allowed; `style-src 'self'`; `object-src 'none'`; `frame-ancestors 'none'`; `base-uri 'self'`; `form-action 'self'`. `scripts/csp-hashes.mjs` aborts the build if it finds inline event handlers or `javascript:` URLs.
- **No `dangerouslySetInnerHTML` with dynamic data**: the two uses are a compile-time theme constant and JSON-LD serialized with `<`, `>`, `&`, U+2028/9 escaped.
- **External links** only through `<ExtLink>`, which always sets `rel="noopener noreferrer"`.
- **localStorage** input is allow-listed (`light` or default `dark`) before being written to the DOM.
- **Supply chain**: `.npmrc` sets `ignore-scripts=true` and `audit=true`; `NEXT_TELEMETRY_DISABLED=1`; `poweredByHeader: false`; no source maps in production.
- `.htaccess` denies dotfiles and `.map/.md/.json/.env/.log` files, disables directory listing, and forces HTTPS + canonical host.
