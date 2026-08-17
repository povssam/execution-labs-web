"use client";

import { useEffect, useRef, useState } from "react";

type ScrollSequenceOptions = {
  sectionId: string;
  count: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * Maps one section's travel through the viewport to a stable, ordered state.
 * The section owns one rAF scroll listener and uses equal progress ranges;
 * there are no competing observers or per-item activation thresholds.
 */
export function useScrollSequence({ sectionId, count }: ScrollSequenceOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const section = document.getElementById(sectionId);
      if (!section || count < 1) return;

      const bounds = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = bounds.top - viewportHeight * 0.7;
      const end = bounds.bottom - viewportHeight * 0.3;
      const progress = clamp(-start / Math.max(end - start, 1), 0, 1);
      // A fractional pixel at an exact quarter can land just below its
      // boundary, so keep the threshold mathematically stable in the browser.
      const nextIndex = Math.min(count - 1, Math.floor(progress * count + 0.001));

      if (nextIndex === activeIndexRef.current) return;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    };

    const scheduleUpdate = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [count, sectionId]);

  return activeIndex;
}
