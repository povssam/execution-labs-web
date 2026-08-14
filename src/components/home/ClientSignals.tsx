"use client";

import { useEffect, useRef, useState } from "react";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const signals = [
  "Faster decisions",
  "Clearer workflows",
  "Less manual follow-up",
  "Launch-ready systems",
];

export function ClientSignals() {
  const [activeSignal, setActiveSignal] = useState(0);
  const rows = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    let frame = 0;

    const updateActiveSignal = () => {
      frame = 0;
      const section = document.getElementById("client-signals");
      if (!section) return;

      const bounds = section.getBoundingClientRect();
      const start = bounds.top - window.innerHeight * 0.7;
      const end = bounds.bottom - window.innerHeight * 0.3;
      const progress = Math.min(1, Math.max(0, -start / Math.max(end - start, 1)));
      const nextSignal = Math.min(signals.length - 1, Math.round(progress * (signals.length - 1)));

      setActiveSignal((current) => (current === nextSignal ? current : nextSignal));
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSignal);
    };

    updateActiveSignal();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="client-signals" className="signals-editorial section-flow relative overflow-hidden">
      <BrandAtmosphere intensity="soft" tone="proof" focus="left" />
      <Container className="relative z-10">
        <div className="signals-manifesto mt-10 sm:mt-12">
          {signals.map((signal, index) => (
            <Reveal key={signal} delay={index * 0.04}>
              <button
                ref={(element) => {
                  rows.current[index] = element;
                }}
                type="button"
                aria-pressed={index === activeSignal}
                data-signal-index={index}
                data-active={index === activeSignal}
                data-past={index < activeSignal}
                onClick={() => setActiveSignal(index)}
                onMouseEnter={() => setActiveSignal(index)}
                onFocus={() => setActiveSignal(index)}
                className="signal-line"
              >
                <span className="signal-copy text-3xl font-semibold leading-[0.98] tracking-tight text-bone sm:text-5xl lg:text-7xl">
                  {signal}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
