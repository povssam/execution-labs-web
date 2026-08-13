"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { capabilities } from "@/lib/data";

export function WhatWeBuild() {
  const [activeCapability, setActiveCapability] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = capabilities[activeCapability];

  const selectCapability = (index: number, focus = false) => {
    const next = (index + capabilities.length) % capabilities.length;
    setActiveCapability(next);
    if (focus) requestAnimationFrame(() => tabs.current[next]?.focus());
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
      className="capabilities-editorial section-flow relative overflow-hidden"
    >
      <BrandAtmosphere intensity="soft" tone="system" focus="right" />
      <Container className="relative z-10">
        <Reveal className="editorial-heading grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint lg:pb-2">
            What we build
          </p>
          <h2 className="max-w-4xl text-4xl font-semibold leading-[1.02] text-bone sm:text-5xl lg:text-6xl">
            Six capabilities. One system that holds up.
          </h2>
        </Reveal>

        <div className="capability-composition mt-16 lg:mt-24">
          <div
            role="tablist"
            aria-label="Capabilities"
            aria-orientation="vertical"
            className="capability-navigation no-scrollbar"
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
                  onClick={() => selectCapability(index)}
                  onFocus={() => setActiveCapability(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className="capability-nav-item group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone/40"
                  data-selected={selected}
                >
                  <span className="capability-nav-index font-mono text-[9px] text-bone-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="capability-nav-label text-base text-bone-dim sm:text-lg">
                    {capability.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            key={active.title}
            id="capability-panel"
            role="tabpanel"
            aria-labelledby={`capability-tab-${activeCapability}`}
            className="capability-detail"
          >
            <div className="capability-detail-meta font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
              <span>Active capability</span>
              <span>
                {String(activeCapability + 1).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}
              </span>
            </div>
            <h3 className="capability-detail-title text-5xl font-semibold leading-[0.94] tracking-tight text-bone sm:text-6xl lg:text-8xl">
              {active.title}
            </h3>
            <div className="capability-detail-copy grid gap-8 sm:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <p className="text-xl leading-snug text-bone sm:text-2xl">
                {active.stance}
              </p>
              <p className="max-w-lg text-base leading-relaxed text-bone-dim">
                {active.body}
              </p>
            </div>
            <div className="capability-points font-mono text-[10px] uppercase tracking-[0.12em] text-bone-faint sm:text-[11px]">
              {active.points.map((point, index) => (
                <span key={point}>
                  <span className="mr-2 text-bone/25">0{index + 1}</span>{point}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
