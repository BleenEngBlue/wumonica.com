import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <a
        href="#main-content"
        className="absolute -top-[200%] left-4 z-300 px-4 py-[0.6rem] bg-accent text-bg font-mono text-sm font-medium rounded-lg no-underline focus-visible:top-4 focus-visible:text-bg"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
