"use client";

import Link from "next/link";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { caseStudies } from "@/lib/data";
import { SystemVisual, type SystemVisualVariant } from "./SystemVisual";
import styles from "./Middle.module.css";

const reelStudies = caseStudies.filter((study) => study.slug !== "grace");
const visualBySlug: Record<string, SystemVisualVariant> = {
  "orbit-artist-group": "orbit-artist-group",
  "media-scaling": "media-scaling",
  soniq: "soniq",
  "dividends-total-returns": "dividends-total-returns",
};

function clampIndex(index: number) {
  return Math.min(reelStudies.length - 1, Math.max(0, index));
}

export function ProjectReel() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef<{
    id: number;
    startX: number;
    startY: number;
    lastX: number;
    lastTime: number;
    velocityX: number;
  } | null>(null);
  const draggedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [step, setStep] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const activeIndexRef = useRef(0);

  const measureStep = useCallback(() => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-project-reel-card]");
    if (!track || !card) return 0;

    const railStyles = window.getComputedStyle(track);
    const gap = Number.parseFloat(railStyles.columnGap || railStyles.gap || "0");
    return card.getBoundingClientRect().width + gap;
  }, []);

  useEffect(() => {
    const updateStep = () => setStep(measureStep());
    updateStep();
    const observer = new ResizeObserver(updateStep);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", updateStep);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateStep);
    };
  }, [measureStep]);

  const settle = useCallback((requestedIndex: number) => {
    const boundedIndex = clampIndex(requestedIndex);
    activeIndexRef.current = boundedIndex;
    setActiveIndex(boundedIndex);
    setDragOffset(0);
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.preventDefault();

    const now = performance.now();
    pointerRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastTime: now,
      velocityX: 0,
    };
    draggedRef.current = false;
    setDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    event.preventDefault();

    const deltaX = event.clientX - pointer.startX;
    const deltaY = event.clientY - pointer.startY;
    if (Math.abs(deltaY) > Math.abs(deltaX) + 6 && Math.abs(deltaY) > 12) {
      pointerRef.current = null;
      setDragging(false);
      setDragOffset(0);
      return;
    }

    if (Math.abs(deltaX) > 8) draggedRef.current = true;
    const now = performance.now();
    const elapsed = Math.max(1, now - pointer.lastTime);
    pointer.velocityX = (event.clientX - pointer.lastX) / elapsed;
    pointer.lastX = event.clientX;
    pointer.lastTime = now;
    setDragOffset(deltaX);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    pointerRef.current = null;
    setDragging(false);
    if (!pointer || pointer.id !== event.pointerId) return;

    const deltaX = event.clientX - pointer.startX;
    const momentum = Math.max(-160, Math.min(160, pointer.velocityX * 120));
    const projectedDelta = deltaX + momentum;
    const threshold = Math.max(40, (railRef.current?.clientWidth ?? 0) * 0.1);

    if (Math.abs(projectedDelta) >= threshold) {
      settle(activeIndexRef.current + (projectedDelta < 0 ? 1 : -1));
    } else {
      setDragOffset(0);
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      settle(activeIndexRef.current + 1);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      settle(activeIndexRef.current - 1);
    }
  };

  const transform = `translate3d(${-(activeIndex * step) + dragOffset}px, 0, 0)`;

  return (
    <section
      id="project-reel"
      data-project-reel-index={activeIndex}
      className={`${styles.section} ${styles.reelSection} ${styles.lastSection} section-flow relative overflow-hidden`}
    >
      <div className={`${styles.container} relative z-10`}>
        <div className={styles.reelIntro}>
          <span className={styles.sectionKicker}>04 / System archive</span>
          <span className={styles.workIntroMeta}>Swipe / drag / tap</span>
        </div>

        <div className={styles.reelCanvas}>
          <div
            ref={railRef}
            className={styles.reelRail}
            data-dragging={dragging}
            tabIndex={0}
            role="list"
            aria-label="Project reel"
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              pointerRef.current = null;
              setDragging(false);
              setDragOffset(0);
            }}
            onClickCapture={(event) => {
              if (!draggedRef.current) return;
              event.preventDefault();
              event.stopPropagation();
              draggedRef.current = false;
            }}
          >
            <div
              ref={trackRef}
              className={styles.reelTrack}
              style={{
                transform,
                transition: dragging || reducedMotion ? "none" : undefined,
              }}
            >
              {reelStudies.map((study) => {
                const discipline = study.category.split(",")[0];
                return (
                  <article
                    key={study.slug}
                    className={styles.reelCard}
                    data-project-reel-card
                    role="listitem"
                  >
                    <Link href={`/work/${study.slug}`} className={styles.reelCardLink}>
                      <div className={styles.reelCardMedia}>
                        <SystemVisual
                          animated={false}
                          variant={visualBySlug[study.slug]}
                          label={`${study.client} project artifact`}
                        />
                      </div>
                      <div className={styles.reelCardMeta}>
                        <span>{study.client}</span>
                        <span>{discipline}</span>
                        <span>{study.year}</span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
          <p className="sr-only">Swipe or drag horizontally to browse projects. Tap a project to open it.</p>
        </div>
      </div>
    </section>
  );
}
