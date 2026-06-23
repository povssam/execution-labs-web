"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-triggered reveals. Adds `.in` to `.reveal` elements as they enter the
 * viewport. Safety: content is visible by default (CSS only hides `.reveal`
 * when the `.js` class is present AND motion is allowed), and a timeout
 * fallback force-reveals everything so nothing can stay hidden.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)"),
    );

    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((e) => io.observe(e));

    // Guarantee visibility even if the observer never fires.
    const fallback = setTimeout(
      () => els.forEach((e) => e.classList.add("in")),
      1600,
    );

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [pathname]);

  return null;
}
