"use client";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { process } from "@/lib/data";
import styles from "./Process.module.css";

const processSignals = [
  {
    route: "problem / context",
    detail: "A problem enters the system.",
  },
  {
    route: "agent / tool / handoff",
    detail: "Agents, tools, and handoffs find the useful path.",
  },
  {
    route: "input / interface / action",
    detail: "The smallest working version takes shape.",
  },
  {
    route: "use / feedback / result",
    detail: "The system returns a result and a next move.",
  },
] as const;

const routePoints = [
  { x: 42, y: 240 },
  { x: 242, y: 108 },
  { x: 450, y: 240 },
  { x: 710, y: 112 },
] as const;

const routePath = "M42 240 C138 240 144 108 242 108 S350 240 450 240 S590 112 710 112";

function RouteMap({ activeIndex, reducedMotion }: { activeIndex: number; reducedMotion: boolean }) {
  const progress = [0.16, 0.42, 0.68, 1][activeIndex];

  return (
    <div className={styles.routeField} data-reduced-motion={reducedMotion}>
      <div className={styles.routeFieldGrid} aria-hidden="true" />
      <div className={styles.routeFieldPrism} aria-hidden="true" />
      <svg className={styles.routeMap} viewBox="0 0 760 340" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="process-route-spectrum" x1="36" y1="240" x2="714" y2="108" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EDEDED" stopOpacity="0.72" />
            <stop offset="0.46" stopColor="#7FEEE8" stopOpacity="0.86" />
            <stop offset="0.78" stopColor="#B9A2FF" stopOpacity="0.82" />
            <stop offset="1" stopColor="#FFD09B" stopOpacity="0.82" />
          </linearGradient>
        </defs>
        <path d={routePath} pathLength="1" className={styles.routeBase} />
        <path
          d={routePath}
          pathLength="1"
          className={styles.routeActive}
          style={{ strokeDashoffset: 1 - progress }}
        />
        {routePoints.map((point, index) => (
          <g key={`${point.x}-${point.y}`} className={styles.routeNode} data-active={index <= activeIndex}>
            {index === activeIndex && <circle cx={point.x} cy={point.y} r="22" className={styles.routeHalo} />}
            <circle cx={point.x} cy={point.y} r={index === activeIndex ? 8 : 5} className={styles.routeDot} />
          </g>
        ))}
      </svg>
      <span className={styles.routeFieldLabel}>execution route / live readout</span>
      <span className={styles.routeFieldState}>{String(activeIndex + 1).padStart(2, "0")} / 04</span>
    </div>
  );
}

export function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const activeStep = process[activeIndex];
  const activeSignal = processSignals[activeIndex];

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
  };

  return (
    <section
      id="process"
      data-process-index={activeIndex}
      data-process-state={activeStep.title}
      className={`${styles.section} section-flow relative overflow-hidden`}
    >
      <div className={`${styles.container} relative z-10`}>
        <div className={styles.header}>
          <span>04 / Execution protocol</span>
          <span>Idea / system / product</span>
        </div>

        <div className={styles.layout}>
          <div className={styles.intro}>
            <span className={styles.eyebrow}>How the work moves</span>
            <h2>Clear input.<br />Useful output.</h2>
            <p>
              We find the leak, route the work, and make the next useful version real.
            </p>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span>Route / 01—04</span>
              <span>{activeSignal.route}</span>
            </div>

            <RouteMap activeIndex={activeIndex} reducedMotion={reducedMotion} />

            <div className={styles.stepRail} role="tablist" aria-label="Process steps" aria-orientation="horizontal">
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

            <div
              key={activeStep.title}
              id="process-panel"
              role="tabpanel"
              aria-labelledby={`process-tab-${activeIndex}`}
              className={styles.readout}
              data-reduced-motion={reducedMotion}
            >
              <div>
                <span className={styles.readoutIndex}>{activeStep.index}</span>
                <h3>{activeStep.title}</h3>
              </div>
              <div className={styles.readoutCopy}>
                <p>{activeStep.body}</p>
                <span>{activeSignal.detail}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
