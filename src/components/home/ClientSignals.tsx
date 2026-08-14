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
    if (window.matchMedia("(min-width: 768px)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const index = Number((visible?.target as HTMLElement | undefined)?.dataset.signalIndex);
        if (Number.isFinite(index)) setActiveSignal(index);
      },
      { rootMargin: "-30% 0px -48% 0px", threshold: [0, 0.4, 0.8] },
    );

    rows.current.forEach((row) => {
      if (row) observer.observe(row);
    });
    return () => observer.disconnect();
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
