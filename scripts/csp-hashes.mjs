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
 * Usage:  node scripts/csp-hashes.mjs [outDir=out]
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = process.argv[2] ?? "out";
const HTACCESS = join(OUT, ".htaccess");

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

if (!existsSync(HTACCESS)) {
  console.error(`[csp] ${HTACCESS} missing — public/.htaccess was not copied by the build.`);
  process.exit(1);
}
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

console.log(`[csp] ${htmlFiles.length} HTML file(s): ${relative(process.cwd(), OUT)}/`);
console.log(`[csp] ${hashes.size} inline script hash(es) allow-listed; inline style attrs: ${inlineStyleAttrs}`);
console.log(`[csp] Content-Security-Policy written to ${HTACCESS}`);
