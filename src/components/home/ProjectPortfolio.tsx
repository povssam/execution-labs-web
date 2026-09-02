"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { Container } from "../ui/Container";
import styles from "./ProjectPortfolio.module.css";

/**
 * One replaceable sample list keeps the radial composition independent from
 * the eventual client project media. The routes remain real while the
 * gallery is intentionally presented as a Gather-style visual field.
 */
const placeholderSamples = [
  { slug: "grace", src: "/brand/projects/gather-samples/sample-01.webp" },
  { slug: "media-scaling", src: "/brand/projects/gather-samples/sample-02.webp" },
  { slug: "dividends-total-returns", src: "/brand/projects/gather-samples/sample-03.jpeg" },
  { slug: "orbit-artist-group", src: "/brand/projects/gather-samples/sample-04.webp" },
  { slug: "soniq", src: "/brand/projects/gather-samples/sample-05.webp" },
  { slug: "grace", src: "/brand/projects/gather-samples/sample-06.webp" },
  { slug: "media-scaling", src: "/brand/projects/gather-samples/sample-07.webp" },
  { slug: "dividends-total-returns", src: "/brand/projects/gather-samples/sample-08.webp" },
  { slug: "orbit-artist-group", src: "/brand/projects/gather-samples/sample-09.webp" },
  { slug: "soniq", src: "/brand/projects/gather-samples/sample-10.webp" },
  { slug: "grace", src: "/brand/projects/gather-samples/sample-11.webp" },
] as const;

const ORBIT_SLOT_COUNT = 24;
const ORBIT_STEP = 360 / ORBIT_SLOT_COUNT;
const CARD_ROTATION_FACTOR = 0.24;

const orbitSamples = Array.from({ length: ORBIT_SLOT_COUNT }, (_, slot) => ({
  ...placeholderSamples[slot % placeholderSamples.length],
  slot,
  angle: slot * ORBIT_STEP,
}));

type PointerState = {
  id: number;
  startX: number;
  startY: number;
  lastX: number;
  lastTime: number;
  velocity: number;
  moved: boolean;
};

export function ProjectPortfolio() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef<PointerState | null>(null);
  const draggedRef = useRef(false);
  const activeRef = useRef(0);
  const scrollProgressRef = useRef(0);
  const rotorRotationRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotorRotation, setRotorRotation] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const router = useRouter();
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });

  const select = useCallback((requestedIndex: number, scrollToState = true) => {
    const next = ((requestedIndex % orbitSamples.length) + orbitSamples.length) % orbitSamples.length;
    const current = activeRef.current;
    let delta = next - current;

    // Keep each transition on the short side of the same physical rotor,
    // including when the arrow crosses the end of the sample list.
    if (delta > orbitSamples.length / 2) delta -= orbitSamples.length;
    if (delta < -orbitSamples.length / 2) delta += orbitSamples.length;

    const nextRotation = rotorRotationRef.current - delta * ORBIT_STEP;
    rotorRotationRef.current = nextRotation;
    activeRef.current = next;
    setActiveIndex(next);
    setRotorRotation(nextRotation);
    setDragOffset(0);

    if (!scrollToState || !sceneRef.current) return;

    const scene = sceneRef.current;
    const top = window.scrollY + scene.getBoundingClientRect().top;
    const travel = Math.max(1, scene.offsetHeight - window.innerHeight);
    const progress = next / (orbitSamples.length - 1);
    window.scrollTo({
      top: top + travel * progress,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [reduceMotion]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.max(0, Math.min(orbitSamples.length - 1, Math.round(latest * (orbitSamples.length - 1))));
    const direction = latest - scrollProgressRef.current;
    scrollProgressRef.current = latest;

    if (pointerRef.current) return;
    if (next !== activeRef.current && ((direction > 0 && next > activeRef.current) || (direction < 0 && next < activeRef.current))) {
      select(next, false);
    }
  });

  const openSample = useCallback((sample: (typeof orbitSamples)[number]) => {
    router.push(`/work/${sample.slug}`);
  }, [router]);

  const openFocusedSample = () => openSample(orbitSamples[activeRef.current]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
      moved: false,
    };
    setDragging(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;

    const dx = event.clientX - pointer.startX;
    const dy = event.clientY - pointer.startY;
    if (Math.abs(dy) > Math.abs(dx) + 10 && Math.abs(dy) > 14) {
      pointerRef.current = null;
      setDragging(false);
      setDragOffset(0);
      return;
    }

    if (Math.abs(dx) > 7) {
      event.preventDefault();
      pointer.moved = true;
    }

    const now = performance.now();
    pointer.velocity = (event.clientX - pointer.lastX) / Math.max(1, now - pointer.lastTime);
    pointer.lastX = event.clientX;
    pointer.lastTime = now;
    setDragOffset(Math.max(-82, Math.min(82, dx)));
  };

  const finishPointer = (event?: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    pointerRef.current = null;
    setDragging(false);
    if (!pointer || (event && pointer.id !== event.pointerId)) return;

    draggedRef.current = pointer.moved;
    if (pointer.moved) window.setTimeout(() => { draggedRef.current = false; }, 0);

    const dx = (event?.clientX ?? pointer.lastX) - pointer.startX;
    const projected = dx + pointer.velocity * 120;
    if (Math.abs(projected) > 38) {
      select(activeRef.current + (projected < 0 ? 1 : -1), false);
    } else {
      setDragOffset(0);
    }
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      select(activeRef.current + 1, false);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      select(activeRef.current - 1, false);
    }
    if (event.key === "Home") {
      event.preventDefault();
      select(0, false);
    }
    if (event.key === "End") {
      event.preventDefault();
      select(orbitSamples.length - 1, false);
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFocusedSample();
    }
  };

  const motionTransition = reduceMotion
    ? { duration: 0.16 }
    : dragging
      ? { duration: 0 }
      : { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section id="selected-work" className={styles.section} data-portfolio-index={activeIndex} aria-labelledby="portfolio-title">
      <div ref={sceneRef} className={styles.scrollScene}>
        <div className={styles.stickyStage}>
          <Container className={styles.container}>
            <div className={styles.instrumentation}>
              <span>03 / Selected work</span>
            </div>

            <div
              className={styles.orbitStage}
              tabIndex={0}
              role="group"
              aria-label="Project portfolio. Scroll, drag, or use arrow keys to move through the sample gallery. Press Enter to open the focused project."
              onKeyDown={onKeyDown}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={finishPointer}
              onPointerCancel={() => finishPointer()}
              data-dragging={dragging}
            >
              <motion.div
                className={styles.orbitRotor}
                animate={{ rotate: rotorRotation + dragOffset * 0.18 }}
                transition={motionTransition}
              >
                {orbitSamples.map((sample) => {
                  const worldAngle = ((sample.angle + rotorRotation + dragOffset * 0.18) * Math.PI) / 180;
                  const depth = (Math.cos(worldAngle) + 1) / 2;
                  const isFocal = sample.slot === activeIndex;
                  const tileScale = 0.82 + depth * 0.18 + (isFocal ? 0.04 : 0);
                  const tileOpacity = 0.42 + depth * 0.52;
                  const armStyle = { "--arm-angle": `${sample.angle}deg` } as CSSProperties;
                  const tileRotation = -(sample.angle + rotorRotation + dragOffset * 0.18) * (1 - CARD_ROTATION_FACTOR);

                  return (
                    <div key={`${sample.slug}-${sample.slot}`} className={styles.orbitArm} style={armStyle}>
                      <motion.div className={styles.tileUpright} animate={{ rotate: tileRotation }} transition={motionTransition}>
                        <motion.button
                          type="button"
                          className={styles.tile}
                          data-focal={isFocal}
                          aria-label={isFocal ? `Open ${sample.slug} project` : `Focus ${sample.slug} project sample`}
                          onClick={(event) => {
                            event.stopPropagation();
                            if (draggedRef.current) return;
                            if (isFocal) openSample(sample);
                            else select(sample.slot, false);
                          }}
                          animate={{ scale: tileScale, opacity: tileOpacity }}
                          transition={reduceMotion ? { duration: 0.16 } : { duration: dragging ? 0 : 0.52, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <span className={styles.tileMedia}>
                            <Image src={sample.src} alt="" fill sizes="(max-width: 767px) 76px, 112px" className={styles.tileImage} draggable={false} />
                          </span>
                        </motion.button>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>

              <div className={styles.centerReadout}>
                <h2 id="portfolio-title">Project Portfolio</h2>
                <p>Selected work from Execution Labs.</p>
                <button
                  type="button"
                  className={styles.centerAction}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    router.push("/work");
                  }}
                >
                  View work <span aria-hidden="true">↗</span>
                </button>
              </div>

              <button
                type="button"
                className={styles.nextButton}
                aria-label="Next sample"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  select(activeRef.current + 1, false);
                }}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
