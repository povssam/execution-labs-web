"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { SystemVisual, type SystemVisualVariant } from "./SystemVisual";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { capabilities } from "@/lib/data";
import styles from "./Middle.module.css";

const capabilityVisuals: SystemVisualVariant[] = [
  "ai-agents",
  "internal-tools",
  "mvp-software",
  "product-systems",
  "motion-design",
  "automation",
];

export function WhatWeBuild() {
  const [activeCapability, setActiveCapability] = useState(4);
  const reducedMotion = usePrefersReducedMotion();
  const rail = useRef<HTMLDivElement | null>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const pointerStart = useRef<{ id: number; x: number } | null>(null);
  const suppressClick = useRef(false);
  const active = capabilities[activeCapability];
  const visual = capabilityVisuals[activeCapability];

  useEffect(() => {
    const tab = tabs.current[activeCapability];
    const viewport = rail.current;
    if (!tab || !viewport) return;

    window.requestAnimationFrame(() => {
      const left = tab.offsetLeft - (viewport.clientWidth - tab.offsetWidth) / 2;
      viewport.scrollTo({
        left: Math.max(0, left),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
  }, [activeCapability]);

  const selectCapability = (index: number, focus = false) => {
    const next = (index + capabilities.length) % capabilities.length;
    setActiveCapability(next);
    if (focus) requestAnimationFrame(() => tabs.current[next]?.focus());
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    pointerStart.current = { id: event.pointerId, x: event.clientX };
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    if (!start || start.id !== event.pointerId) return;

    const delta = event.clientX - start.x;
    pointerStart.current = null;
    if (Math.abs(delta) < 40) return;

    suppressClick.current = true;
    const next = (activeCapability + (delta < 0 ? 1 : -1) + capabilities.length) % capabilities.length;
    selectCapability(next);
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  };

  const handleKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectCapability(index + 1, true);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectCapability(index - 1, true);
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectCapability(0, true);
    }
    if (event.key === "End") {
      event.preventDefault();
      selectCapability(capabilities.length - 1, true);
    }
  };

  return (
    <section
      id="what-we-build"
      className={`${styles.section} ${styles.firstSection} section-flow relative overflow-hidden`}
    >
      <BrandAtmosphere intensity="soft" tone="system" focus="right" />
      <div className={`${styles.container} relative z-10`}>
        <div className={styles.capabilityLayout}>
          <div className={styles.selectorViewport}>
            <div
              role="tablist"
              aria-label="Capabilities"
              aria-orientation="horizontal"
              className={`${styles.selectorRail} no-scrollbar`}
              ref={rail}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => {
                pointerStart.current = null;
              }}
            >
              {capabilities.map((capability, index) => {
                const selected = index === activeCapability;
                return (
                  <button
                    key={capability.title}
                    ref={(element) => {
                      tabs.current[index] = element;
                    }}
                    id={`capability-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="capability-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => {
                      if (!suppressClick.current) selectCapability(index);
                    }}
                    onFocus={() => setActiveCapability(index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    className={`${styles.selectorItem} ${selected ? styles.selected : ""}`}
                    data-selected={selected}
                  >
                    {capability.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={styles.capabilityPanelFrame}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.title}
                id="capability-panel"
                role="tabpanel"
                aria-labelledby={`capability-tab-${activeCapability}`}
                className={styles.capabilityPanel}
                data-capability-transition-unit
                initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
                transition={{ duration: reducedMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.capabilityLead}>
                  <h3 className={styles.capabilityStatement}>{active.stance}</h3>
                  <div className={styles.proofWords}>
                    {active.points.map((point) => <span key={point}>{point}</span>)}
                  </div>
                </div>

                <div className={styles.capabilityMedia} data-capability-proof>
                  <SystemVisual
                    variant={visual}
                    label={`${active.title}: ${active.stance}`}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
