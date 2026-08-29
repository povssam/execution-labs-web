"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { caseStudies } from "@/lib/data";
import { Container } from "../ui/Container";
import styles from "./EvidenceViewport.module.css";

const reelStudies = caseStudies.filter((study) => study.slug !== "grace");

const media: Record<string, string> = {
  "orbit-artist-group": "/brand/projects/orbit-artist-group-orbit.png",
  "media-scaling": "/brand/projects/media-scaling-orbit.png",
  soniq: "/brand/projects/soniq-orbit.png",
  "dividends-total-returns": "/brand/projects/dividends-total-returns-orbit.png",
};

function clampIndex(index: number) {
  return Math.min(reelStudies.length - 1, Math.max(0, index));
}

export function EvidenceViewport() {
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
  const activeIndexRef = useRef(0);
  const draggedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [step, setStep] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const activeStudy = reelStudies[activeIndex] ?? reelStudies[0];

  const measureStep = useCallback(() => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-evidence-card]");
    if (!track || !card) return 0;

    const trackStyles = window.getComputedStyle(track);
    const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
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
    if (event.pointerType === "mouse") event.preventDefault();

    pointerRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocityX: 0,
    };
    draggedRef.current = false;
    setDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;

    const deltaX = event.clientX - pointer.startX;
    const deltaY = event.clientY - pointer.startY;
    if (Math.abs(deltaY) > Math.abs(deltaX) + 6 && Math.abs(deltaY) > 12) {
      pointerRef.current = null;
      setDragging(false);
      setDragOffset(0);
      return;
    }

    if (Math.abs(deltaX) > 8) {
      draggedRef.current = true;
      event.preventDefault();
    }

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

  const handlePointerCancel = () => {
    pointerRef.current = null;
    setDragging(false);
    setDragOffset(0);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = activeIndexRef.current + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = activeIndexRef.current - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = reelStudies.length - 1;
    if (next === null) return;

    event.preventDefault();
    settle(next);
  };

  const transform = `translate3d(${-(activeIndex * step) + dragOffset}px, 0, 0)`;

  return (
    <section id="proof" data-evidence-index={activeIndex} className={styles.section}>
      <Container className={styles.container}>
        <div className={styles.intro}>
          <span>05 / Project reel</span>
          <span>Drag / tap to open</span>
        </div>

        <div className={styles.railFrame}>
          <div
            ref={railRef}
            className={styles.rail}
            data-dragging={dragging}
            tabIndex={0}
            role="list"
            aria-label="Project reel"
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onClickCapture={(event) => {
              if (!draggedRef.current) return;
              event.preventDefault();
              event.stopPropagation();
              draggedRef.current = false;
            }}
          >
            <div
              ref={trackRef}
              className={styles.track}
              data-dragging={dragging}
              style={{
                transform,
                transition: dragging || reducedMotion ? "none" : undefined,
              }}
            >
              {reelStudies.map((study, index) => (
                <article
                  key={study.slug}
                  className={styles.card}
                  data-active={index === activeIndex}
                  data-evidence-card
                  role="listitem"
                >
                  <Link href={`/work/${study.slug}`} className={styles.cardLink}>
                    <div className={styles.media}>
                      <Image
                        src={media[study.slug]}
                        alt={`${study.client} project artifact`}
                        fill
                        sizes="(max-width: 767px) calc(100vw - 4rem), min(54rem, 58vw)"
                        className={styles.image}
                      />
                    </div>
                    <div className={styles.cardMeta}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{study.client}</strong>
                      <span>{study.category.split(",")[0]}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
          <p className="sr-only">Swipe or drag horizontally to browse projects. Tap a project to open it.</p>
        </div>

        <div className={styles.status} aria-live="polite">
          <span>{String(activeIndex + 1).padStart(2, "0")} / {String(reelStudies.length).padStart(2, "0")}</span>
          <Link href={`/work/${activeStudy?.slug ?? reelStudies[0]?.slug}`}>
            Open project <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
