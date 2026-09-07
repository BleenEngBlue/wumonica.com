import { EXPERIENCE } from "@/data/site";
import { FadeIn } from "./FadeIn";
import { Section, SectionHead, TagList } from "./ui";

export function Experience() {
  return (
    <Section id="experience" labelledBy="exp-h" alt>
      <SectionHead index="04" id="exp-h">Experience</SectionHead>
      <div className="flex flex-col">
        {EXPERIENCE.map((job) => (
          <FadeIn
            key={`${job.company}-${job.date}`}
            as="article"
            className="grid grid-cols-[210px_1fr] gap-8 py-8 border-b border-line first:pt-0 last:border-b-0 last:pb-0 max-nav:grid-cols-1 max-nav:gap-2"
          >
            <div className="flex flex-col gap-[0.4rem] pt-[0.15rem]">
              <span className="font-mono text-xs text-accent-ink tracking-[0.04em]">{job.date}</span>
              <span className="font-mono text-xs font-medium text-ink-3 leading-[1.4] tracking-[0.02em] uppercase">
                {job.company}
              </span>
            </div>
            <div>
              <h3 className="font-display text-[1.3rem] font-bold text-ink mb-2 tracking-[-0.01em]">{job.role}</h3>
              <p className="text-sm text-ink-2 leading-[1.75] mb-4">
                {job.body}
                {job.via && (
                  <span className="block mt-2 font-mono text-xs text-ink-3 tracking-[0.02em]">{job.via}</span>
                )}
              </p>
              <TagList items={job.tags} />
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
