/**
 * Theme bootstrap. Runs inline in <head> before first paint so the page
 * never flashes the wrong theme (dark is the default).
 *
 * SECURITY NOTE: this string is a compile-time constant with no
 * interpolation — the only reason it is injected via dangerouslySetInnerHTML
 * is that it must execute before hydration. The localStorage value is
 * allow-listed ('light' or nothing) so stored data can never become code
 * or an arbitrary attribute value. Its sha256 is added to the CSP by
 * scripts/csp-hashes.mjs after each build.
 */
export const THEME_STORAGE_KEY = "theme_v2";

export const THEME_INIT_SCRIPT =
  "(function(){var d=document.documentElement;d.classList.add('js');var t='dark';" +
  "try{if(localStorage.getItem('theme_v2')==='light')t='light';}catch(e){}" +
  "d.setAttribute('data-theme',t);})();";

export type Theme = "dark" | "light";

export function normalizeTheme(value: unknown): Theme {
  return value === "light" ? "light" : "dark";
}
