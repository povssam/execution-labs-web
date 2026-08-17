"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { ArrowUpRight } from "lucide-react";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Reveal } from "../ui/Reveal";
import { GraceVideo } from "@/components/work/GraceVideo";
import { caseStudies } from "@/lib/data";
import styles from "./Middle.module.css";

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
  const reducedMotion = useReducedMotion();
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
    <section id="selected-work" className={`${styles.section} ${styles.workSection} section-flow relative overflow-hidden`}>
      <BrandAtmosphere intensity="soft" tone="system" focus="right" />
      <div className={`${styles.container} relative z-10`}>
        <Reveal>
          <div className={styles.selectorViewport}>
            <div
              className={`${styles.selectorRail} no-scrollbar`}
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
                    className={`${styles.selectorItem} ${isSelected ? styles.selected : ""}`}
                  >
                    {study.client}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className={styles.projectPanelFrame}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={selected.slug}
              id="selected-work-panel"
              role="tabpanel"
              aria-labelledby={`work-tab-${selected.slug}`}
              className={styles.projectStage}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 18, scale: reducedMotion ? 1 : 0.992 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -10, scale: reducedMotion ? 1 : 0.996 }}
              transition={{ duration: reducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className={`${styles.display} ${styles.projectTitle}`}>{selected.client}</h2>
              <div className={styles.media} data-project-media>
                <div className={styles.mediaCanvas}>
                  {selected.assets?.video ? (
                    <GraceVideo label={`${selected.client} selected project artifact`} />
                  ) : (
                    <div className={styles.artifact}>
                      <p className={styles.artifactCopy}>{selected.artifact}</p>
                      <div className={styles.artifactTags}>
                        {selected.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.mediaShade} />
              </div>

              <Link href={`/work/${selected.slug}`} className={`${styles.projectAction} group`} data-project-link>
                View project
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
