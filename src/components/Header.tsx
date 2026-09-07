"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/data/site";
import { THEME_STORAGE_KEY, normalizeTheme, type Theme } from "@/lib/theme";
import { cx } from "./ui";

const NAV_LINK =
  "font-mono text-xs text-ink-2 no-underline py-2 tracking-[0.08em] uppercase relative transition-colors " +
  "hover:text-ink hover:no-underline " +
  "after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-accent " +
  "after:transition-[width] after:duration-150 hover:after:w-full " +
  "aria-[current=location]:text-ink aria-[current=location]:after:w-full";

export function Header() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  /* Sync initial theme from the attribute the pre-paint script set. */
  useEffect(() => {
    setTheme(normalizeTheme(document.documentElement.getAttribute("data-theme")));
  }, []);

  const applyTheme = useCallback((next: Theme) => {
    const t = normalizeTheme(next); // allow-list — never write arbitrary values
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, t);
    } catch {
      /* storage unavailable (private mode) — theme still applies for this page view */
    }
    setTheme(t);
  }, []);

  /* Mobile menu: Escape closes and returns focus; outside click closes. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!mobileRef.current?.contains(t) && !hamburgerRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  /* Scroll-spy: mark the section in the middle of the viewport as current. */
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-100 header-glass border-b border-line">
      <nav className="flex items-center justify-between h-16 max-w-site mx-auto px-6 max-nav:px-5" aria-label="Primary">
        <a
          href="#home"
          className="font-display font-bold text-xl tracking-[-0.01em] no-underline text-ink inline-flex items-center min-h-11 hover:text-accent hover:no-underline transition-colors"
          aria-label={`${SITE.name} — back to top`}
        >
          {SITE.name}
        </a>

        <ul className="hidden nav:flex items-center gap-8" role="list">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={NAV_LINK}
                aria-current={active === item.href.slice(1) ? "location" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Constant accessible name + aria-pressed state (WCAG 4.1.2). */}
          <button
            type="button"
            className="flex items-center justify-center w-11 h-11 rounded-lg text-ink-2 border border-transparent transition-colors hover:text-ink hover:bg-surface hover:border-line"
            aria-label="Dark mode"
            aria-pressed={theme === "dark"}
            onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
          >
            {/* sun shows in light, moon in dark */}
            <svg className="dark:hidden" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <svg className="hidden dark:block" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>

          <button
            ref={hamburgerRef}
            type="button"
            className="group flex nav:hidden flex-col gap-[5px] items-center justify-center w-11 h-11 rounded-lg text-ink border border-transparent transition-colors hover:bg-surface hover:border-line"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="nav-mobile"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="block w-[18px] h-[1.5px] bg-current rounded-sm transition-transform group-aria-expanded:translate-y-[6.5px] group-aria-expanded:rotate-45" />
            <span className="block w-[18px] h-[1.5px] bg-current rounded-sm transition-opacity group-aria-expanded:opacity-0" />
            <span className="block w-[18px] h-[1.5px] bg-current rounded-sm transition-transform group-aria-expanded:-translate-y-[6.5px] group-aria-expanded:-rotate-45" />
          </button>
        </div>
      </nav>

      <div
        id="nav-mobile"
        ref={mobileRef}
        hidden={!open}
        className={cx("nav:hidden px-6 max-nav:px-5 pt-4 pb-6 border-t border-line bg-bg", !open && "hidden")}
      >
        <ul className="flex flex-col" role="list">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block py-[0.875rem] font-mono text-base tracking-[0.04em] text-ink no-underline border-b border-line hover:text-accent"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
