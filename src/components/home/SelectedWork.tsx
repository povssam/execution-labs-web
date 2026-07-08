"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { ButtonLink } from "../ui/Button";
import { GraceVideo } from "@/components/work/GraceVideo";
import { caseStudies } from "@/lib/data";

/**
 * Interactive project showcase. A centered row of real projects; selecting one
 * expands its detail in the same section. Cinematic and dark. All content is
 * real case-study data. No invented projects, metrics, or logos.
 */
export function SelectedWork() {
  const [active, setActive] = useState(0);
  const study = caseStudies[active];

  return (
    <section
      id="work"
      className="section-flow relative overflow-hidden py-20 sm:py-28"
    >
      <BrandAtmosphere intensity="soft" tone="proof" focus="left" />
      <Container className="relative z-10">
        <SectionHeading
          className="mx-auto text-center [&_span]:justify-center"
          label="Selected work"
          title="Shipped systems, not decks"
          description="Pick a project. Real artifacts, users, and workflows."
        />

        {/* Project selector: centered, wraps on mobile, no horizontal scroll. */}
        <Reveal delay={0.05}>
          <div
            role="tablist"
            aria-label="Selected projects"
            className="mt-10 flex flex-wrap justify-center gap-2 sm:mt-12 sm:gap-3"
          >
            {caseStudies.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.slug}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  className={
                    "rounded-full border px-4 py-2 text-sm transition-colors duration-200 " +
                    (selected
                      ? "border-bone/40 bg-bone text-ink"
                      : "border-line bg-charcoal-2/40 text-bone-dim hover:border-bone/30 hover:text-bone")
                  }
                >
                  {s.client}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Detail panel updates in place when a project is selected. */}
        <Reveal delay={0.08}>
          <div className="proof-card mt-8 overflow-hidden sm:mt-10">
            <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
              {/* Media / atmosphere side */}
              <div className="relative aspect-[16/11] overflow-hidden bg-ink sm:aspect-[16/10] lg:aspect-auto lg:min-h-[26rem]">
                {study.assets?.video ? (
                  <GraceVideo
                    key={study.slug}
                    label={`${study.client} motion proof`}
                    className="scale-[1.01]"
                  />
                ) : (
                  <div className="absolute inset-0">
                    <div className="grid-backdrop absolute inset-0 opacity-40" />
                    <BrandAtmosphere intensity="section" tone="proof" focus="center" />
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <span className="text-center text-2xl font-semibold leading-tight text-bone/90 sm:text-3xl">
                        {study.artifact}
                      </span>
                    </div>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>

              {/* Text side */}
              <div className="relative flex flex-col justify-center gap-5 p-6 sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="flow-line" aria-hidden />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint">
                    {study.category} · {study.year}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-bone sm:text-4xl">
                  {study.client}
                </h3>

                <p className="max-w-md text-sm leading-relaxed text-bone-dim sm:text-base">
                  {study.summary}
                </p>

                <dl className="grid gap-3 border-t border-line pt-5 text-sm">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                    <dt className="w-24 shrink-0 text-bone">Built</dt>
                    <dd className="text-bone-dim">{study.artifact}</dd>
                  </div>
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                    <dt className="w-24 shrink-0 text-bone">Used by</dt>
                    <dd className="text-bone-dim">{study.users}</dd>
                  </div>
                </dl>

                <Link
                  href={`/work/${study.slug}`}
                  className="group inline-flex w-fit items-center gap-2 text-sm text-bone transition-colors duration-200 hover:text-white"
                >
                  Open case study
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/work" variant="secondary">
            View all work
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
