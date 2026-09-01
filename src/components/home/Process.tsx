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

type PrismState = {
  scale: number;
  x: string;
  y: string;
  rotate: number;
};

const prismStates: PrismState[] = [
  { scale: 1.04, x: "-4%", y: "1%", rotate: -2 },
  { scale: 1.08, x: "-1%", y: "-1%", rotate: -1 },
  { scale: 1.12, x: "2%", y: "-2%", rotate: 1 },
  { scale: 1.06, x: "3%", y: "0%", rotate: 2 },
];

export function Process() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const activeStep = process[activeIndex];
  const prismState = prismStates[activeIndex];
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });
  const rawRotation = useTransform(scrollYProgress, [0, 0.34, 0.67, 1], prismStates.map((state) => state.rotate));
  const rawScale = useTransform(scrollYProgress, [0, 0.34, 0.67, 1], prismStates.map((state) => state.scale));
  const rawX = useTransform(scrollYProgress, [0, 0.34, 0.67, 1], prismStates.map((state) => state.x));
  const rawY = useTransform(scrollYProgress, [0, 0.34, 0.67, 1], prismStates.map((state) => state.y));
  const rotation = useSpring(rawRotation, { stiffness: 82, damping: 26, mass: 0.8 });
  const scale = useSpring(rawScale, { stiffness: 76, damping: 25, mass: 0.82 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.max(0, Math.min(process.length - 1, Math.floor(latest * process.length)));
    setActiveIndex((current) => (current === next ? current : next));
  });

  const setStep = (requestedIndex: number) => {
    const next = Math.max(0, Math.min(process.length - 1, requestedIndex));
    setActiveIndex(next);
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
              <span>Execution protocol</span>
            </div>

            <div className={styles.layout}>
              <div className={styles.prismWrap} aria-hidden="true">
                <div className={styles.prismField} data-state={activeIndex}>
                  <motion.div className={styles.prismMedia} style={{ scale: reduceMotion ? prismState.scale : scale, x: reduceMotion ? prismState.x : rawX, y: reduceMotion ? prismState.y : rawY, rotate: reduceMotion ? prismState.rotate : rotation }}>
                    <Image src="/brand/hero-glass-light.png" alt="" fill sizes="(max-width: 767px) 124vw, 100vw" className={styles.prismImage} draggable={false} />
                  </motion.div>
                </div>
              </div>

              <div className={styles.content}>
                <motion.div key={activeStep.title} id="process-panel" role="tabpanel" aria-labelledby={`process-tab-${activeIndex}`} className={styles.activeState} initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0.18 : 0.42 }}>
                  <span>{activeStep.title}</span>
                  <h2>{statements[activeIndex]}</h2>
                </motion.div>

                <div className={styles.steps} role="tablist" aria-label="Process steps">
                  {process.map((step, index) => (
                    <button key={step.title} type="button" role="tab" id={`process-tab-${index}`} aria-controls="process-panel" aria-selected={index === activeIndex} tabIndex={index === activeIndex ? 0 : -1} data-active={index === activeIndex} onClick={() => setStep(index)} onKeyDown={(event) => onKeyDown(event, index)}>
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
