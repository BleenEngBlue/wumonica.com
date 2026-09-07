import type { ReactNode, AnchorHTMLAttributes } from "react";

/* ------------------------------------------------------------------
   Small shared primitives. All text comes through React children, so
   nothing is ever injected as raw HTML.
   ------------------------------------------------------------------ */

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Chip / tag pill — mono, low-emphasis. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <li
      className={cx(
        "inline-flex items-center font-mono text-xs text-ink-2 bg-surface dark:bg-surface-2",
        "border border-line-2 px-[0.7rem] py-[0.35rem] rounded-sm leading-[1.3]",
        className,
      )}
    >
      {children}
    </li>
  );
}

export function TagList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cx("flex flex-wrap gap-2", className)} role="list">
      {items.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </ul>
  );
}

/**
 * External link. Security: every off-site link gets target=_blank +
 * rel="noopener noreferrer" here — there is no other way to make one.
 * Accessibility: announces "(opens in a new tab)" to screen readers.
 */
export function ExtLink({
  href,
  children,
  className,
  ...rest
}: { href: string; children: ReactNode; className?: string } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target" | "rel"
>) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

const BTN_BASE =
  "inline-flex items-center justify-center gap-[0.5ch] rounded-lg font-mono text-xs font-medium " +
  "no-underline whitespace-nowrap tracking-[0.06em] transition-colors " +
  "bg-transparent text-ink border border-line-2 hover:border-accent hover:text-accent";

/** Ghost button rendered as an external link. */
export function GhostExtLink({ href, children, small }: { href: string; children: ReactNode; small?: boolean }) {
  return (
    <ExtLink
      href={href}
      className={cx(BTN_BASE, small ? "min-h-9 px-[0.85rem] py-[0.4rem]" : "min-h-11 px-[1.3rem] py-[0.7rem]")}
    >
      {children}
    </ExtLink>
  );
}

/** Ghost button rendered as a same-origin / mailto link. */
export function GhostLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={cx(BTN_BASE, "min-h-11 px-[1.3rem] py-[0.7rem]")}>
      {children}
    </a>
  );
}

/** Numbered section heading ("01 About"). */
export function SectionHead({ index, id, children }: { index: string; id: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-4 mb-12">
      <span className="font-mono text-xs text-accent-ink font-medium tracking-[0.08em]">{index}</span>
      <h2 id={id} className="font-display text-h2 font-bold tracking-[-0.02em] leading-[1.05]">
        {children}
      </h2>
    </div>
  );
}

export function Section({
  id,
  labelledBy,
  alt,
  children,
}: {
  id: string;
  labelledBy: string;
  alt?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx("py-24 max-nav:py-16", alt && "bg-surface border-y border-line")}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}

export function Badge({ children, live }: { children: ReactNode; live?: boolean }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-[0.5ch] font-mono text-[0.6875rem] font-medium",
        "px-[0.7rem] py-1 rounded-full uppercase tracking-[0.06em]",
        live ? "text-bg bg-accent" : "text-ink-2 bg-surface-2 border border-line-2",
      )}
    >
      {live && <span className="w-2 h-2 rounded-full bg-bg shrink-0" aria-hidden="true" />}
      {children}
    </span>
  );
}
