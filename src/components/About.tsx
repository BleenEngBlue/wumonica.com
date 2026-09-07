import { ABOUT, CONTACT, SITE } from "@/data/site";
import { FadeIn } from "./FadeIn";
import { GhostLink, Section, SectionHead, cx } from "./ui";

export function About() {
  return (
    <Section id="about" labelledBy="about-h">
      <SectionHead index="01" id="about-h">About</SectionHead>
      <div className="grid grid-cols-[1fr_280px] gap-16 items-start max-nav:grid-cols-1 max-nav:gap-8">
        <div className="[&>p]:text-ink-2 [&>p]:mb-6 [&>p]:leading-[1.8] [&>p:last-child]:mb-0">
          <p className="font-display text-2xl font-semibold italic leading-[1.4]! text-ink!">
            I design it and I build it.{" "}
            <em className="text-accent-ink not-italic">
              One person owns the interface, the component system, and the code behind them — from the first prototype to the
              production deploy.
            </em>
          </p>
          <p>{ABOUT.paragraphs[0]}</p>
          <p>
            <strong className="text-ink">Digital Twin</strong> — an agentic RAG agent with structured tool-calling and real-time
            intent routing (Python, OpenAI, ChromaDB), live on Hugging Face Spaces since May 2026.{" "}
            <strong className="text-ink">Reconciliation Workbench</strong> — human-in-the-loop AI exception review for
            multi-jurisdiction tax compliance: 100% recall, zero false positives against seeded ground truth, with a full audit
            trail.
          </p>
          {ABOUT.paragraphs.slice(1).map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
          <p className="font-mono text-xs! border-t border-line pt-6 leading-[1.7]! tracking-[0.02em]">
            The conversations I want: <strong className="text-ink font-medium">{CONTACT.targeting}</strong>
            {CONTACT.targetingRest}
          </p>
        </div>

        <div className="flex flex-col gap-4 sticky top-[calc(var(--nav-h)+24px)] max-nav:static max-nav:flex-row max-nav:flex-wrap">
          {ABOUT.facts.map((f) => (
            <FadeIn key={f.num} className="bg-surface border border-line rounded-lg p-6 max-nav:flex-1 max-nav:min-w-[150px]">
              <span className={cx("block font-display text-[2rem] font-bold leading-none mb-2", "accent" in f && f.accent ? "text-accent-ink" : "text-ink")}>
                {f.num}
              </span>
              <span className="block text-sm text-ink-2 leading-[1.45]">{f.label}</span>
            </FadeIn>
          ))}
          <GhostLink href={`mailto:${SITE.email}`}>{SITE.email}</GhostLink>
        </div>
      </div>
    </Section>
  );
}
