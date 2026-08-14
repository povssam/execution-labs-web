import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandAtmosphere } from "@/components/BrandAtmosphere";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { WorkedWith } from "@/components/home/WorkedWith";
import { CardPreview } from "@/components/WorkCard";
import { GraceVideo } from "@/components/work/GraceVideo";
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
              Shipped systems, not decks.
            </h1>
          </Reveal>
        </Container>
      </section>

      <WorkedWith />

      <section className="work-index-section section-flow relative overflow-hidden">
        <BrandAtmosphere intensity="soft" tone="proof" focus="left" />
        <Container className="relative z-10">
          <div className="work-index">
            {caseStudies.map((study, i) => (
              <Reveal key={study.slug} delay={i * 0.04}>
                <Link
                  href={`/work/${study.slug}`}
                  className="work-index-item group"
                  aria-label={`Read the ${study.client} case study`}
                >
                  <div className="work-index-item-meta font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span>{study.category}</span>
                    <span>{study.year}</span>
                  </div>
                  <div className="work-index-item-layout">
                    <div className="work-index-media">
                      {study.assets?.video ? (
                        <GraceVideo label={`${study.client} animation preview`} />
                      ) : (
                        <>
                          <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-50" />
                          <div className="relative h-full">
                            <CardPreview kind={study.preview} />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="work-index-copy">
                      <h2>{study.client}</h2>
                      <p>{study.proof}</p>
                      <span className="work-index-link">
                        Open project
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
