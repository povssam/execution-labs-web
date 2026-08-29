"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { process } from "@/lib/data";
import { Container } from "../ui/Container";
import styles from "./Process.module.css";

const details = [
  "Start at the pressure point.",
  "Choose the shortest useful route.",
  "Ship what people can judge.",
  "Sharpen what real use reveals.",
] as const;

const statements = [
  "Find the leak.",
  "Design the route.",
  "Ship the useful version.",
  "Test it in real use.",
] as const;

export function Process() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const activeStep = process[activeIndex];
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });
  const rawRotation = useTransform(scrollYProgress, [0, 1], [-12, 18]);
  const rawScale = useTransform(scrollYProgress, [0, 0.34, 0.67, 1], [1.31, 1.39, 1.3, 1.36]);
  const rawX = useTransform(scrollYProgress, [0, 0.34, 0.67, 1], ["0%", "-4%", "3%", "-2%"]);
  const rawY = useTransform(scrollYProgress, [0, 0.34, 0.67, 1], ["0%", "2%", "-3%", "1%"]);
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
              <span>03 / Execution protocol</span>
              <span>{String(activeIndex + 1).padStart(2, "0")} / 04</span>
            </div>

            <div className={styles.layout}>
              <div className={styles.lensWrap} aria-hidden="true">
                <motion.div className={styles.lens} style={{ rotate: reduceMotion ? activeIndex * 7 - 10 : rotation }}>
                  <motion.div className={styles.lensMedia} style={{ scale: reduceMotion ? 1.32 : scale, x: reduceMotion ? 0 : rawX, y: reduceMotion ? 0 : rawY }}>
                    <Image src="/brand/hero-glass.png" alt="" fill sizes="(max-width: 767px) 76vw, 42vw" className={styles.lensImage} draggable={false} />
                  </motion.div>
                  <div className={styles.lensShade} />
                </motion.div>
                <span className={styles.lensIndex}>{activeStep.index}</span>
              </div>

              <div className={styles.content}>
                <span className={styles.kicker}>One lens / four states</span>
                <motion.div key={activeStep.title} id="process-panel" role="tabpanel" aria-labelledby={`process-tab-${activeIndex}`} className={styles.activeState} initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0.18 : 0.42 }}>
                  <span>{activeIndex === 1 ? "System" : activeStep.title}</span>
                  <h2>{statements[activeIndex]}</h2>
                  <p>{details[activeIndex]}</p>
                </motion.div>

                <div className={styles.steps} role="tablist" aria-label="Process steps">
                  {process.map((step, index) => (
                    <button key={step.title} type="button" role="tab" id={`process-tab-${index}`} aria-controls="process-panel" aria-selected={index === activeIndex} tabIndex={index === activeIndex ? 0 : -1} data-active={index === activeIndex} onClick={() => setStep(index)} onKeyDown={(event) => onKeyDown(event, index)}>
                      <span>{step.index}</span>
                      <strong>{index === 1 ? "System" : step.title}</strong>
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
