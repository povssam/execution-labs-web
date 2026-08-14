"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { ArrowUpRight } from "lucide-react";
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
};

export function WorkCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragState = useRef<DragState | null>(null);
  const suppressClick = useRef(false);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = caseStudies[activeIndex];

  useEffect(() => {
    if (window.innerWidth >= 768) return;

    const tab = tabs.current[activeIndex];
    const rail = tab?.parentElement;
    if (!tab || !rail) return;

    window.requestAnimationFrame(() => {
      const left = tab.offsetLeft - (rail.clientWidth - tab.offsetWidth) / 2;
      rail.scrollTo({
        left: Math.max(0, left),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    });
  }, [activeIndex]);

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
    };
    suppressClick.current = false;
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
    const intentionalSwipe = Math.abs(delta) > 42;

    const pointedTab = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest<HTMLElement>('[role="tab"]');
    const pointedIndex = pointedTab
      ? caseStudies.findIndex((study) => pointedTab.id === `work-tab-${study.slug}`)
      : -1;

    suppressClick.current = true;
    if (intentionalSwipe) {
      selectProject(activeIndex + (delta < 0 ? 1 : -1));
    } else if (pointedIndex >= 0) {
      selectProject(pointedIndex);
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    resetDrag();
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);
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
      <BrandAtmosphere intensity="soft" tone="system" focus="right" />
      <Container className="middle-container relative z-10">
        <Reveal className="work-selector-wrap">
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
                  <span className="work-project-trigger-name">{study.client}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <article
            key={selected.slug}
            id="selected-work-panel"
            role="tabpanel"
            aria-labelledby={`work-tab-${selected.slug}`}
            className="work-project-stage"
          >
            <h2 className="work-project-active-title middle-display">{selected.client}</h2>
            <div className="work-project-media">
              <div className="work-project-media-canvas">
                {selected.assets?.video ? (
                  <GraceVideo label={`${selected.client} selected project artifact`} />
                ) : (
                  <div className="work-artifact-field">
                    <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-45" />
                    <div className="relative z-10 max-w-4xl">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint">
                        {selected.artifact}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="work-project-media-shade pointer-events-none absolute inset-0" />
            </div>

            <div className="work-project-copy">
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
      </Container>
    </section>
  );
}
