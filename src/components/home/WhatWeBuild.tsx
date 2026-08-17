"use client";

import { useEffect, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Reveal } from "../ui/Reveal";
import { GraceVideo } from "@/components/work/GraceVideo";
import { capabilities, caseStudies } from "@/lib/data";
import styles from "./Middle.module.css";

const capabilityProofs = [
  caseStudies[1],
  caseStudies[2],
  caseStudies[3],
  caseStudies[4],
  caseStudies[0],
  caseStudies[1],
];

export function WhatWeBuild() {
  const [activeCapability, setActiveCapability] = useState(2);
  const rail = useRef<HTMLDivElement | null>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const pointerStart = useRef<{ id: number; x: number } | null>(null);
  const suppressClick = useRef(false);
  const active = capabilities[activeCapability];
  const proof = capabilityProofs[activeCapability];

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
        <Reveal>
          <h2 className={styles.sectionHeading}>
            Six capabilities.<br />Built as one.
          </h2>
        </Reveal>

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
            key={active.title}
            id="capability-panel"
            role="tabpanel"
            aria-labelledby={`capability-tab-${activeCapability}`}
            className={styles.capabilityPanel}
          >
            <div>
              <p className={styles.capabilityName}>{active.title}</p>
              <h3 className={styles.display}>{active.stance}</h3>
              <div className={styles.proofWords}>
                {active.points.map((point) => <span key={point}>{point}</span>)}
              </div>
              <div className={styles.capabilityMedia} data-capability-proof>
                {activeCapability === 4 ? (
                  <GraceVideo
                    className={styles.capabilityVideo}
                    label="Grace motion-design capability proof"
                  />
                ) : (
                  <div className={styles.systemProof}>
                    <p className={styles.systemProofClient}>{proof.client}</p>
                    <p className={styles.systemProofArtifact}>{proof.artifact}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
