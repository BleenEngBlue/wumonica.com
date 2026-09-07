import { PROJECTS } from "@/data/site";
import { FadeIn } from "./FadeIn";
import { Badge, GhostExtLink, Section, SectionHead, TagList, cx } from "./ui";

export function Projects() {
  return (
    <Section id="projects" labelledBy="projects-h" alt>
      <SectionHead index="02" id="projects-h">Projects</SectionHead>

      {PROJECTS.map((p) => {
        const titleId = `proj-${p.id}`;
        return (
          <FadeIn
            key={p.id}
            as="article"
            aria-labelledby={titleId}
            className={cx(
              "bg-bg border rounded-xl p-8 mb-8 last:mb-0 transition-colors",
              p.featured
                ? "border-line-2 hover:border-[rgba(139,92,246,0.45)]"
                : "border-line hover:border-[rgba(139,92,246,0.30)]",
            )}
          >
            <div className="flex justify-between items-start gap-6 mb-6 flex-wrap max-nav:flex-col max-nav:items-start">
              <div className="flex flex-col gap-2">
                <div>
                  <Badge live={p.badgeLive}>{p.badge}</Badge>
                </div>
                <h3 id={titleId} className="font-display text-[1.6rem] font-bold tracking-[-0.015em]">
                  {p.title}
                </h3>
                <p className="font-mono text-xs text-ink-3 tracking-[0.04em]">{p.sub}</p>
              </div>
              <div className="flex gap-2 shrink-0 max-sm:w-full">
                {p.links.map((l) => (
                  <GhostExtLink key={l.href} href={l.href} small>
                    {l.label} →
                  </GhostExtLink>
                ))}
              </div>
            </div>

            <p className="text-ink-2 leading-[1.75] mb-6 text-sm max-w-[72ch]">{p.desc}</p>

            {p.highlights && (
              <div className="grid grid-cols-2 gap-4 mb-6 max-nav:grid-cols-1">
                {p.highlights.map((h) => (
                  <div
                    key={h.title}
                    className={cx("bg-surface dark:bg-surface-2 border border-line rounded-lg p-6", h.wide && "col-span-full")}
                  >
                    <h4 className="flex items-center gap-[0.6ch] font-mono text-xs font-medium text-ink mb-2 uppercase tracking-[0.04em]">
                      <span className="text-accent-ink font-semibold text-base" aria-hidden="true">
                        {h.check ? "✓" : "›"}
                      </span>
                      {h.title}
                    </h4>
                    <p className="text-[0.85rem] text-ink-2 leading-[1.65]">{h.text}</p>
                  </div>
                ))}
              </div>
            )}

            <TagList items={p.stack} />
          </FadeIn>
        );
      })}
    </Section>
  );
}
