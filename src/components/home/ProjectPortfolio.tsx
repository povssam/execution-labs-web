"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { caseStudies } from "@/lib/data";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { Container } from "../ui/Container";
import styles from "./ProjectPortfolio.module.css";

const media: Record<string, string> = {
  grace: "/brand/grace/grace-avatar.jpg",
  "orbit-artist-group": "/brand/projects/orbit-artist-group-orbit.png",
  "media-scaling": "/brand/projects/media-scaling-orbit.png",
  soniq: "/brand/projects/soniq-orbit.png",
  "dividends-total-returns": "/brand/projects/dividends-total-returns-orbit.png",
};

const portfolioOrder = [
  "grace",
  "media-scaling",
  "dividends-total-returns",
  "orbit-artist-group",
  "soniq",
];

const portfolioStudies = portfolioOrder
  .map((slug) => caseStudies.find((study) => study.slug === slug))
  .filter((study) => study !== undefined);

const portfolioDisciplines: Record<string, string> = {
  grace: "Brand System",
  "media-scaling": "Internal Tools",
  "dividends-total-returns": "Financial Product",
  "orbit-artist-group": "Artist Platform",
  soniq: "Product / Audio",
};

function relativeIndex(index: number, active: number, length: number) {
  let delta = index - active;
  if (delta > length / 2) delta -= length;
  if (delta < -length / 2) delta += length;
  return delta;
}

export function ProjectPortfolio() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef<{ id: number; startX: number; startY: number; lastX: number; lastTime: number; velocity: number } | null>(null);
  const activeRef = useRef(0);
  const scrollProgressRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const router = useRouter();
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });
  const activeStudy = portfolioStudies[activeIndex];

  const select = useCallback((requestedIndex: number, scrollToState = true) => {
    const next = (requestedIndex + portfolioStudies.length) % portfolioStudies.length;
    activeRef.current = next;
    setActiveIndex(next);
    setDragOffset(0);
    if (!scrollToState || !sceneRef.current) return;
    const scene = sceneRef.current;
    const top = window.scrollY + scene.getBoundingClientRect().top;
    const travel = Math.max(1, scene.offsetHeight - window.innerHeight);
    window.scrollTo({ top: top + travel * (next / (portfolioStudies.length - 1)), behavior: reduceMotion ? "auto" : "smooth" });
  }, [reduceMotion]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.max(0, Math.min(portfolioStudies.length - 1, Math.round(latest * (portfolioStudies.length - 1))));
    const direction = latest - scrollProgressRef.current;
    scrollProgressRef.current = latest;
    if (pointerRef.current) return;
    if (next !== activeRef.current && ((direction > 0 && next > activeRef.current) || (direction < 0 && next < activeRef.current))) select(next, false);
  });

  const openActive = () => router.push(`/work/${activeStudy.slug}`);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerRef.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, lastX: event.clientX, lastTime: performance.now(), velocity: 0 };
    setDragging(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.startX;
    const dy = event.clientY - pointer.startY;
    if (Math.abs(dy) > Math.abs(dx) + 10 && Math.abs(dy) > 14) { pointerRef.current = null; setDragging(false); setDragOffset(0); return; }
    if (Math.abs(dx) > 7) event.preventDefault();
    const now = performance.now();
    pointer.velocity = (event.clientX - pointer.lastX) / Math.max(1, now - pointer.lastTime);
    pointer.lastX = event.clientX;
    pointer.lastTime = now;
    setDragOffset(Math.max(-70, Math.min(70, dx)));
  };

  const finishPointer = (event?: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    pointerRef.current = null;
    setDragging(false);
    if (!pointer || (event && pointer.id !== event.pointerId)) return;
    const dx = (event?.clientX ?? pointer.lastX) - pointer.startX;
    const projected = dx + pointer.velocity * 120;
    if (Math.abs(projected) > 38) select(activeRef.current + (projected < 0 ? 1 : -1), false);
    else setDragOffset(0);
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); select(activeRef.current + 1, false); }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); select(activeRef.current - 1, false); }
    if (event.key === "Home") { event.preventDefault(); select(0, false); }
    if (event.key === "End") { event.preventDefault(); select(portfolioStudies.length - 1, false); }
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openActive(); }
  };

  return (
    <section id="selected-work" className={styles.section} data-portfolio-index={activeIndex} aria-labelledby="portfolio-title">
      <div ref={sceneRef} className={styles.scrollScene}>
        <div className={styles.stickyStage}>
          <Container className={styles.container}>
            <div className={styles.instrumentation}><span>03 / Selected work</span><span>{String(activeIndex + 1).padStart(2, "0")} / {String(portfolioStudies.length).padStart(2, "0")}</span></div>
            <div className={styles.orbitStage} tabIndex={0} role="group" aria-label="Project portfolio. Scroll, drag, or use arrow keys to select a project. Press Enter to open the selected project." onKeyDown={onKeyDown} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={finishPointer} onPointerCancel={() => finishPointer()} data-dragging={dragging}>
              <div className={styles.orbitTrace} aria-hidden="true" />
              {portfolioStudies.map((study, index) => {
                const delta = relativeIndex(index, activeIndex, portfolioStudies.length);
                const angle = delta * 52;
                const x = Math.sin((angle * Math.PI) / 180) * 43;
                const y = -Math.cos((angle * Math.PI) / 180) * 31 + 1;
                const isActive = index === activeIndex;
                return (
                  <motion.button key={study.slug} type="button" className={styles.tile} data-active={isActive} aria-label={isActive ? `Open ${study.client} project` : `Select ${study.client} project`} onClick={(event) => { event.stopPropagation(); if (isActive) openActive(); else select(index, false); }} animate={{ left: `${50 + x}%`, top: `${50 + y}%`, scale: isActive ? 1.12 : Math.max(.68, 1 - Math.abs(delta) * .13), opacity: Math.max(.3, 1 - Math.abs(delta) * .23), rotate: `${delta * 5}deg`, x: dragOffset * (isActive ? .16 : .06) }} transition={reduceMotion ? { duration: .18 } : { duration: dragging ? 0 : .62, ease: [0.22, 1, 0.36, 1] }}>
                    <span className={styles.tileMedia}><Image src={media[study.slug]} alt="" fill sizes="(max-width: 767px) 96px, 132px" className={styles.tileImage} draggable={false} /></span>
                    <span className={styles.tileName}>{study.client}</span>
                  </motion.button>
                );
              })}
              <div className={styles.centerReadout} aria-live="polite">
                <span className={styles.centerEyebrow}>Project Portfolio</span>
                <h2 id="portfolio-title">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.span
                      key={activeStudy.slug}
                      className={styles.projectName}
                      initial={reduceMotion ? { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" } : { opacity: 0, transform: "translateY(8px)", filter: "blur(3px)" }}
                      animate={{ opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(-8px)", filter: "blur(2px)" }}
                      transition={reduceMotion ? { duration: 0.16 } : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {activeStudy.client}
                    </motion.span>
                  </AnimatePresence>
                </h2>
                <small className={styles.centerCategory}>{portfolioDisciplines[activeStudy.slug] ?? activeStudy.category.split(",")[0]}</small>
              </div>
              <span className={styles.centerHint}>Drag · scroll · tap</span>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
