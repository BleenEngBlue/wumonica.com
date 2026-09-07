import { CONTACT, SITE } from "@/data/site";
import { CopyEmail } from "./CopyEmail";
import { ExtLink, Section, SectionHead } from "./ui";

const SOCIAL_LINK =
  "font-mono text-sm text-ink-2 no-underline min-h-11 inline-flex items-center transition-colors hover:text-accent hover:no-underline";

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-h" alt>
      <SectionHead index="06" id="contact-h">Get in touch</SectionHead>
      <div className="grid grid-cols-[1fr_320px] gap-16 items-start max-nav:grid-cols-1 max-nav:gap-8">
        <div>
          <p className="font-display text-[2rem] font-semibold italic text-ink leading-[1.3] mb-6 tracking-[-0.01em]">
            If your product needs someone who can <em className="text-accent-ink not-italic">design the screen and ship the code</em>,
            message me and I&apos;ll tell you how I&apos;d approach it.
          </p>
          <p className="font-mono text-xs text-ink-2 leading-[1.7] tracking-[0.02em]">
            The conversations I want: <strong className="text-ink font-medium">{CONTACT.targeting}</strong>
            {CONTACT.targetingRest}
          </p>
        </div>

        <div className="flex flex-col gap-6 p-8 bg-bg border border-line-2 rounded-xl">
          <p className="font-mono text-xs font-medium text-ink-3 uppercase tracking-[0.1em]">Reach me directly</p>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-[0.6ch] font-mono text-base text-ink no-underline min-h-11 hover:text-accent hover:no-underline"
          >
            <span className="text-accent" aria-hidden="true">→</span>
            {SITE.email}
          </a>
          <CopyEmail email={SITE.email} />
          <nav className="flex flex-wrap gap-6 pt-4 border-t border-line" aria-label="Profiles">
            <ExtLink href={SITE.social.github} className={SOCIAL_LINK}>GitHub ↗</ExtLink>
            <ExtLink href={SITE.social.linkedin} className={SOCIAL_LINK}>LinkedIn ↗</ExtLink>
            <ExtLink href={SITE.social.huggingface} className={SOCIAL_LINK}>Hugging Face ↗</ExtLink>
          </nav>
        </div>
      </div>
    </Section>
  );
}
