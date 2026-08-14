"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { GraceVideo } from "@/components/work/GraceVideo";
import { caseStudies } from "@/lib/data";

const projectCount = caseStudies.length;

function wrapIndex(index: number) {
  return (index + projectCount) % projectCount;
}

type DragState = {
  pointerId: number;
  startX: number;
  startTime: number;
};

export function WorkCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const resetDrag = () => {
    dragState.current = null;
    setDragging(false);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startTime: event.timeStamp,
    };
    setDragging(true);
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Synthetic pointer events may not own an active browser pointer.
    }
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const delta = event.clientX - drag.startX;
    const elapsed = Math.max(1, event.timeStamp - drag.startTime);
    const velocity = delta / elapsed;
    const intentionalSwipe = Math.abs(delta) > 42 || Math.abs(velocity) > 0.4;

    suppressClick.current = Math.abs(delta) > 8;
    if (intentionalSwipe) selectProject(activeIndex + (delta < 0 ? 1 : -1));

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
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectProject(index - 1, true);
    }
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
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
    <section id="selected-work" className="selected-work section-flow relative overflow-hidden">
      <BrandAtmosphere intensity="soft" tone="proof" focus="left" />
      <Container className="relative z-10">
        <div className="selected-work-intro">
          <Reveal className="editorial-heading grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div className="flex items-end justify-between gap-5 lg:block">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint">
                Selected work
              </p>
              <span className="font-mono text-[10px] tracking-[0.16em] text-bone-faint lg:mt-4 lg:block">
                {String(activeIndex + 1).padStart(2, "0")} / {String(projectCount).padStart(2, "0")}
              </span>
            </div>
            <div>
              <h2 className="max-w-4xl text-3xl font-semibold leading-[1.04] text-bone sm:text-4xl lg:text-6xl">
                Shipped systems, not decks.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="work-selector-wrap mt-8 sm:mt-10 lg:mt-12">
          <div
            className="work-project-rail no-scrollbar"
            data-dragging={dragging}
            role="tablist"
            aria-label="Selected projects"
            aria-orientation="horizontal"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={resetDrag}
            onDragStart={(event) => event.preventDefault()}
          >
            <p className="sr-only">
              Swipe, tap a project, or use the arrow keys to change selection.
            </p>
            {caseStudies.map((study, index) => {
              const isSelected = index === activeIndex;
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
                  data-selected={isSelected}
                  onClick={() => {
                    if (!suppressClick.current) selectProject(index);
                  }}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className="work-project-trigger"
                >
                  <span className="font-mono text-[9px] tracking-[0.14em] text-bone-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="work-project-trigger-name">{study.client}</span>
                </button>
              );
            })}
          </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <article
            key={selected.slug}
            id="selected-work-panel"
            role="tabpanel"
            aria-labelledby={`work-tab-${selected.slug}`}
            className="work-project-stage"
          >
            <div className="work-project-media">
              <div className="work-project-media-canvas">
                {selected.assets?.video ? (
                  <GraceVideo label={`${selected.client} selected project artifact`} />
                ) : (
                  <div className="work-artifact-field">
                    <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-45" />
                    <span className="work-artifact-index" aria-hidden="true">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <div className="relative z-10 max-w-4xl">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint">
                        {selected.artifact}
                      </p>
                      <h3 className="mt-5 text-5xl font-semibold leading-[0.92] tracking-tight text-bone sm:text-7xl lg:text-8xl">
                        {selected.client}
                      </h3>
                    </div>
                  </div>
                )}
              </div>
              <div className="work-project-media-shade pointer-events-none absolute inset-0" />
              {selected.assets?.video && (
                <span className="work-project-artifact-label pointer-events-none absolute bottom-5 left-5 z-10 font-mono text-[10px] uppercase tracking-[0.15em] text-bone-dim sm:bottom-8 sm:left-8">
                  {selected.artifact}
                </span>
              )}
            </div>

            <div className="work-project-copy">
              <div className="work-project-proof">
                <p>{selected.proof}</p>
              </div>
              <Link href={`/work/${selected.slug}`} className="work-project-link group">
                View project
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </article>
        </Reveal>

        <div className="work-all-row">
          <Link href="/work" className="work-all-link group">
            View all work
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
