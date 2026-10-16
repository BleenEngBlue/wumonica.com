// ESLint flat config (ESLint 9). `next lint` was removed in Next.js 16, so the
// `lint` script now calls the ESLint CLI directly with Next's recommended rules:
// core-web-vitals (React, hooks, jsx-a11y, @next/next) plus TypeScript.
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "node_modules/**",
    ".history/**",            // VS Code Local History snapshots
    "next-env.d.ts",
    "public/**",              // hand-written static case studies; theme.js is ES5 by design
  ]),
]);
