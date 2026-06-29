import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WorkCard } from "@/components/WorkCard";
import { FinalCTA } from "@/components/home/FinalCTA";
import { caseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work | Execution Labs",
  description:
    "Selected systems we built. Agents, internal tools, MVP software, and full product systems.",
};

export default function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-16 sm:pt-48 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />
        <Container className="relative">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone-faint">
              Work
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-bone sm:text-6xl">
              Systems we put into the world
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg text-bone-dim">
              Real systems for real teams. Each one started as a brief and
              shipped as software that holds up. Pick one to read the full story.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, i) => (
              <Reveal key={study.slug} delay={(i % 3) * 0.05} className="h-full">
                <WorkCard study={study} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
