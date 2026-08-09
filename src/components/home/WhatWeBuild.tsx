"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
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
    <section id="what-we-build" className="section-flow relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <BrandAtmosphere intensity="soft" tone="system" focus="right" />
      <Container className="relative z-10">
        <Reveal className="grid gap-6 border-b border-line pb-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint">
            What we build
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-[1.08] text-bone sm:text-5xl">
            Six capabilities. One system that holds up.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div
            key={active.title}
            id="capability-panel"
            role="tabpanel"
            aria-labelledby={`capability-tab-${activeCapability}`}
            className="capability-detail min-h-[25rem] lg:min-h-[32rem]"
          >
            <div className="flex items-start justify-between gap-6">
              <span className="font-mono text-xs tracking-[0.16em] text-bone-faint">
                {String(activeCapability + 1).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}
              </span>
              <ArrowUpRight className="text-bone-faint" size={20} strokeWidth={1.4} />
            </div>
            <h3 className="mt-12 max-w-3xl text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.045em] text-bone">
              {active.title}
            </h3>
            <div className="mt-12 grid gap-7 border-t border-line pt-7 sm:grid-cols-2">
              <p className="text-xl leading-snug text-bone sm:text-2xl">
                {active.stance}
              </p>
              <p className="max-w-lg text-base leading-relaxed text-bone-dim">
                {active.body}
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-line pt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-bone-faint sm:text-[11px]">
              {active.points.map((point) => (
                <span key={point}>{point}</span>
              ))}
            </div>
          </div>

          <div role="tablist" aria-label="Capabilities" aria-orientation="vertical">
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
                  onMouseEnter={() => setActiveCapability(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className="capability-nav-item group grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-t border-line py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-bone/35"
                  data-selected={selected}
                >
                  <span className="font-mono text-[10px] text-bone-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base text-bone-dim transition-[color,transform] duration-300 group-hover:text-bone sm:text-lg">
                    {capability.title}
                  </span>
                  <span className="capability-nav-mark h-1.5 w-1.5 rounded-full bg-bone" />
                </button>
              );
            })}
            <div className="border-t border-line" />
          </div>
        </div>
      </Container>
    </section>
  );
}
