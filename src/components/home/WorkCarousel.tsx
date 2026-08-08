"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { ButtonLink } from "../ui/Button";
import { CardPreview } from "../WorkCard";
import { GraceVideo } from "@/components/work/GraceVideo";
import { caseStudies } from "@/lib/data";
import { cn } from "@/lib/utils";

const projectCount = caseStudies.length;

function wrapIndex(index: number) {
  return (index + projectCount) % projectCount;
}

function getArcOffset(index: number, activeIndex: number) {
  let offset = index - activeIndex;
  const midpoint = Math.floor(projectCount / 2);

  if (offset > midpoint) offset -= projectCount;
  if (offset < -midpoint) offset += projectCount;

  return offset;
}

type DragState = {
  pointerId: number;
  startX: number;
  startTime: number;
};

export function WorkCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragState = useRef<DragState | null>(null);
  const suppressClick = useRef(false);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = caseStudies[activeIndex];

  const selectProject = (index: number, focus = false) => {
    const nextIndex = wrapIndex(index);
    setActiveIndex(nextIndex);
    if (focus) {
      window.requestAnimationFrame(() => tabs.current[nextIndex]?.focus());
    }
  };

  const moveSelection = (direction: -1 | 1, steps = 1, focus = false) => {
    selectProject(activeIndex + direction * steps, focus);
  };

  const resetDrag = () => {
    dragState.current = null;
    setDragging(false);
    setDragX(0);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startTime: event.timeStamp,
    };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const delta = event.clientX - drag.startX;
    setDragX(Math.max(-180, Math.min(180, delta)));
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const delta = event.clientX - drag.startX;
    const elapsed = Math.max(1, event.timeStamp - drag.startTime);
    const velocity = delta / elapsed;
    const intentionalSwipe = Math.abs(delta) > 38 || Math.abs(velocity) > 0.42;

    suppressClick.current = Math.abs(delta) > 8;
    if (intentionalSwipe) {
      const steps = Math.abs(delta) > event.currentTarget.clientWidth * 0.34 ? 2 : 1;
      moveSelection(delta < 0 ? 1 : -1, steps);
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    resetDrag();
    window.requestAnimationFrame(() => {
      suppressClick.current = false;
    });
  };

  const handleTabKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectProject(index - 1, true);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectProject(index + 1, true);
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectProject(0, true);
    }
    if (event.key === "End") {
      event.preventDefault();
      selectProject(projectCount - 1, true);
    }
  };

  return (
    <section className="section-flow relative overflow-hidden py-20 sm:py-28">
      <BrandAtmosphere intensity="soft" tone="proof" focus="left" />
      <Container className="relative z-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            label="Selected work"
            title="Shipped systems, not decks"
            description="Real artifacts, users, and workflows. Proof stays visible."
          />

          <Reveal delay={0.08} className="flex items-center gap-3 lg:pb-1">
            <span className="mr-1 font-mono text-[11px] tracking-[0.16em] text-bone-faint">
              {String(activeIndex + 1).padStart(2, "0")} / {String(projectCount).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-label="Select previous project"
              onClick={() => moveSelection(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-charcoal/55 text-bone-dim transition-colors duration-200 hover:border-bone/35 hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone/40"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Select next project"
              onClick={() => moveSelection(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-charcoal/55 text-bone-dim transition-colors duration-200 hover:border-bone/35 hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone/40"
            >
              <ArrowRight size={16} />
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-8 sm:mt-10">
          <div className="work-arc-shell">
            <div
              className="work-arc-stage"
              data-dragging={dragging}
              role="tablist"
              aria-label="Selected projects"
              aria-orientation="horizontal"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={resetDrag}
              onDragStart={(event) => event.preventDefault()}
            >
              <p className="sr-only">
                Swipe, drag, tap a project, or use the left and right arrow keys to change selection.
              </p>
              <div
                className={cn("work-arc-track", dragging && "work-arc-track--dragging")}
                style={{ transform: `translate3d(${dragX}px, 0, 0)` }}
              >
                {caseStudies.map((study, index) => {
                  const offset = getArcOffset(index, activeIndex);
                  const isSelected = offset === 0;

                  return (
                    <button
                      key={study.slug}
                      ref={(element) => {
                        tabs.current[index] = element;
                      }}
                      id={`work-tab-${study.slug}`}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls="selected-work-panel"
                      tabIndex={isSelected ? 0 : -1}
                      data-offset={offset}
                      data-selected={isSelected}
                      onClick={() => {
                        if (!suppressClick.current) selectProject(index);
                      }}
                      onKeyDown={(event) => handleTabKeyDown(event, index)}
                      className="work-arc-item"
                      style={{ zIndex: 10 - Math.abs(offset) } as CSSProperties}
                    >
                      <div className="work-arc-card">
                        <div className="flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.15em] text-bone-faint sm:text-[10px]">
                          <span className="truncate">{study.category}</span>
                          <span className="shrink-0">{study.year}</span>
                        </div>
                        <div className="relative mt-3 h-20 overflow-hidden rounded-lg border border-line bg-ink p-3">
                          <span className="pointer-events-none absolute inset-0 grid-backdrop opacity-45" />
                          <div className="relative h-full">
                            <CardPreview kind={study.preview} />
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3 text-left">
                          <span className="truncate text-base font-semibold text-bone sm:text-lg">
                            {study.client}
                          </span>
                          <ArrowUpRight size={16} className="shrink-0 text-bone-dim" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              key={selected.slug}
              id="selected-work-panel"
              role="tabpanel"
              aria-labelledby={`work-tab-${selected.slug}`}
              className="work-project-detail grid overflow-hidden rounded-2xl border border-line bg-charcoal/45 lg:grid-cols-[1.12fr_0.88fr]"
            >
              <div className="work-project-media relative min-h-64 overflow-hidden bg-ink sm:min-h-80 lg:min-h-[25rem]">
                {selected.assets?.video ? (
                  <GraceVideo label={`${selected.client} selected project artifact`} />
                ) : (
                  <div className="relative flex h-full min-h-64 items-center justify-center p-10 sm:min-h-80 sm:p-16">
                    <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-55" />
                    <div className="relative h-40 w-full max-w-lg sm:h-48">
                      <CardPreview kind={selected.preview} />
                    </div>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/12" />
                <span className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-bone/15 bg-ink/75 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-bone-dim backdrop-blur-md">
                  {selected.artifact}
                </span>
              </div>

              <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
                  <span>{selected.category}</span>
                  <span>{selected.year}</span>
                </div>
                <h3 className="mt-5 text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
                  {selected.client}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-bone-dim">
                  {selected.summary}
                </p>
                <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-bone-dim">
                  {selected.built}
                </p>

                <dl className="mt-6 grid gap-4 border-t border-line pt-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
                      Proof
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-bone-dim">
                      {selected.proof}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
                      Used by
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-bone-dim">
                      {selected.users}
                    </dd>
                  </div>
                </dl>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-5 pt-8">
                  <div className="flex flex-wrap gap-2">
                    {selected.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line px-2.5 py-1 text-[11px] text-bone-dim"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/work/${selected.slug}`}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone/40"
                  >
                    View project
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8">
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
