"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { Container } from "../ui/Container";
import styles from "./StudioStatement.module.css";

export function StudioStatement() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [replay, setReplay] = useState(0);
  const [inView, setInView] = useState(false);
  const wasInView = useRef(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const signalX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const signalY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const words = ["Building", "exceptional", "digital", "experiences", "for", "visionaries", "and", "innovators", "around", "the", "world."];

  useEffect(() => {
    let frame = 0;
    const updateViewportState = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const upperBoundary = window.innerHeight * 0.35;
      const lowerBoundary = window.innerHeight * 0.65;
      // The central 30% band gives one reliable enter/exit boundary in either direction.
      setInView(rect.top < lowerBoundary && rect.bottom > upperBoundary);
    };
    const queueUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateViewportState);
    };
    updateViewportState();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
    };
  }, []);

  useEffect(() => {
    if (inView && !wasInView.current) setReplay((current) => current + 1);
    wasInView.current = inView;
  }, [inView]);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="studio-statement-title" data-statement-cycle={replay} data-statement-in-view={inView}>
      <Container className={styles.container}>
        <div className={styles.instrumentation}>
          <span>01 / Execution Labs</span>
          <span>System online</span>
        </div>
        <div className={styles.field} aria-hidden="true">
          <motion.div className={styles.refraction} style={{ x: reduceMotion ? "0%" : signalX, y: reduceMotion ? "0%" : signalY }} />
          {!reduceMotion && <motion.span key={`signal-${replay}`} className={styles.signalPass} initial={{ opacity: 0, x: "-36%" }} animate={{ opacity: [0, .72, 0], x: ["-36%", "122%"] }} transition={{ duration: 1.08, delay: .06, ease: [0.22, 1, 0.36, 1] }} />}
          <svg className={styles.paths} viewBox="0 0 1000 440" preserveAspectRatio="none">
            <path d="M-40 286 C164 318 244 108 462 198 S734 356 1040 134" />
            <path d="M-30 334 C178 360 304 168 514 246 S774 314 1040 198" />
            <circle cx="462" cy="198" r="4" />
            <circle cx="514" cy="246" r="3" />
          </svg>
          <span className={styles.fieldNode} />
        </div>
        <h2 id="studio-statement-title" aria-label="Building exceptional digital experiences for visionaries and innovators around the world.">
          {words.map((word, index) => (
            <motion.span
              key={`${replay}-${word}-${index}`}
              className={styles.word}
              initial={reduceMotion ? false : { opacity: 0, y: "0.28em", letterSpacing: "-.02em", filter: "blur(4px)" }}
              animate={reduceMotion ? { opacity: 1, y: "0em", letterSpacing: "-.065em", filter: "blur(0px)" } : { opacity: 1, y: "0em", letterSpacing: "-.065em", filter: "blur(0px)" }}
              transition={reduceMotion ? { duration: 0 } : { duration: .5, delay: .13 + index * .055, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}{" "}
            </motion.span>
          ))}
        </h2>
      </Container>
    </section>
  );
}
