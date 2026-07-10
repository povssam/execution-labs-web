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
import { caseStudies, type CaseStudy } from "@/lib/data";

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
          className="mx-auto text-center"
          title="Selected Work"
          description="Pick a project. Real artifacts, users, and workflows."
        />

        <Reveal delay={0.05}>
          <div className="work-showcase relative mt-12 sm:mt-16">
            <div
              data-native-scroll
              role="tablist"
              aria-label="Selected projects"
              className="project-carousel no-scrollbar mx-auto flex max-w-5xl gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:overflow-visible sm:pb-0"
            >
              {caseStudies.map((s, i) => {
                const selected = i === active;
                return (
                  <button
                    key={s.slug}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    onClick={() => setActive(i)}
                    className={
                      "project-tile group relative w-36 shrink-0 overflow-hidden rounded-lg border p-2 text-left transition duration-300 sm:w-auto sm:min-w-0 " +
                      (selected
                        ? "project-tile--active border-bone/40 bg-bone/[0.08] text-bone"
                        : "border-line/80 bg-charcoal/30 text-bone-dim hover:border-bone/30 hover:text-bone")
                    }
                  >
                    <div className="relative aspect-square overflow-hidden rounded-md bg-ink">
                      <ProjectVisual study={s} compact />
                    </div>
                    <span className="mt-3 block truncate text-sm font-medium">
                      {s.client}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="selected-stage media-reveal light-sweep mt-8 overflow-hidden rounded-lg border border-bone/15 bg-charcoal/35 sm:mt-10">
              <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
                <div className="relative aspect-[16/11] overflow-hidden bg-ink sm:aspect-[16/9] lg:min-h-[29rem]">
                  <ProjectVisual study={study} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent lg:bg-gradient-to-r" />
                </div>

                <div className="relative flex flex-col justify-center p-6 sm:p-9 lg:p-10">
                  <p className="text-sm text-bone-faint">{study.category}</p>
                  <h3 className="mt-4 text-3xl font-semibold leading-tight text-bone sm:text-5xl">
                    {study.client}
                  </h3>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-bone-dim sm:text-base">
                    {study.summary}
                  </p>

                  <dl className="mt-8 grid gap-4 border-t border-line pt-6 text-sm">
                    <div>
                      <dt className="text-bone">Built</dt>
                      <dd className="mt-1 text-bone-dim">{study.artifact}</dd>
                    </div>
                    <div>
                      <dt className="text-bone">Used by</dt>
                      <dd className="mt-1 text-bone-dim">{study.users}</dd>
                    </div>
                  </dl>

                  <Link
                    href={`/work/${study.slug}`}
                    className="group mt-8 inline-flex w-fit items-center gap-2 text-sm text-bone transition-colors duration-200 hover:text-white"
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

function ProjectVisual({
  study,
  compact = false,
}: {
  study: CaseStudy;
  compact?: boolean;
}) {
  if (study.assets?.video && !compact) {
    return (
      <GraceVideo
        key={`${study.slug}-${compact ? "compact" : "full"}`}
        label={`${study.client} motion proof`}
        className={compact ? "scale-[1.08]" : "scale-[1.01]"}
      />
    );
  }

  return (
    <div className={`case-visual case-visual--${study.preview}`}>
      <div className="case-visual-grid" />
      <div className="case-visual-glow" />
      <div className="case-visual-inner">
        <span className="case-visual-artifact">{study.artifact}</span>
        {!compact && (
          <span className="case-visual-summary">{study.proof}</span>
        )}
      </div>
    </div>
  );
}
