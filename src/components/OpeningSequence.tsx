"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type OpeningPhase = "black" | "mark" | "wordmark" | "handoff";

const wordmark = "EXECUTION LABS".split("");
const easeOut = [0.23, 1, 0.32, 1] as const;

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
    const timers: number[] = [];

    const release = () => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      delete root.dataset.openingPhase;
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
    });
    timers.push(window.setTimeout(() => setPhase("wordmark"), 430));
    timers.push(window.setTimeout(() => {
      root.dataset.openingPhase = "handoff";
      setPhase("handoff");
    }, 820));
    timers.push(window.setTimeout(() => {
      release();
      setMounted(false);
    }, 1320));

    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach(window.clearTimeout);
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
          transition={{ duration: 0.16, ease: easeOut }}
        >
          <div className="opening-sequence__brand">
            <span className="opening-sequence__mark">
              <span className="opening-sequence__prism" />
              <span className="opening-sequence__fragment opening-sequence__fragment--top" />
              <span className="opening-sequence__fragment opening-sequence__fragment--middle" />
              <span className="opening-sequence__fragment opening-sequence__fragment--bottom" />
            </span>
            <span className="opening-sequence__wordmark">
              {wordmark.map((character, index) => (
                <span
                  className="opening-sequence__letter"
                  key={`${character}-${index}`}
                  style={{ "--opening-letter-index": index } as React.CSSProperties}
                >
                  {character === " " ? "\u00a0" : character}
                </span>
              ))}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
