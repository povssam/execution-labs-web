"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/Button";
import { GraceVideo } from "@/components/work/GraceVideo";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { cn } from "@/lib/utils";

const accents = [
  "rgba(169, 178, 255, 0.95)",
  "rgba(79, 215, 222, 0.9)",
  "rgba(238, 179, 96, 0.9)",
  "rgba(246, 104, 176, 0.82)",
  "rgba(112, 214, 167, 0.84)",
];

function selectorStyle(index: number, count: number) {
  const t = count <= 1 ? 0.5 : index / (count - 1);
  const left = 16 + t * 68;
  const top = 63 - Math.sin(t * Math.PI) * 17;
  return {
    left: `${left}%`,
    top: `${top}%`,
    transform: "translate(-50%, -50%)",
    "--orbit-accent": accents[index % accents.length],
    "--orbit-accent-soft": accents[index % accents.length].replace(/0\.[0-9]+\)$/, "0.16)"),
  } as CSSProperties & Record<string, string>;
}

function ProjectVisual({
  study,
  active = false,
}: {
  study: CaseStudy;
  active?: boolean;
}) {
  if (study.assets?.video) {
    return (
      <GraceVideo
        key={`${study.slug}-video`}
        label={`${study.client} motion proof`}
        className={cn("h-full w-full object-cover", active && "scale-[1.02]")}
      />
    );
  }

  return (
    <div className={`case-visual case-visual--${study.preview}`}>
      <div className="case-visual-grid" />
      <div className="case-visual-glow" />
      <div className="case-visual-inner">
        <span className="case-visual-artifact">{study.artifact}</span>
        <span className="case-visual-summary">{study.summary}</span>
      </div>
    </div>
  );
}

function ProjectStage({
  study,
  reduceMotion,
}: {
  study: CaseStudy;
  reduceMotion?: boolean;
}) {
  return (
    <motion.div
      key={study.slug}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.985 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.985 }}
      transition={reduceMotion ? { duration: 0.01 } : { duration: 0.3, ease: [0.2, 0.8, 0.3, 1] }}
      className="selected-work-stage relative"
    >
      <div className="grid gap-0 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="relative aspect-[16/10] overflow-hidden bg-ink sm:aspect-[16/9] lg:min-h-[30rem]">
          <ProjectVisual study={study} active />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/72 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/18 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col justify-between p-5 sm:p-8 lg:p-10">
          <div>
            <span className="block text-[0.72rem] font-medium uppercase tracking-[0.2em] text-bone-faint">
              {study.category}
            </span>
            <h3 className="mt-3 text-balance text-2xl font-semibold leading-[1.04] text-bone sm:text-5xl">
              {study.client}
            </h3>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-bone-dim sm:text-base">
              {study.result}
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <dl className="grid gap-4 border-t border-white/8 pt-5 text-sm">
              <div>
                <dt className="text-bone-faint">Artifact</dt>
                <dd className="mt-1 text-bone-dim">{study.artifact}</dd>
              </div>
              <div>
                <dt className="text-bone-faint">Users</dt>
                <dd className="mt-1 text-bone-dim">{study.users}</dd>
              </div>
            </dl>

            <Link
              href={`/work/${study.slug}`}
              className="group inline-flex items-center gap-2 text-sm text-bone-dim transition-colors duration-200 hover:text-bone"
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
    </motion.div>
  );
}

function SelectorCard({
  study,
  active,
  index,
  mobile = false,
  onActivate,
}: {
  study: CaseStudy;
  active: boolean;
  index: number;
  mobile?: boolean;
  onActivate: () => void;
}) {
  const base = mobile
    ? "selector-card premium-card relative snap-center overflow-hidden p-4 text-left"
    : "selector-card premium-card absolute overflow-hidden p-4 text-left";

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-label={study.client}
      onClick={onActivate}
      onFocus={onActivate}
      onPointerEnter={onActivate}
      className={cn(base, active && "premium-card--active selector-card--active")}
      style={mobile ? ({ "--orbit-accent": accents[index % accents.length] } as CSSProperties & Record<string, string>) : selectorStyle(index, caseStudies.length)}
    >
      <span className="block text-[0.75rem] font-medium uppercase tracking-[0.18em] text-bone-faint">
        {study.client}
      </span>
      <p className="mt-2 text-sm leading-snug text-bone-dim">{study.category}</p>
    </button>
  );
}

export function SelectedWork() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const study = caseStudies[active];

  const move = (direction: number) => {
    setActive((current) => (current + direction + caseStudies.length) % caseStudies.length);
  };

  return (
    <section
      id="work"
      className="section-flow relative overflow-hidden py-20 sm:py-28"
    >
      <BrandAtmosphere intensity="soft" tone="proof" focus="left" />
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-bone sm:text-5xl sm:leading-[1.04]">
            Selected Work
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bone-dim sm:text-lg">
            Pick a project with artifacts, users, and workflows.
          </p>
        </div>

        <div className="mt-10 md:mt-14">
          <div className="hidden md:block">
            <div
              className="relative mx-auto h-[46rem] max-w-6xl"
              role="tablist"
              aria-label="Selected projects"
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                  event.preventDefault();
                  move(1);
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  move(-1);
                }
              }}
            >
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="orbit-path absolute inset-0 h-full w-full"
              >
                <defs>
                  <linearGradient id="project-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(169,178,255,0.04)" />
                    <stop offset="22%" stopColor="rgba(169,178,255,0.28)" />
                    <stop offset="50%" stopColor="rgba(79,215,222,0.24)" />
                    <stop offset="78%" stopColor="rgba(238,179,96,0.18)" />
                    <stop offset="100%" stopColor="rgba(169,178,255,0.04)" />
                  </linearGradient>
                </defs>
                <path
                  d="M16 64 C 28 28, 72 28, 84 64"
                  fill="none"
                  stroke="url(#project-line)"
                  strokeWidth="0.9"
                />
                <path
                  d="M16 64 C 28 28, 72 28, 84 64"
                  fill="none"
                  stroke="rgba(237,237,237,0.04)"
                  strokeWidth="5.2"
                />
              </svg>

              {caseStudies.map((s, i) => (
                <SelectorCard
                  key={s.slug}
                  study={s}
                  index={i}
                  active={i === active}
                  onActivate={() => setActive(i)}
                />
              ))}

              <div className="absolute left-1/2 top-[56%] w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 px-6">
                <AnimatePresence mode="wait">
                  <ProjectStage key={study.slug} study={study} reduceMotion={!!reduceMotion} />
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <div
              data-native-scroll
              className="selector-rail no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3"
              role="tablist"
              aria-label="Selected projects"
            >
              {caseStudies.map((s, i) => (
                <SelectorCard
                  key={s.slug}
                  study={s}
                  index={i}
                  mobile
                  active={i === active}
                  onActivate={() => setActive(i)}
                />
              ))}
            </div>

            <div className="mt-4">
              <AnimatePresence mode="wait">
                <ProjectStage key={study.slug} study={study} reduceMotion={!!reduceMotion} />
              </AnimatePresence>
            </div>
          </div>
        </div>

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
