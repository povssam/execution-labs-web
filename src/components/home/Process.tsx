"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { process } from "@/lib/data";
import { Container } from "../ui/Container";
import styles from "./Process.module.css";

const statements = [
  "Find the leak.",
  "Design the workflow.",
  "Ship v1.",
  "Test in real use.",
] as const;

const systemPaths = [
  { route: "M16 56 H34 C43 56 43 34 56 34 S69 68 84 68", ghost: "M16 70 H38 C46 70 46 80 57 80 S70 47 85 47" },
  { route: "M16 34 H36 C44 34 45 56 56 56 H84", ghost: "M16 76 H38 C46 76 46 56 56 56 H84" },
  { route: "M16 56 H33 C42 56 42 32 54 32 S69 78 84 78", ghost: "M16 76 H38 C46 76 46 56 56 56 S69 36 84 36" },
  { route: "M16 36 H34 C44 36 44 56 56 56 S67 36 84 36", ghost: "M16 76 H34 C44 76 44 56 56 56 S67 76 84 76" },
] as const;

type LensState = {
  objectPosition: string;
  scale: number;
  x: string;
  y: string;
  focusX: string;
  focusY: string;
  arc: number;
};

const lensStates: LensState[] = [
  { objectPosition: "89% 54%", scale: 1.28, x: "-3%", y: "2%", focusX: "-12%", focusY: "10%", arc: -24 },
  { objectPosition: "82% 48%", scale: 1.34, x: "-1%", y: "-1%", focusX: "4%", focusY: "-7%", arc: -6 },
  { objectPosition: "76% 43%", scale: 1.38, x: "2%", y: "-2%", focusX: "16%", focusY: "-12%", arc: 14 },
  { objectPosition: "70% 48%", scale: 1.32, x: "0%", y: "1%", focusX: "8%", focusY: "8%", arc: 34 },
];

export function Process() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const activeStep = process[activeIndex];
  const lensState = lensStates[activeIndex];
  const systemPath = systemPaths[activeIndex];
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });
  const rawRotation = useTransform(scrollYProgress, [0, 0.34, 0.67, 1], [-14, -4, 8, 18]);
  const rawScale = useTransform(scrollYProgress, [0, 0.34, 0.67, 1], lensStates.map((state) => state.scale));
  const rawX = useTransform(scrollYProgress, [0, 0.34, 0.67, 1], lensStates.map((state) => state.x));
  const rawY = useTransform(scrollYProgress, [0, 0.34, 0.67, 1], lensStates.map((state) => state.y));
  const focusX = useTransform(scrollYProgress, [0, 0.34, 0.67, 1], lensStates.map((state) => state.focusX));
  const focusY = useTransform(scrollYProgress, [0, 0.34, 0.67, 1], lensStates.map((state) => state.focusY));
  const arcRotation = useTransform(scrollYProgress, [0, 0.34, 0.67, 1], lensStates.map((state) => state.arc));
  const rotation = useSpring(rawRotation, { stiffness: 82, damping: 26, mass: 0.8 });
  const scale = useSpring(rawScale, { stiffness: 76, damping: 25, mass: 0.82 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.max(0, Math.min(process.length - 1, Math.floor(latest * process.length)));
    setActiveIndex((current) => (current === next ? current : next));
  });

  const setStep = (requestedIndex: number) => {
    const next = Math.max(0, Math.min(process.length - 1, requestedIndex));
    setActiveIndex(next);
    const scene = sceneRef.current;
    if (!scene) return;
    const top = window.scrollY + scene.getBoundingClientRect().top;
    const travel = Math.max(1, scene.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: top + travel * (next / (process.length - 1)),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = process.length - 1;
    if (next === null) return;
    event.preventDefault();
    const bounded = Math.max(0, Math.min(process.length - 1, next));
    setStep(bounded);
    window.requestAnimationFrame(() => document.getElementById(`process-tab-${bounded}`)?.focus());
  };

  return (
    <section id="process" data-process-index={activeIndex} data-process-state={activeStep.title} className={`${styles.section} section-flow relative`}>
      <div ref={sceneRef} className={styles.scrollScene}>
        <div className={styles.stickyStage}>
          <Container className={styles.container}>
            <div className={styles.instrumentation}>
              <span>04 / Execution protocol</span>
              <span>{String(activeIndex + 1).padStart(2, "0")} / 04</span>
            </div>

            <div className={styles.layout}>
              <div className={styles.lensWrap} aria-hidden="true">
                <motion.div className={styles.lens} data-state={activeIndex} style={{ rotate: reduceMotion ? lensState.arc : rotation }}>
                  <motion.div className={styles.lensMedia} style={{ scale: reduceMotion ? lensState.scale : scale, x: reduceMotion ? lensState.x : rawX, y: reduceMotion ? lensState.y : rawY }}>
                    <Image src="/brand/hero-glass.png" alt="" fill sizes="(max-width: 767px) 76vw, 42vw" className={styles.lensImage} style={{ objectPosition: lensState.objectPosition }} draggable={false} />
                  </motion.div>
                  <motion.span className={styles.lensArc} style={{ rotate: reduceMotion ? lensState.arc : arcRotation }} />
                  <motion.span className={styles.lensFocus} style={{ x: reduceMotion ? lensState.focusX : focusX, y: reduceMotion ? lensState.focusY : focusY }} />
                  <svg className={styles.lensSystem} viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.path className={styles.systemRoute} d={systemPath.route} initial={false} animate={{ pathLength: 1 }} transition={{ duration: reduceMotion ? .18 : .55, ease: [0.22, 1, 0.36, 1] }} />
                    <motion.path className={styles.systemGhost} d={systemPath.ghost} initial={false} animate={{ pathLength: 1 }} transition={{ duration: reduceMotion ? .18 : .55, ease: [0.22, 1, 0.36, 1] }} />
                    <motion.circle className={styles.systemHub} cx="56" cy="56" r="4.2" animate={{ scale: activeIndex === 3 ? 1.18 : 1, opacity: 1 }} transition={{ duration: reduceMotion ? .18 : .4 }} />
                    {!reduceMotion && <motion.circle className={styles.systemSignal} r="2.1" animate={activeIndex === 0 ? { cx: [16, 34, 56, 84], cy: [56, 56, 34, 68] } : activeIndex === 1 ? { cx: [16, 36, 56, 84], cy: [34, 34, 56, 56] } : activeIndex === 2 ? { cx: [16, 33, 54, 84], cy: [56, 56, 32, 78] } : { cx: [16, 34, 56, 84], cy: [36, 36, 56, 36] }} transition={{ duration: 1.25, ease: [0.77, 0, 0.175, 1], repeat: 0 }} />}
                  </svg>
                  <div className={styles.lensShade} />
                </motion.div>
                <span className={styles.lensIndex}>{activeStep.index}</span>
              </div>

              <div className={styles.content}>
                <motion.div key={activeStep.title} id="process-panel" role="tabpanel" aria-labelledby={`process-tab-${activeIndex}`} className={styles.activeState} initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0.18 : 0.42 }}>
                  <span>{activeStep.title}</span>
                  <h2>{statements[activeIndex]}</h2>
                </motion.div>

                <div className={styles.steps} role="tablist" aria-label="Process steps">
                  {process.map((step, index) => (
                    <button key={step.title} type="button" role="tab" id={`process-tab-${index}`} aria-controls="process-panel" aria-selected={index === activeIndex} tabIndex={index === activeIndex ? 0 : -1} data-active={index === activeIndex} onClick={() => setStep(index)} onKeyDown={(event) => onKeyDown(event, index)}>
                      <span>{step.index}</span>
                      <strong>{step.title}</strong>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
