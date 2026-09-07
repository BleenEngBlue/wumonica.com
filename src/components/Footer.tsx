import { SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="py-12 border-t border-line">
      <div className="container-site">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <p className="font-mono text-xs text-ink-2 leading-[1.6]">
            {SITE.name} ·{" "}
            <a href={`mailto:${SITE.email}`} className="text-ink-2 hover:text-accent">
              {SITE.email}
            </a>
          </p>
          <p className="font-mono text-xs text-ink-3 leading-[1.6]">
            {SITE.headline} · Updated {SITE.updated}
          </p>
        </div>
      </div>
    </footer>
  );
}
