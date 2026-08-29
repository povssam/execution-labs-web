"use client";

import Image from "next/image";
import { useState } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";
import { process } from "@/lib/data";
import { Container } from "../ui/Container";
import styles from "./Process.module.css";

const processDetails = [
  "Start with the pressure point, not a deck.",
  "Design the shortest useful route through the work.",
  "Ship the version people can use and judge.",
  "Watch it run, then sharpen what matters.",
] as const;

const lensPositions = ["66% 54%", "54% 46%", "74% 58%", "46% 62%"] as const;

export function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = process[activeIndex];

  const setStep = (requestedIndex: number) => {
    setActiveIndex(Math.max(0, Math.min(process.length - 1, requestedIndex)));
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = index + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = index - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = process.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    setStep(nextIndex);
    window.requestAnimationFrame(() => {
      document.getElementById(`process-tab-${Math.max(0, Math.min(process.length - 1, nextIndex!))}`)?.focus();
    });
  };

  return (
    <section
      id="process"
      data-process-index={activeIndex}
      data-process-state={activeStep.title}
      className={`${styles.section} section-flow relative overflow-hidden`}
    >
      <Container className={styles.container}>
        <div className={styles.instrumentation}>
          <span>Execution protocol</span>
          <span>{String(activeIndex + 1).padStart(2, "0")} / 04</span>
        </div>

        <div className={styles.layout}>
          <div className={styles.lensWrap} aria-hidden="true">
            <div
              className={styles.lens}
              style={{ "--lens-rotation": `${activeIndex * 8 - 10}deg` } as CSSProperties}
            >
              <Image
                src="/brand/hero-glass.png"
                alt=""
                fill
                sizes="(max-width: 767px) 76vw, 42vw"
                className={styles.lensImage}
                style={{ objectPosition: lensPositions[activeIndex] }}
                draggable={false}
              />
              <div className={styles.lensShade} />
            </div>
            <span className={styles.lensIndex}>{activeStep.index}</span>
          </div>

          <div className={styles.content}>
            <span className={styles.kicker}>How the work moves</span>
            <div
              key={activeStep.title}
              id="process-panel"
              role="tabpanel"
              aria-labelledby={`process-tab-${activeIndex}`}
              className={styles.activeState}
            >
              <span>{activeStep.title}</span>
              <h2>{activeStep.body}</h2>
              <p>{processDetails[activeIndex]}</p>
            </div>

            <div className={styles.steps} role="tablist" aria-label="Process steps" aria-orientation="horizontal">
              {process.map((step, index) => (
                <button
                  key={step.title}
                  type="button"
                  role="tab"
                  id={`process-tab-${index}`}
                  aria-controls="process-panel"
                  aria-selected={index === activeIndex}
                  tabIndex={index === activeIndex ? 0 : -1}
                  data-active={index === activeIndex}
                  onClick={() => setStep(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  <span>{step.index}</span>
                  <strong>{step.title}</strong>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
