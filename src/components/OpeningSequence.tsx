"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./brand/Logo";

type OpeningPhase = "black" | "mark" | "wordmark" | "handoff";

const easeOut = [0.23, 1, 0.32, 1] as const;
const WORDMARK = "Execution Labs";
const WORDMARK_START_MS = 180;
const HANDOFF_START_MS = 760;
const HANDOFF_DURATION_MS = 220;
const HANDOFF_EXIT_MS = 140;
const HANDOFF_COMPLETE_MS = HANDOFF_START_MS + HANDOFF_DURATION_MS;

/**
 * A first-load-only brand handoff. It lives in the root layout, so soft
 * navigations retain its completed state and never replay the opening.
 */
export function OpeningSequence() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<OpeningPhase>("black");
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    let frame = 0;
    let exitTimer = 0;
    const timers: number[] = [];

    const release = () => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      root.dataset.openingPhase = "complete";
    };

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";

    if (reduceMotion) {
      root.dataset.openingPhase = "handoff";
      frame = window.requestAnimationFrame(() => {
        release();
        setMounted(false);
      });
      return () => {
        window.cancelAnimationFrame(frame);
        release();
      };
    }

    frame = window.requestAnimationFrame(() => {
      root.dataset.openingPhase = "brand";
      setPhase("mark");
      timers.push(window.setTimeout(() => setPhase("wordmark"), WORDMARK_START_MS));
      timers.push(window.setTimeout(() => setPhase("handoff"), HANDOFF_START_MS));
      timers.push(window.setTimeout(() => {
        root.dataset.openingPhase = "handoff";
        setMounted(false);
        exitTimer = window.setTimeout(release, HANDOFF_EXIT_MS);
      }, HANDOFF_COMPLETE_MS));
    });

    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach(window.clearTimeout);
      window.clearTimeout(exitTimer);
      release();
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          className="opening-sequence"
          data-phase={phase}
          aria-hidden="true"
          exit={{ opacity: 0 }}
          transition={{ duration: HANDOFF_EXIT_MS / 1000, ease: easeOut }}
        >
          <div className="opening-sequence__stage">
            <div className="opening-sequence__brand flex items-center gap-2 text-sm font-semibold tracking-tight text-bone">
              <span className="opening-sequence__mark">
                <Logo size={20} />
              </span>
              <span className="opening-sequence__wordmark" aria-label={WORDMARK}>{WORDMARK}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
