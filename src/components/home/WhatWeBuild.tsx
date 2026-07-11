"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { capabilities, type Capability } from "@/lib/data";
import { cn } from "@/lib/utils";

const accents = [
  "rgba(169, 178, 255, 0.95)",
  "rgba(79, 215, 222, 0.9)",
  "rgba(238, 179, 96, 0.9)",
  "rgba(246, 104, 176, 0.82)",
  "rgba(174, 139, 255, 0.84)",
  "rgba(112, 214, 167, 0.8)",
];

function capabilityStyle(index: number, count: number) {
  const t = count <= 1 ? 0.5 : index / (count - 1);
  const left = 16 + t * 68;
  const top = 60 - Math.sin(t * Math.PI) * 18;
  return {
    left: `${left}%`,
    top: `${top}%`,
    transform: "translate(-50%, -50%)",
    "--orbit-accent": accents[index % accents.length],
    "--orbit-accent-soft": accents[index % accents.length].replace(/0\.[0-9]+\)$/, "0.16)"),
  } as CSSProperties & Record<string, string>;
}

function CapabilityCard({
  item,
  active,
  index,
  mobile = false,
  onActivate,
}: {
  item: Capability;
  active: boolean;
  index: number;
  mobile?: boolean;
  onActivate: () => void;
}) {
  const rootClass = mobile
    ? "selector-card premium-card relative snap-center overflow-hidden p-4 text-left"
    : "orbit-node premium-card absolute overflow-hidden p-4 text-left";

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-label={item.title}
      onClick={onActivate}
      onFocus={onActivate}
      onPointerEnter={onActivate}
      className={cn(rootClass, active && "premium-card--active selector-card--active orbit-node--active")}
      style={mobile ? ({ "--orbit-accent": accents[index % accents.length] } as CSSProperties & Record<string, string>) : capabilityStyle(index, capabilities.length)}
    >
      <span className="block text-[0.75rem] font-medium uppercase tracking-[0.18em] text-bone-faint">
        {item.title}
      </span>
      <p className="orbit-node__stance mt-2 text-sm leading-snug">{item.stance}</p>
    </button>
  );
}

function ActiveCapability({ item }: { item: Capability }) {
  return (
    <motion.div
      key={item.title}
      initial={{ opacity: 0, y: 10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.985 }}
      transition={{ duration: 0.28, ease: [0.2, 0.8, 0.3, 1] }}
      className="space-y-4"
    >
      <div className="space-y-3">
        <span className="block text-[0.72rem] font-medium uppercase tracking-[0.2em] text-bone-faint">
          {item.title}
        </span>
        <h3 className="text-balance text-2xl font-semibold leading-[1.06] text-bone sm:text-3xl">
          {item.stance}
        </h3>
        <p className="max-w-xl text-sm leading-relaxed text-bone-dim sm:text-base">
          {item.body}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {item.points.map((point) => (
          <span
            key={point}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-bone-dim"
          >
            {point}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function WhatWeBuild() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeCapability = capabilities[active];

  const move = (direction: number) => {
    setActive((current) => {
      const next = (current + direction + capabilities.length) % capabilities.length;
      return next;
    });
  };

  return (
    <section
      id="services"
      className="section-flow relative overflow-hidden py-20 sm:py-28"
    >
      <BrandAtmosphere intensity="soft" tone="calm" focus="right" />
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-bone sm:text-5xl sm:leading-[1.04]">
            What we build
          </h2>
        </div>

        <div className="mt-10 md:mt-14">
          <div className="hidden md:block">
            <div
              className="orbit-shell relative mx-auto h-[40rem] max-w-6xl"
              role="tablist"
              aria-label="Capabilities"
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                  event.preventDefault();
                  move(1);
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  move(-1);
                }
              }}
            >
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="orbit-path absolute inset-0 h-full w-full"
              >
                <defs>
                  <linearGradient id="orbit-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(169,178,255,0.04)" />
                    <stop offset="22%" stopColor="rgba(169,178,255,0.32)" />
                    <stop offset="50%" stopColor="rgba(79,215,222,0.28)" />
                    <stop offset="78%" stopColor="rgba(238,179,96,0.2)" />
                    <stop offset="100%" stopColor="rgba(169,178,255,0.04)" />
                  </linearGradient>
                </defs>
                <path
                  d="M16 62 C 28 24, 72 24, 84 62"
                  fill="none"
                  stroke="url(#orbit-line)"
                  strokeWidth="0.9"
                />
                <path
                  d="M16 62 C 28 24, 72 24, 84 62"
                  fill="none"
                  stroke="rgba(237,237,237,0.04)"
                  strokeWidth="5.2"
                />
              </svg>

              {capabilities.map((item, index) => (
                <CapabilityCard
                  key={item.title}
                  item={item}
                  index={index}
                  active={active === index}
                  onActivate={() => setActive(index)}
                />
              ))}

              <div className="absolute left-1/2 top-[56%] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 px-6">
                <motion.div
                  className="orbit-panel relative px-6 py-7 text-center sm:px-8 sm:py-9"
                  animate={
                    reduceMotion
                      ? { opacity: 1 }
                      : {
                          boxShadow:
                            "0 38px 130px -92px rgba(237, 237, 237, 0.5)",
                        }
                  }
                >
                  <AnimatePresence mode="wait">
                    <ActiveCapability key={activeCapability.title} item={activeCapability} />
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <div
              data-native-scroll
              className="selector-rail no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3"
              role="tablist"
              aria-label="Capabilities"
            >
              {capabilities.map((item, index) => (
                <CapabilityCard
                  key={item.title}
                  item={item}
                  index={index}
                  mobile
                  active={active === index}
                  onActivate={() => setActive(index)}
                />
              ))}
            </div>

            <div className="mt-4">
              <div className="premium-card relative px-5 py-6 text-left">
                <AnimatePresence mode="wait">
                  <ActiveCapability key={activeCapability.title} item={activeCapability} />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
