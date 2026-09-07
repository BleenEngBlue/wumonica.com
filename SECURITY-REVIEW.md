# Security review — wumonica.com Next.js rewrite

Reviewed 27 Aug 2026. Scope: every file in this repository plus the Hostinger deployment path. Method: manual code review of all source, grep for dangerous sinks, server-side render of every component, and browser enforcement test of the generated Content-Security-Policy (Chromium via Playwright).

## Verdict

**Safe to deploy.** No injection sinks reachable by untrusted input, no third-party code loaded at runtime, no secrets, no inline event handlers, no inline styles. Six issues were found during the review (three in the original hand-written site that carried over, three in the first draft of this rewrite). All six are fixed in this repository.

## Issues found and fixed

| # | Severity | Where | Issue | Fix |
|---|---|---|---|---|
| 1 | **High** (would have shipped an empty CSP) | `scripts/csp-hashes.mjs` | The `__CSP__` placeholder appeared twice in `.htaccess` (once in a comment); `String.replace` filled the comment and left the real header as the literal text `__CSP__`. Caught by the harness test. | Replace the exact quoted directive with `replaceAll`, then assert the placeholder is gone; the script now exits non-zero if the header was not written. |
| 2 | Medium | Original site (`index.html`) → `JsonLd.tsx` | JSON-LD was emitted without escaping. A future `</script>` in any data string (e.g. a project description) would close the block and execute markup. | `safeJsonLd()` escapes `<`, `>`, `&`, U+2028, U+2029 as JSON `\u` sequences before injection. Data is a compile-time constant. |
| 3 | Medium | Original site (no headers) | Static hosting sent no security headers: no CSP, HSTS, `X-Content-Type-Options`, `frame-ancestors`, etc. | `public/.htaccess` adds CSP (hash-based `script-src`, `style-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`), HSTS, nosniff, `X-Frame-Options DENY`, Referrer-Policy, Permissions-Policy, COOP, CORP; forces HTTPS + canonical host; disables directory listing; denies dotfiles and `.map/.md/.json/.env/.log`. Verified in-browser: the hashed theme script runs, an injected inline script is blocked. |
| 4 | Low (robustness / a11y) | Original `.fade-in` CSS | Content started at `opacity: 0` and depended on JS to appear — with scripts blocked (strict corporate CSP, reader modes, JS disabled) the page was blank below the fold. | Fade-in styles are scoped to `html.js`, which the pre-paint script adds. No JS → everything visible. |
| 5 | Low | First draft `.htaccess` | HSTS with `includeSubDomains; preload` would lock **all** subdomains (e.g. Hostinger `mail.`/`ftp.`) to HTTPS and is effectively irreversible once preloaded. | `max-age=31536000` only, with a comment on when to add the stronger form. `interest-cohort` (deprecated, triggers console warnings) removed from Permissions-Policy. |
| 6 | Low | First draft `FadeIn.tsx` | Component spread arbitrary `...rest` props onto a DOM element. Harmless today (all callers are static) but an attribute-injection foot-gun for future edits. | Prop surface narrowed to `as`, `className`, `children`, `aria-labelledby`. |

## What was checked and is clean

- **`dangerouslySetInnerHTML`**: exactly two uses. (a) `THEME_INIT_SCRIPT` — a string constant with zero interpolation; the value it reads from `localStorage` is allow-listed to `'light'`/`'dark'` before touching the DOM. (b) JSON-LD via `safeJsonLd`. Nothing user-controlled reaches either.
- **No `eval`, `new Function`, `innerHTML`, `document.write`, `javascript:` URLs, inline `on*=` handlers, or `style=""` attributes** — grep across `src/` and asserted on the rendered HTML (0/0/0). The CSP script also aborts the build if any appear later.
- **External links**: 11 in the rendered page, all via `<ExtLink>` → `target="_blank" rel="noopener noreferrer"` (verified on the rendered DOM). No other way to make an off-site link exists in the codebase.
- **Third-party requests**: none. Fonts are self-hosted through `next/font/local`; there are no analytics, embeds, CDNs, or remote images. CSP `default-src 'self'` enforces this in production; `connect-src 'self'` covers Next's same-origin prefetches.
- **Secrets**: none in the repo. `.env` contains only `NEXT_TELEMETRY_DISABLED=1` and is documented as intentionally committed; `.env*.local` is git-ignored.
- **Supply chain**: `.npmrc` → `ignore-scripts=true` (no dependency lifecycle scripts execute on install), `audit=true`, `fund=false`; `npm run audit` fails the pipeline on moderate+ advisories; dependency ranges are caret-pinned to current majors (Next 16, React 19.2, Tailwind 4.1). Generate and commit `package-lock.json` on first install.
- **Build output hygiene**: `productionBrowserSourceMaps: false`, `poweredByHeader: false`, `output: "export"` (no server, no API routes, no middleware — smallest possible attack surface on shared hosting).
- **Clickjacking / framing**: `frame-ancestors 'none'` + `X-Frame-Options: DENY`.
- **Clipboard**: `navigator.clipboard.writeText` only (write, never read), user-initiated, wrapped in try/catch, announces via `role="status"`.

## Residual risks (documented, not fixable in code)

- The CSP hash approach trusts the **build machine**: whatever inline scripts `next build` emits are allow-listed. Keep the machine that runs `npm run build` clean and run `npm run audit` first.
- `.htaccess` directives depend on Hostinger enabling `mod_headers` / `mod_rewrite` (they do on shared and cloud plans). After the first deploy, confirm at https://securityheaders.com.
- Static export cannot use CSP nonces or `Report-To`; if a violation-reporting endpoint is ever wanted, it must be an external service and would need to be added to `connect-src`.
