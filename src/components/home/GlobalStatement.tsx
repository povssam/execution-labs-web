"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { Container } from "../ui/Container";
import styles from "./GlobalStatement.module.css";

export function GlobalStatement() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-2.2%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["-1.2%", "1.2%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.11]);

  return (
    <section ref={sectionRef} id="studio-statement" className={`${styles.section} section-flow relative overflow-hidden`}>
      <Container className={styles.container}>
        <div className={styles.frame}>
          <motion.div className={styles.lensMedia} style={{ x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y, scale: reduceMotion ? 1.06 : scale }}>
            <Image src="/brand/hero-glass.png" alt="" fill sizes="(max-width: 767px) 100vw, 1280px" className={styles.lensImage} draggable={false} />
          </motion.div>
          <div className={styles.lensShade} aria-hidden="true" />

          <div className={styles.instrumentation}>
            <span>01 / Execution Labs</span>
            <span>Built for real use</span>
          </div>

          <div className={styles.copy}>
            <h2>The work changes<br />when the system is clear.</h2>
            <p>Agents and software shaped around the work that needs to move.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
