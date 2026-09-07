import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="container-site py-24">
        <p className="font-mono text-xs text-accent-ink font-medium tracking-[0.08em] mb-4">404</p>
        <h1 className="font-display text-h2 font-bold tracking-[-0.02em] leading-[1.05] mb-6">
          That page doesn&apos;t exist.
        </h1>
        <p className="text-ink-2 mb-8 max-w-[60ch]">The address may have changed. Everything on this site lives on one page.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-[0.5ch] min-h-11 px-[1.3rem] py-[0.7rem] rounded-lg font-mono text-xs font-medium no-underline tracking-[0.06em] bg-transparent text-ink border border-line-2 hover:border-accent hover:text-accent transition-colors"
        >
          ← Back to wumonica.com
        </Link>
      </main>
      <Footer />
    </>
  );
}
