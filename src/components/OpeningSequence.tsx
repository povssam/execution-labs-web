"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./brand/Logo";

type OpeningPhase = "black" | "mark" | "wordmark" | "handoff";

const WORDMARK = "Execution Labs";
const WORDMARK_START_MS = 180;
const HANDOFF_START_MS = 620;
const HANDOFF_DURATION_MS = 360;
const HANDOFF_EXIT_MS = 140;
const HANDOFF_COMPLETE_MS = HANDOFF_START_MS + HANDOFF_DURATION_MS;
const OPENING_TOTAL_MS = HANDOFF_COMPLETE_MS + HANDOFF_EXIT_MS;

const openingStartScript = `
(function () {
  var root = document.documentElement;
  var body = document.body;
  var openingStart = performance.now();
  var previousRootOverflow = root.style.overflow;
  var previousBodyOverflow = body ? body.style.overflow : "";
  root.dataset.openingStart = String(openingStart);
  root.dataset.openingPreviousRootOverflow = previousRootOverflow;
  root.dataset.openingPreviousBodyOverflow = previousBodyOverflow;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.dataset.openingPhase = "complete";
    return;
  }

  root.dataset.openingPhase = "brand";
  root.style.overflow = "hidden";
  if (body) body.style.overflow = "hidden";

  window.setTimeout(function () {
    root.dataset.openingPhase = "wordmark";
  }, ${WORDMARK_START_MS});
  window.setTimeout(function () {
    root.dataset.openingPhase = "handoff";
  }, ${HANDOFF_START_MS});
  window.setTimeout(function () {
    root.dataset.openingPhase = "complete";
  }, ${HANDOFF_COMPLETE_MS});
  window.setTimeout(function () {
    root.style.overflow = root.dataset.openingPreviousRootOverflow || "";
    if (body) body.style.overflow = root.dataset.openingPreviousBodyOverflow || "";
  }, ${OPENING_TOTAL_MS});
})();
`;

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
    let frame = 0;
    let exitTimer = 0;
    const timers: number[] = [];
    const scriptedStart = Number(root.dataset.openingStart);
    const hasScriptedStart = Number.isFinite(scriptedStart);
    const openingStart = hasScriptedStart ? scriptedStart : performance.now();
    const previousRootOverflow = hasScriptedStart
      ? root.dataset.openingPreviousRootOverflow ?? ""
      : root.style.overflow;
    const previousBodyOverflow = hasScriptedStart
      ? root.dataset.openingPreviousBodyOverflow ?? ""
      : body.style.overflow;

    const release = () => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      root.dataset.openingPhase = "complete";
    };

    const finish = (remainingExit: number) => {
      root.dataset.openingPhase = "complete";
      exitTimer = window.setTimeout(() => {
        setMounted(false);
        release();
      }, Math.max(0, remainingExit));
    };

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

    if (!hasScriptedStart) {
      root.dataset.openingStart = String(openingStart);
      root.style.overflow = "hidden";
      body.style.overflow = "hidden";
    }

    frame = window.requestAnimationFrame(() => {
      const elapsed = Math.max(0, performance.now() - openingStart);
      const currentRootPhase = root.dataset.openingPhase;

      if (currentRootPhase === "complete" || elapsed >= HANDOFF_COMPLETE_MS) {
        setPhase("handoff");
        finish(OPENING_TOTAL_MS - elapsed);
        return;
      }

      if (currentRootPhase === "handoff" || elapsed >= HANDOFF_START_MS) {
        setPhase("handoff");
      } else if (currentRootPhase === "wordmark" || elapsed >= WORDMARK_START_MS) {
        setPhase("wordmark");
      } else {
        setPhase("mark");
      }

      const schedulePhase = (phase: OpeningPhase, deadline: number) => {
        const delay = Math.max(0, deadline - elapsed);
        timers.push(window.setTimeout(() => setPhase(phase), delay));
      };

      schedulePhase("wordmark", WORDMARK_START_MS);
      schedulePhase("handoff", HANDOFF_START_MS);
      timers.push(window.setTimeout(() => {
        finish(HANDOFF_EXIT_MS);
      }, Math.max(0, HANDOFF_COMPLETE_MS - elapsed)));
    });

    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach(window.clearTimeout);
      window.clearTimeout(exitTimer);
      release();
    };
  }, [reduceMotion]);

  return (
    <>
      <script
        type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: openingStartScript }}
      />
      {mounted && (
          <div
            className="opening-sequence"
            data-phase={phase}
            aria-hidden="true"
          >
            <div className="opening-sequence__stage">
              <div className="opening-sequence__brand flex items-center gap-2 text-sm font-semibold tracking-tight text-bone">
                <span className="opening-sequence__mark">
                  <Logo size={20} />
                </span>
                <span className="opening-sequence__wordmark" aria-label={WORDMARK}>{WORDMARK}</span>
              </div>
            </div>
          </div>
      )}
    </>
  );
}
