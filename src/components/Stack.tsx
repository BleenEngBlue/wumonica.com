import { STACK } from "@/data/site";
import { FadeIn } from "./FadeIn";
import { Section, SectionHead, TagList } from "./ui";

export function Stack() {
  return (
    <Section id="stack" labelledBy="stack-h">
      <SectionHead index="03" id="stack-h">Stack</SectionHead>
      <div className="grid grid-cols-2 gap-6 max-nav:grid-cols-1">
        {STACK.map((g) => (
          <FadeIn key={g.label} className="bg-bg border border-line rounded-lg px-8 py-6">
            <h3 className="flex items-center gap-[0.6ch] font-mono text-xs font-medium text-ink-3 uppercase tracking-[0.1em] mb-4">
              <span className="text-accent-ink tracking-[-0.05em]" aria-hidden="true">//</span>
              {g.label}
            </h3>
            <TagList items={g.tags} />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
