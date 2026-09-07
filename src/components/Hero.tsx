import { HERO, SITE } from "@/data/site";
import { ExtLink, cx } from "./ui";

function Dot() {
  return <span className="w-2 h-2 rounded-full bg-accent shrink-0 pulse-dot" aria-hidden="true" />;
}

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-name"
      className={cx(
        "relative overflow-hidden pt-[clamp(3.5rem,9vw,7rem)] pb-24 border-b border-line",
        // violet glow, dark theme only
        "dark:before:content-[''] dark:before:absolute dark:before:-top-40 dark:before:-left-20",
        "dark:before:w-[720px] dark:before:h-[720px] dark:before:pointer-events-none",
        "dark:before:bg-[radial-gradient(ellipse,rgba(139,92,246,0.10)_0%,transparent_65%)]",
      )}
    >
      <div className="absolute inset-0 pointer-events-none hero-grid" aria-hidden="true" />
      <div className="container-site relative z-1">
        <p className="inline-flex flex-wrap items-center gap-y-[0.35em] gap-x-[0.85ch] font-mono text-xs font-medium tracking-[0.14em] uppercase text-accent-ink mb-6">
          {HERO.eyebrow.map((item, i) => (
            <span key={item} className="contents">
              {i > 0 && <span className="text-ink-3">·</span>}
              <span>{item}</span>
            </span>
          ))}
        </p>

        <h1 id="hero-name" className="font-display tracking-[-0.025em] leading-[0.88] mb-0">
          <span className="block text-hero-first font-medium italic text-accent leading-none">Monica</span>
          <span className="block text-hero-last font-bold text-ink leading-[0.87] -mt-[0.04em]">Wu</span>
        </h1>
        <div className="w-16 h-px bg-accent mt-8 mb-7" aria-hidden="true" />

        <p className="text-tagline leading-[1.45] tracking-[-0.005em] text-ink-2 max-w-[48ch] mb-10">
          I <strong className="text-ink font-semibold">design the interface and build what&apos;s behind it</strong> — production
          UI, design systems, and AI products, owned end to end.{" "}
          <em className="text-accent-ink not-italic">B.A. Design · 10 yrs of production frontend, 6 in regulated fintech and healthcare · ex-Microsoft, IQVIA.</em>
        </p>

        <div className="grid grid-cols-[1.4fr_1fr] gap-12 items-end max-nav:grid-cols-1 max-nav:gap-8 max-nav:items-start">
          <div>
            <div className="flex flex-wrap mb-6 max-sm:gap-y-4">
              {HERO.stats.map((s) => (
                <div
                  key={s.num}
                  className="pr-8 mr-8 border-r border-line last:border-r-0 last:mr-0 last:pr-0 max-sm:pr-6 max-sm:mr-6"
                >
                  <span className={cx("block font-display text-[2rem] font-bold leading-none mb-[0.4rem]", "accent" in s && s.accent ? "text-accent-ink" : "text-ink")}>
                    {s.num}
                  </span>
                  <span className="block font-mono text-xs tracking-[0.06em] uppercase text-ink-3">{s.label}</span>
                </div>
              ))}
            </div>
            <ul className="flex flex-wrap gap-2" role="list">
              {HERO.chips.map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center font-mono text-xs text-ink-2 bg-surface border border-line-2 px-[0.7rem] py-[0.35rem] rounded-sm leading-[1.3]"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-6 nav:items-end">
            <p className="inline-flex items-center gap-[0.7ch] font-mono text-xs tracking-[0.05em] uppercase text-ink-2">
              <Dot />
              <span>
                <strong className="text-ink font-medium">Open to work</strong> · {HERO.status}
              </span>
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-[0.7ch] min-h-[50px] px-[1.4rem] py-[0.85rem] font-mono text-[0.9375rem] text-ink no-underline bg-surface border border-line-2 rounded-lg transition-colors hover:border-accent hover:text-accent hover:bg-accent-soft hover:no-underline"
            >
              <span className="text-accent" aria-hidden="true">→</span>
              {SITE.email}
            </a>
            <nav className="flex gap-4 items-center" aria-label="Social profiles">
              <ExtLink href={SITE.social.github} aria-label="GitHub" className="inline-flex items-center justify-center w-11 h-11 text-ink-2 border border-line rounded-lg no-underline transition-colors hover:text-accent hover:border-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
              </ExtLink>
              <ExtLink href={SITE.social.linkedin} aria-label="LinkedIn" className="inline-flex items-center justify-center w-11 h-11 text-ink-2 border border-line rounded-lg no-underline transition-colors hover:text-accent hover:border-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </ExtLink>
              <ExtLink href={SITE.social.huggingface} aria-label="Hugging Face profile" className="inline-flex items-center justify-center w-11 h-11 text-ink-2 border border-line rounded-lg no-underline font-mono text-xs font-semibold transition-colors hover:text-accent hover:border-accent">
                HF
              </ExtLink>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
