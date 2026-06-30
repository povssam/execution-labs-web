import type { Metadata } from "next";
import { BrandAtmosphere } from "@/components/BrandAtmosphere";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WorkCard } from "@/components/WorkCard";
import { FinalCTA } from "@/components/home/FinalCTA";
import { caseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work | Execution Labs",
  description:
    "Selected systems Execution Labs built. Agents, internal tools, MVP software, and product systems with proof attached.",
};

export default function WorkPage() {
  return (
    <>
      <section className="section-flow section-flow--hero relative overflow-hidden pt-40 pb-16 sm:pt-48 sm:pb-20">
        <BrandAtmosphere intensity="section" tone="proof" focus="right" />
        <Container className="relative z-10">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone-faint">
              Work
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-bone sm:text-6xl">
              Shipped systems, not decks
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg text-bone-dim">
              Each project started as a business problem and became something a
              team could use. The proof is the workflow, the artifact, and what
              changed after launch.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="section-flow relative overflow-hidden pb-24 sm:pb-32">
        <BrandAtmosphere intensity="soft" tone="proof" focus="left" />
        <Container className="relative z-10">
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
