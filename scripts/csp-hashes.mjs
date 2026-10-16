#!/usr/bin/env node
/**
 * csp-hashes.mjs — runs after `next build` (see package.json "build").
 *
 * A static Next.js export cannot use CSP nonces, so we do the next-best
 * thing: hash every inline <script> the build emitted (the theme bootstrap,
 * JSON-LD, and Next's own hydration payload) and allow-list exactly those
 * hashes. Any injected inline script will be blocked by the browser.
 *
 * It also refuses to ship if it finds inline event handlers or javascript:
 * URLs, and reports inline style attributes (style-src stays 'self').
 *
 * The finished policy is written to two places:
 *   1. out/.htaccess  — Hostinger/Apache (header is read from the uploaded file).
 *   2. vercel.json    — Vercel reads this from the repo BEFORE the build, so the
 *      value must be committed. The build ID is content-derived (next.config.ts),
 *      making the hashes deterministic; CI fails if vercel.json is stale.
 *      When running on Vercel itself (VERCEL=1) the Apache files are removed
 *      from the output so they are never served.
 *
 * Usage:  node scripts/csp-hashes.mjs [outDir=out]
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = process.argv[2] ?? "out";
const HTACCESS = join(OUT, ".htaccess");
const HTACCESS_CASE_STUDIES = join(OUT, "case-studies", ".htaccess");
const VERCEL_JSON = "vercel.json";
const ON_VERCEL = process.env.VERCEL === "1";

if (!existsSync(OUT)) {
  console.error(`[csp] output dir "${OUT}" not found — run \`next build\` first.`);
  process.exit(1);
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

const htmlFiles = walk(OUT);
const hashes = new Set();
let inlineStyleAttrs = 0;
let inlineHandlers = 0;
let jsUrls = 0;

const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(SCRIPT_RE)) {
    const attrs = m[1] ?? "";
    const body = m[2] ?? "";
    if (/\bsrc\s*=/.test(attrs)) continue;            // external file — covered by 'self'
    if (/type\s*=\s*["']application\/(ld\+)?json["']/i.test(attrs)) continue; // data blocks never execute
    if (!body.trim()) continue;
    hashes.add("sha256-" + createHash("sha256").update(body, "utf8").digest("base64"));
  }
  inlineStyleAttrs += (html.match(/\sstyle\s*=\s*["']/gi) ?? []).length;
  inlineHandlers += (html.match(/\son[a-z]+\s*=\s*["']/gi) ?? []).length;
  jsUrls += (html.match(/href\s*=\s*["']\s*javascript:/gi) ?? []).length;
}

if (inlineHandlers || jsUrls) {
  console.error(`[csp] REFUSING TO SHIP: found ${inlineHandlers} inline event handler(s) and ${jsUrls} javascript: URL(s).`);
  process.exit(1);
}

const styleSrc = inlineStyleAttrs
  ? "'self' 'unsafe-inline'" // only reached if a future change adds style="" attributes
  : "'self'";

const csp = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].map((h) => `'${h}'`).join(" ")}`.trim(),
  `style-src ${styleSrc}`,
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

console.log(`[csp] ${htmlFiles.length} HTML file(s): ${relative(process.cwd(), OUT)}/`);
console.log(`[csp] ${hashes.size} inline script hash(es) allow-listed; inline style attrs: ${inlineStyleAttrs}`);

/* ---- 1. Apache / Hostinger: out/.htaccess ---- */
if (!existsSync(HTACCESS)) {
  console.error(`[csp] ${HTACCESS} missing — public/.htaccess was not copied by the build.`);
  process.exit(1);
}
if (ON_VERCEL) {
  // Vercel serves every file in the output directory; the Apache config must not be one of them.
  for (const f of [HTACCESS, HTACCESS_CASE_STUDIES]) if (existsSync(f)) rmSync(f);
  console.log("[csp] VERCEL=1 — removed Apache .htaccess files from the output");
} else {
  const PLACEHOLDER = 'Content-Security-Policy "__CSP__"';
  const before = readFileSync(HTACCESS, "utf8");
  if (!before.includes(PLACEHOLDER)) {
    console.error(`[csp] placeholder ${PLACEHOLDER} not found in .htaccess (already processed?).`);
    process.exit(1);
  }
  const after = before.replaceAll(PLACEHOLDER, `Content-Security-Policy "${csp.replace(/"/g, "'")}"`);
  writeFileSync(HTACCESS, after);
  if (after.includes(PLACEHOLDER)) {
    console.error("[csp] placeholder still present after replacement — aborting.");
    process.exit(1);
  }
  console.log(`[csp] Content-Security-Policy written to ${HTACCESS}`);
}

/* ---- 2. Vercel: vercel.json (committed; must match the build) ---- */
if (existsSync(VERCEL_JSON)) {
  const raw = readFileSync(VERCEL_JSON, "utf8");
  const config = JSON.parse(raw);
  let found = 0;
  for (const rule of config.headers ?? []) {
    for (const h of rule.headers ?? []) {
      if (h.key.toLowerCase() === "content-security-policy") {
        h.value = csp;
        found++;
      }
    }
  }
  if (found === 0) {
    console.error(`[csp] no Content-Security-Policy header entry found in ${VERCEL_JSON}.`);
    process.exit(1);
  }
  const next = JSON.stringify(config, null, 2) + "\n";
  if (next !== raw) {
    writeFileSync(VERCEL_JSON, next);
    if (process.env.CI) {
      // On CI the committed file must already match: a stale CSP would break hydration on Vercel.
      console.error(`[csp] ${VERCEL_JSON} was out of date. Run \`npm run build\` locally and commit ${VERCEL_JSON}.`);
      process.exit(1);
    }
    console.log(`[csp] Content-Security-Policy updated in ${VERCEL_JSON} — commit this file.`);
  } else {
    console.log(`[csp] ${VERCEL_JSON} already up to date`);
  }
}
