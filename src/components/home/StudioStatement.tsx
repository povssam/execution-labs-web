"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { Container } from "../ui/Container";
import styles from "./StudioStatement.module.css";

export function StudioStatement() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const signalX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const signalY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="studio-statement-title">
      <Container className={styles.container}>
        <div className={styles.instrumentation}>
          <span>01 / Execution Labs</span>
          <span>System online</span>
        </div>
        <div className={styles.field} aria-hidden="true">
          <motion.div className={styles.refraction} style={{ x: reduceMotion ? "0%" : signalX, y: reduceMotion ? "0%" : signalY }} />
          <svg className={styles.paths} viewBox="0 0 1000 440" preserveAspectRatio="none">
            <path d="M-40 286 C164 318 244 108 462 198 S734 356 1040 134" />
            <path d="M-30 334 C178 360 304 168 514 246 S774 314 1040 198" />
            <circle cx="462" cy="198" r="4" />
            <circle cx="514" cy="246" r="3" />
          </svg>
          <span className={styles.fieldNode} />
        </div>
        <h2 id="studio-statement-title">Building exceptional digital experiences for visionaries and innovators around the world.</h2>
      </Container>
    </section>
  );
}
