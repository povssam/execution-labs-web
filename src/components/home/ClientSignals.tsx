"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { SystemVisual, type SystemVisualVariant } from "./SystemVisual";
import styles from "./Middle.module.css";

const outcomes: Array<{ title: string; visual: SystemVisualVariant }> = [
  { title: "Faster decisions", visual: "faster-decisions" },
  { title: "Clearer workflows", visual: "clearer-workflows" },
  { title: "Less follow-up", visual: "less-follow-up" },
  { title: "Ready to launch", visual: "ready-to-launch" },
];

export function ClientSignals() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const pointerStart = useRef<{ id: number; x: number; y: number } | null>(null);
  const active = outcomes[activeIndex];

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => Math.min(outcomes.length - 1, Math.max(0, current + direction)));
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      move(1);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    pointerStart.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.id !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaY) > Math.abs(deltaX) || Math.abs(deltaY) > 18) return;
    if (Math.abs(deltaX) > 42) {
      move(deltaX < 0 ? 1 : -1);
      return;
    }
    if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) move(1);
  };

  return (
    <section
      id="client-signals"
      className={`${styles.section} ${styles.outcomesSection} ${styles.lastSection} section-flow relative overflow-hidden`}
      data-outcome-index={activeIndex}
    >
      <div className={`${styles.container} relative z-10`}>
        <ul className="sr-only">
          {outcomes.map((outcome) => <li key={outcome.title}>{outcome.title}</li>)}
        </ul>

        <div className={styles.outcomesExperience}>
          <div
            className={styles.outcomesMedia}
            role="group"
            aria-label="Outcome visual. Tap, swipe, or use arrow keys to move through outcomes."
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              pointerStart.current = null;
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.visual}
                id="outcome-panel"
                className={styles.outcomePanel}
                data-outcome-panel
                initial={{ opacity: 0, x: reducedMotion ? 0 : 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reducedMotion ? 0 : -12 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <SystemVisual variant={active.visual} label={active.title} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.outcomeControl} aria-live="polite">
            <p className={styles.outcomeCount}>
              {String(activeIndex + 1).padStart(2, "0")} / 04
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.h2
                key={active.title}
                className={styles.outcomeTitle}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.32,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {active.title}
              </motion.h2>
            </AnimatePresence>

            <div className={styles.outcomeActions}>
              <button
                type="button"
                className={styles.outcomeAction}
                aria-label="Previous outcome"
                disabled={activeIndex === 0}
                onClick={() => move(-1)}
              >
                <ArrowLeft aria-hidden size={18} />
              </button>
              <button
                type="button"
                className={styles.outcomeAction}
                aria-label="Next outcome"
                disabled={activeIndex === outcomes.length - 1}
                onClick={() => move(1)}
              >
                <ArrowRight aria-hidden size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
