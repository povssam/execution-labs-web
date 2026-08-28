"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "../ui/Container";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import styles from "./GlobalStatement.module.css";

const statement = "The work changes when the system is clear.";

const systemSequence = [
  { index: "01", label: "Signal", detail: "A problem enters the system." },
  { index: "02", label: "Route", detail: "Agents and tools find the useful path." },
  { index: "03", label: "Build", detail: "The smallest working version takes shape." },
  { index: "04", label: "Result", detail: "The work moves in real use." },
];

const characterDelays = Array.from(statement).reduce<number[]>((delays, character, index) => {
  const previousDelay = delays[index - 1] ?? 0.08;
  const previousCharacter = statement[index - 1] ?? "";
  const variation = ((index * 17) % 15) / 1000;
  const punctuationPause = /[.,!?;:]/.test(previousCharacter) ? 0.14 : 0;
  const spaceAdjustment = character === " " ? -0.01 : 0;
  delays.push(previousDelay + 0.035 + variation + punctuationPause + spaceAdjustment);
  return delays;
}, []);

let characterIndex = 0;
const statementWords = statement.split(" ");
const words = statementWords.map((word, wordIndex) => {
  const characters = Array.from(word).map((character) => ({
    character,
    index: characterIndex++,
  }));

  if (wordIndex < statementWords.length - 1) characterIndex += 1;
  return { word, characters };
});

const characterVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(2px)",
    y: "0.12em",
  },
  visible: ({ index, immediate }: { index: number; immediate: boolean }) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: immediate ? 0 : 0.3,
      delay: immediate ? 0 : characterDelays[index],
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function GlobalStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const entered = useInView(sectionRef, { once: true, amount: 0.4 });
  const reducedMotion = usePrefersReducedMotion();
  const visible = Boolean(reducedMotion || entered);

  return (
    <section
      ref={sectionRef}
      id="studio-statement"
      className={`${styles.section} section-flow relative overflow-hidden`}
    >
      <div className={styles.field} aria-hidden="true">
        <div className={styles.fieldGrid} />
        <Image
          src="/brand/hero-glass.png"
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 54vw"
          className={styles.lensImage}
          draggable={false}
        />
        <div className={styles.lensVignette} />
        <svg className={styles.lensRoute} viewBox="0 0 520 320" preserveAspectRatio="none">
          <path d="M18 160 C112 160 128 76 220 76 C310 76 324 236 404 236 C448 236 466 160 502 160" />
          <path d="M18 160 H502" />
          <circle cx="18" cy="160" r="4" />
          <circle cx="220" cy="76" r="5" />
          <circle cx="404" cy="236" r="5" />
          <circle cx="502" cy="160" r="6" />
        </svg>
        <span className={styles.lensCaption}>source / route / result</span>
      </div>

      <Container className={styles.container}>
        <div className={styles.sectionBar}>
          <span>01 / system reveal</span>
          <span>Execution Labs / operating model</span>
        </div>

        <div className={styles.layout}>
          <div className={styles.copyColumn}>
            <span className={styles.kicker}>From signal to system</span>
            <h2 className={styles.statementCopy} aria-label={statement}>
              <span aria-hidden="true">
                {words.map(({ word, characters }, wordIndex) => (
                  <Fragment key={`${word}-${wordIndex}`}>
                    <span className={styles.word} data-statement-word data-word={word}>
                      <span className={styles.characterLayer}>
                        {characters.map(({ character, index }) => (
                          <motion.span
                            key={`${character}-${index}`}
                            className={styles.character}
                            data-statement-character
                            custom={{ index, immediate: Boolean(reducedMotion) }}
                            initial={reducedMotion ? false : "hidden"}
                            animate={visible ? "visible" : "hidden"}
                            variants={characterVariants}
                          >
                            {character}
                          </motion.span>
                        ))}
                      </span>
                    </span>
                    {wordIndex < words.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </span>
            </h2>
            <p className={styles.supportingCopy}>
              Find the leak, map the workflow, and make the next useful version real.
            </p>
          </div>

          <div className={styles.sequence} aria-label="Execution Labs operating model">
            {systemSequence.map((item, index) => (
              <div key={item.index} className={styles.sequenceItem} data-sequence-state={index === 0 ? "source" : undefined}>
                <span className={styles.sequenceIndex}>{item.index}</span>
                <div className={styles.sequenceBody}>
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </div>
                <span className={styles.sequenceNode} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
