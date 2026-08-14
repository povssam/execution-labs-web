"use client";

import { useEffect, useState } from "react";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { process } from "@/lib/data";

export function Process() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateActiveStep = () => {
      frame = 0;
      const section = document.getElementById("process");
      if (!section) return;

      const bounds = section.getBoundingClientRect();
      const start = bounds.top - window.innerHeight * 0.7;
      const end = bounds.bottom - window.innerHeight * 0.3;
      const progress = Math.min(1, Math.max(0, -start / Math.max(end - start, 1)));
      const nextStep = Math.min(process.length - 1, Math.round(progress * (process.length - 1)));

      setActiveStep((current) => (current === nextStep ? current : nextStep));
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveStep);
    };

    updateActiveStep();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="process" className="process-editorial section-flow relative overflow-hidden">
      <BrandAtmosphere intensity="soft" tone="system" focus="right" />
      <Container className="middle-container relative z-10">
        <div className="process-route">
          <div className="process-route-grid">
            {process.map((step, index) => (
              <Reveal key={step.index} delay={index * 0.07} className="process-route-step">
                <article
                  data-active={index === activeStep}
                  data-past={index < activeStep}
                >
                  <h3 className="process-route-title middle-step-title">
                    {step.title}
                  </h3>
                  <p className="process-route-copy middle-body">{step.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
