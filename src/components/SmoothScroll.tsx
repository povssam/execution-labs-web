"use client";

import { useEffect } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const FINE_POINTER = "(pointer: fine)";
const DESKTOP_WIDTH = "(min-width: 768px)";

function shouldUseNativeScroll(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      "textarea, input, select, [data-native-scroll], [role='dialog'], [aria-modal='true']",
    ),
  );
}

export function SmoothScroll() {
  useEffect(() => {
    if (
      !window.matchMedia(FINE_POINTER).matches ||
      !window.matchMedia(DESKTOP_WIDTH).matches ||
      window.matchMedia(REDUCED_MOTION).matches
    ) {
      return;
    }

    let current = window.scrollY;
    let target = current;
    let frame = 0;
    let animating = false;

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const clamp = (value: number) => Math.min(Math.max(value, 0), maxScroll());

    const tick = () => {
      animating = true;
      current += (target - current) * 0.095;

      if (Math.abs(target - current) < 0.45) {
        current = target;
        window.scrollTo(0, current);
        animating = false;
        frame = 0;
        return;
      }

      window.scrollTo(0, current);
      frame = window.requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        document.body.style.overflow === "hidden" ||
        shouldUseNativeScroll(event.target)
      ) {
        return;
      }

      event.preventDefault();
      const unit =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? window.innerHeight
            : 1;

      target = clamp(target + event.deltaY * unit);
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    const syncNativeScroll = () => {
      if (animating) return;
      current = window.scrollY;
      target = current;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", syncNativeScroll, { passive: true });
    window.addEventListener("resize", syncNativeScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", syncNativeScroll);
      window.removeEventListener("resize", syncNativeScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
