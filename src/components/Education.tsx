import { EDUCATION } from "@/data/site";
import { FadeIn } from "./FadeIn";
import { Section, SectionHead, TagList, cx } from "./ui";

export function Education() {
  return (
    <Section id="education" labelledBy="edu-h">
      <SectionHead index="05" id="edu-h">Education &amp; certifications</SectionHead>
      <div className="grid grid-cols-2 gap-6 max-nav:grid-cols-1">
        {EDUCATION.map((e) => (
          <FadeIn
            key={e.school}
            as="article"
            className={cx("bg-bg border rounded-xl p-8", e.featured ? "border-line-2" : "border-line")}
          >
            <span className="block font-mono text-xs text-accent-ink tracking-[0.04em] mb-2">{e.date}</span>
            <h3 className="font-display text-[1.2rem] font-bold mb-[0.35rem] tracking-[-0.01em]">{e.school}</h3>
            <p className="font-mono text-xs text-ink-2 mb-4 leading-[1.45] tracking-[0.02em]">{e.degree}</p>
            <p className="text-sm text-ink-2 leading-[1.7] mb-4">{e.desc}</p>
            <TagList items={e.tags} />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
