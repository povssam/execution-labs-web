"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { Container } from "../ui/Container";
import styles from "./StudioStatement.module.css";

const statementWords = [
  "Building",
  "exceptional",
  "digital",
  "experiences",
  "for",
  "visionaries",
  "and",
  "innovators",
  "around",
  "the",
  "world.",
];

const resolveEase = [0.23, 1, 0.32, 1] as const;

const letterVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(2px)",
    transform: "translate3d(0, 0.08em, 0)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transform: "translate3d(0, 0, 0)",
  },
};

const refractionVariants = {
  hidden: {
    opacity: 0,
    transform: "translate3d(-5%, 3%, 0) scale(1.02)",
  },
  visible: {
    opacity: [0, 0.58, 0.04],
    transform: [
      "translate3d(-5%, 3%, 0) scale(1.02)",
      "translate3d(0, 0, 0) scale(1)",
      "translate3d(7%, -2%, 0) scale(0.99)",
    ],
  },
};

export function StudioStatement() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [presence, setPresence] = useState({ inView: false, replay: 0 });
  const { inView, replay } = presence;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateViewportState = () => {
      const rect = section.getBoundingClientRect();
      setPresence((current) => {
        const nextInView = current.inView
          ? rect.top < window.innerHeight * 0.82 && rect.bottom > window.innerHeight * 0.18
          : rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
        if (current.inView === nextInView) return current;
        return {
          inView: nextInView,
          replay: nextInView ? current.replay + 1 : current.replay,
        };
      });
    };

    // Enter through the central band, then stay armed until the section is
    // clearly gone. The wider exit band prevents boundary flicker while
    // scrolling back and forth on iOS WebKit.
    updateViewportState();
    window.addEventListener("scroll", updateViewportState, { passive: true });
    window.addEventListener("resize", updateViewportState);

    return () => {
      window.removeEventListener("scroll", updateViewportState);
      window.removeEventListener("resize", updateViewportState);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="studio-statement-title"
      data-statement-cycle={replay}
      data-statement-in-view={inView}
      data-statement-visible={reduceMotion || inView}
    >
      <Container className={styles.container}>
        <div className={styles.field} aria-hidden="true">
          <motion.div
            key={`refraction-${replay}`}
            className={styles.refraction}
            variants={refractionVariants}
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? "hidden" : inView ? "visible" : "hidden"}
            transition={
              reduceMotion || !inView
                ? { duration: 0 }
                : { duration: 1.2, delay: 0.05, ease: resolveEase, times: [0, 0.55, 1] }
            }
          />
        </div>
        <h2
          id="studio-statement-title"
          aria-label="Building exceptional digital experiences for visionaries and innovators around the world."
        >
          {statementWords.map((word, wordIndex) => (
            <span key={`${replay}-${word}-${wordIndex}`} className={styles.word} aria-hidden="true">
              {[...word].map((letter, letterIndex) => {
                const offset = statementWords.slice(0, wordIndex).join("").length + letterIndex;
                return (
                  <motion.span
                    key={`${replay}-${offset}`}
                    className={styles.letter}
                    variants={letterVariants}
                    initial={reduceMotion ? false : "hidden"}
                    animate={reduceMotion || inView ? "visible" : "hidden"}
                    transition={
                      reduceMotion || !inView
                        ? { duration: 0 }
                        : {
                            duration: 0.24,
                            delay: 0.05 + offset * 0.0105,
                            ease: resolveEase,
                          }
                    }
                  >
                    {letter}
                  </motion.span>
                );
              })}
              {wordIndex < statementWords.length - 1 ? " " : null}
            </span>
          ))}
        </h2>
      </Container>
    </section>
  );
}
