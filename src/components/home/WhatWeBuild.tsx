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
  const [activeCapability, setActiveCapability] = useState(2);
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
      <Container className="middle-container relative z-10">
        <Reveal className="capability-heading">
          <h2 className="middle-section-heading max-w-3xl">
            Six capabilities. Built as one.
          </h2>
        </Reveal>

        <div className="capability-composition">
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
                  <span className="capability-nav-label">
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
            <div className="capability-detail-primary">
              <h3 className="capability-detail-title middle-display">
                {active.stance}
              </h3>
            </div>
            <div className="capability-proof">
              <div className="capability-system-field" aria-hidden="true">
                <span className="capability-system-axis" />
                <span className="capability-system-node capability-system-node--one" />
                <span className="capability-system-node capability-system-node--two" />
                <span className="capability-system-node capability-system-node--three" />
              </div>
              <div className="capability-points">
                {active.points.map((point) => (
                  <span key={point}>
                    {point}
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
