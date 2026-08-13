"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { process } from "@/lib/data";

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const index = Number((visible?.target as HTMLElement | undefined)?.dataset.stepIndex);
        if (Number.isFinite(index)) setActiveStep(index);
      },
      { rootMargin: "-28% 0px -46% 0px", threshold: [0, 0.35, 0.7] },
    );

    steps.current.forEach((step) => {
      if (step) observer.observe(step);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="process-editorial section-flow relative overflow-hidden">
      <BrandAtmosphere intensity="soft" tone="system" focus="right" />
      <Container className="relative z-10">
        <Reveal className="editorial-heading grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint lg:pb-2">
            Our process
          </p>
          <h2 className="text-3xl font-semibold leading-[1.04] text-bone sm:text-4xl lg:text-6xl">
            Brief to proof.
          </h2>
        </Reveal>

        <div
          className="process-route mt-10 sm:mt-12 lg:mt-16"
          style={{ "--process-progress": `${(activeStep / (process.length - 1)) * 100}%` } as CSSProperties}
        >
          <div className="process-route-line" aria-hidden="true" />
          <div className="process-route-grid">
            {process.map((step, index) => (
              <Reveal key={step.index} delay={index * 0.07} className="process-route-step">
                <article
                  ref={(element) => {
                    steps.current[index] = element;
                  }}
                  data-step-index={index}
                  data-active={index === activeStep}
                  data-past={index < activeStep}
                  tabIndex={0}
                  onMouseEnter={() => setActiveStep(index)}
                  onFocus={() => setActiveStep(index)}
                >
                  <div className="process-route-marker">
                    <span className="process-route-dot" />
                    <span className="font-mono text-[10px] tracking-[0.16em] text-bone-faint">
                      {step.index}
                    </span>
                  </div>
                  <h3 className="process-route-title text-2xl font-semibold leading-tight text-bone sm:text-3xl lg:text-4xl">
                    {step.title}
                  </h3>
                  <p className="process-route-copy max-w-[12rem] text-sm text-bone-dim sm:text-base">{step.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
