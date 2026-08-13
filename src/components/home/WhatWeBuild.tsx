"use client";

import { useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { capabilities } from "@/lib/data";

export function WhatWeBuild() {
  const [activeCapability, setActiveCapability] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const pointerStart = useRef<{ id: number; x: number } | null>(null);
  const suppressClick = useRef(false);
  const active = capabilities[activeCapability];

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
    requestAnimationFrame(() => {
      tabs.current[next]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    });
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
      className="capabilities-editorial section-flow relative overflow-hidden"
    >
      <BrandAtmosphere intensity="soft" tone="system" focus="right" />
      <Container className="relative z-10">
        <Reveal className="editorial-heading capability-heading grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint lg:pb-2">
            What we build
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-[1.04] text-bone sm:text-4xl lg:text-5xl">
            Six capabilities. Built as one.
          </h2>
        </Reveal>

        <div className="capability-composition mt-10 sm:mt-12 lg:mt-16">
          <div
            role="tablist"
            aria-label="Capabilities"
            aria-orientation="vertical"
            className="capability-navigation no-scrollbar"
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
                  className="capability-nav-item group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone/40"
                  data-selected={selected}
                >
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
              <span>{active.title}</span>
              <span>
                {String(activeCapability + 1).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}
              </span>
            </div>
            <div className="capability-detail-primary">
              <h3 className="capability-detail-title text-3xl font-semibold leading-[1.04] text-bone sm:text-4xl lg:text-5xl">
                {active.stance}
              </h3>
              <p className="capability-detail-body text-base leading-relaxed text-bone-dim">
                {active.body}
              </p>
            </div>
            <div className="capability-proof">
              <div className="capability-points font-mono text-[10px] uppercase tracking-[0.12em] text-bone-faint sm:text-[11px]">
                {active.points.map((point, index) => (
                  <span key={point}>
                    <span className="mr-2 text-bone/25">0{index + 1}</span>{point}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
