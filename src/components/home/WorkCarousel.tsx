"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { ButtonLink } from "../ui/Button";
import { WorkCard } from "../WorkCard";
import { GraceVideo } from "@/components/work/GraceVideo";
import { caseStudies } from "@/lib/data";

export function WorkCarousel() {
  const rail = [...caseStudies, ...caseStudies];

  return (
    <section className="section-flow relative overflow-hidden py-20 sm:py-28">
      <BrandAtmosphere intensity="soft" tone="proof" focus="left" />
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <SectionHeading
            label="Selected work"
            title="Shipped systems, not decks"
            description="Real artifacts, users, and workflows. Proof stays visible."
          />

          <Reveal className="work-rail relative h-[34rem] overflow-hidden rounded-2xl border border-line bg-charcoal/35 p-3 sm:h-[38rem] sm:p-4">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-ink/80 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-ink/80 to-transparent" />
            <div className="work-rail-track flex flex-col gap-4">
              {rail.map((study, i) => (
                <div key={`${study.slug}-${i}`} className="min-h-[15rem]">
                  <WorkCard study={study} className="h-full" />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-start-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {caseStudies.slice(0, 2).map((study) => (
                <Link
                  key={study.slug}
                  href={`/work/${study.slug}`}
                  className="group overflow-hidden rounded-2xl border border-line bg-charcoal/35 transition-colors duration-200 hover:border-bone/25 hover:bg-charcoal-2/60"
                >
                  {study.assets?.video && (
                    <div className="relative aspect-video bg-ink">
                      <GraceVideo label={`${study.client} featured preview`} />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
                        Featured
                      </span>
                      <ArrowUpRight size={16} className="text-bone transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-bone">{study.client}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                      {study.summary}
                    </p>
                    <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-bone-dim">
                      <span className="text-bone">Built:</span> {study.artifact}
                      <br />
                      <span className="text-bone">Used by:</span> {study.users}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>

          <div className="lg:col-start-1 lg:row-start-2">
            <ButtonLink href="/work" variant="secondary">
              View all work
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
