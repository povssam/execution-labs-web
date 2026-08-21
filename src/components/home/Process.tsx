"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
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

const PROCESS_ENTRY_THRESHOLD = 0.35;
const PROCESS_RESET_THRESHOLD = 0.05;
const PROCESS_STEP_DURATION = 1000;

type ProcessSequencePhase =
  | "outside"
  | "ready"
  | "playing"
  | "complete"
  | "manual";

export function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sequenceId, setSequenceId] = useState(0);
  const reducedMotion = useReducedMotion();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const pointerStart = useRef<{ id: number; x: number } | null>(null);
  const activeIndexRef = useRef(0);
  const sequencePhaseRef = useRef<ProcessSequencePhase>("ready");
  const sequenceGenerationRef = useRef(0);
  const sequenceTimerRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(reducedMotion === true);
  const active = process[activeIndex];

  useEffect(() => {
    reducedMotionRef.current = reducedMotion === true;
  }, [reducedMotion]);

  const setActiveStep = useCallback((index: number) => {
    const next = Math.min(process.length - 1, Math.max(0, index));
    activeIndexRef.current = next;
    setActiveIndex(next);
  }, []);

  const clearSequenceTimer = useCallback(() => {
    if (sequenceTimerRef.current === null) return;
    window.clearTimeout(sequenceTimerRef.current);
    sequenceTimerRef.current = null;
  }, []);

  const stopSequence = useCallback(
    (phase: ProcessSequencePhase) => {
      sequenceGenerationRef.current += 1;
      clearSequenceTimer();
      sequencePhaseRef.current = phase;
    },
    [clearSequenceTimer],
  );

  const resetSequence = useCallback(() => {
    stopSequence("ready");
    setActiveStep(0);
  }, [setActiveStep, stopSequence]);

  const startSequence = useCallback(() => {
    if (sequencePhaseRef.current !== "ready") return;

    clearSequenceTimer();
    sequenceGenerationRef.current += 1;
    const generation = sequenceGenerationRef.current;
    sequencePhaseRef.current = "playing";
    // A fresh key remounts the existing SVG/CSS visual so its established
    // draw/settle animation is replayable after every genuine re-entry.
    setSequenceId((current) => current + 1);
    setActiveStep(0);

    if (
      reducedMotionRef.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      sequencePhaseRef.current = "complete";
      setActiveStep(process.length - 1);
      return;
    }

    const advance = () => {
      sequenceTimerRef.current = window.setTimeout(() => {
        sequenceTimerRef.current = null;
        if (
          sequenceGenerationRef.current !== generation ||
          sequencePhaseRef.current !== "playing"
        ) {
          return;
        }

        const next = activeIndexRef.current + 1;
        if (next >= process.length) {
          sequencePhaseRef.current = "complete";
          return;
        }

        setActiveStep(next);
        advance();
      }, PROCESS_STEP_DURATION);
    };

    advance();
  }, [clearSequenceTimer, setActiveStep]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headerHeight = document
      .querySelector<HTMLElement>(".site-header")
      ?.getBoundingClientRect().height ?? 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.intersectionRatio <= PROCESS_RESET_THRESHOLD) {
          resetSequence();
          return;
        }

        if (
          entry.intersectionRatio >= PROCESS_ENTRY_THRESHOLD &&
          sequencePhaseRef.current === "ready"
        ) {
          startSequence();
        }
      },
      {
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
        threshold: [0, PROCESS_RESET_THRESHOLD, PROCESS_ENTRY_THRESHOLD],
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      stopSequence("outside");
    };
  }, [resetSequence, startSequence, stopSequence]);

  const selectStep = (index: number, focus = false) => {
    const next = (index + process.length) % process.length;
    // An explicit control action wins over an entrance sequence, including
    // the small race where a browser scrolls a tab into view before clicking.
    stopSequence("manual");
    setActiveStep(next);
    if (focus) requestAnimationFrame(() => tabs.current[next]?.focus());
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
      data-process-run={sequenceId}
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
                key={`${active.title}-${sequenceId}`}
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
