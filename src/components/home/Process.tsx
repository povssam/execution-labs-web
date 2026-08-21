"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useCallback, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { process } from "@/lib/data";
import { SystemVisual, type SystemVisualVariant } from "./SystemVisual";
import styles from "./Middle.module.css";

const processVisuals: SystemVisualVariant[] = [
  "brief",
  "system-map",
  "build",
  "proof",
];

const PROCESS_SCROLL_OFFSETS: ["start 70%", "end 30%"] = [
  "start 70%",
  "end 30%",
];
const PROCESS_PROGRESS_START = 0.7;
const PROCESS_PROGRESS_END = 0.3;

export function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const pointerStart = useRef<{ id: number; x: number } | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: PROCESS_SCROLL_OFFSETS,
  });
  const active = process[activeIndex];

  const updateActiveFromProgress = useCallback((progress: number) => {
    const boundedProgress = Math.min(1, Math.max(0, progress));
    const next = Math.min(
      process.length - 1,
      Math.floor(boundedProgress * process.length),
    );

    setActiveIndex((current) => (current === next ? current : next));
  }, []);

  useMotionValueEvent(scrollYProgress, "change", updateActiveFromProgress);

  const scrollToStep = useCallback(
    (index: number, focus = false) => {
      const section = sectionRef.current;
      if (!section) return;

      const next = (index + process.length) % process.length;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const progressStart = sectionTop - window.innerHeight * PROCESS_PROGRESS_START;
      const progressEnd =
        sectionTop + rect.height - window.innerHeight * PROCESS_PROGRESS_END;
      const targetProgress = (next + 0.5) / process.length;
      const targetTop = progressStart + (progressEnd - progressStart) * targetProgress;
      const shouldReduceMotion =
        reducedMotion === true ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });

      if (focus) requestAnimationFrame(() => tabs.current[next]?.focus());
    },
    [reducedMotion],
  );

  const selectStep = (index: number, focus = false) => {
    scrollToStep(index, focus);
  };

  const handleKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectStep(index + 1, true);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectStep(index - 1, true);
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectStep(0, true);
    }
    if (event.key === "End") {
      event.preventDefault();
      selectStep(process.length - 1, true);
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    pointerStart.current = { id: event.pointerId, x: event.clientX };
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.id !== event.pointerId) return;

    const delta = event.clientX - start.x;
    if (Math.abs(delta) < 42) return;
    selectStep(activeIndex + (delta < 0 ? 1 : -1));
  };

  return (
    <section
      ref={sectionRef}
      id="process"
      data-process-index={activeIndex}
      className={`${styles.section} ${styles.processSection} section-flow relative overflow-hidden`}
    >
      <div className={`${styles.container} relative z-10`}>
        <div className={styles.processExperience}>
          <div
            role="tablist"
            aria-label="Process steps"
            aria-orientation="vertical"
            className={styles.processNavigation}
          >
            {process.map((step, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={step.title}
                  ref={(element) => {
                    tabs.current[index] = element;
                  }}
                  id={`process-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="process-panel"
                  tabIndex={selected ? 0 : -1}
                  data-process-step
                  onClick={() => selectStep(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={`${styles.processStep} ${selected ? styles.processStepSelected : ""}`}
                >
                  <span className={styles.itemTitle}>{step.title}</span>
                  <span className={styles.itemCopy}>{step.body}</span>
                </button>
              );
            })}
          </div>

          <div
            className={styles.processMedia}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              pointerStart.current = null;
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.title}
                id="process-panel"
                role="tabpanel"
                aria-labelledby={`process-tab-${activeIndex}`}
                className={styles.processPanel}
                initial={{ opacity: 0, x: reducedMotion ? 0 : 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reducedMotion ? 0 : -12 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.38,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <SystemVisual
                  variant={processVisuals[activeIndex]}
                  label={`${active.title}: ${active.body}`}
                />
              </motion.div>
            </AnimatePresence>
            <p className="sr-only">Swipe or use the process buttons to change the visual.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
