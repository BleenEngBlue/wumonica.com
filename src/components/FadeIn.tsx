"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { cx } from "./ui";

/**
 * Progressive fade-in on scroll.
 * - No JS / reduced motion: content is simply visible (the .fade-in styles
 *   only apply under html.js, which the theme init script adds).
 * - IntersectionObserver reveals once, then disconnects.
 */
export function FadeIn({
  as: Tag = "div",
  className,
  children,
  "aria-labelledby": ariaLabelledBy,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={cx("fade-in", className)} aria-labelledby={ariaLabelledBy}>
      {children}
    </Tag>
  );
}
