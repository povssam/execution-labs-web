"use client";

import { Fragment, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Container } from "../ui/Container";
import styles from "./GlobalStatement.module.css";

const statement =
  "Building exceptional digital experiences for visionaries and innovators around the world.";

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
  const reducedMotion = useReducedMotion();
  const visible = Boolean(reducedMotion || entered);

  return (
    <section
      ref={sectionRef}
      id="studio-statement"
      className="statement-section section-flow relative overflow-hidden"
    >
      <Container className="relative z-10">
        <p
          className="statement-copy mx-auto max-w-3xl text-center text-2xl font-medium leading-[1.18] text-bone sm:text-3xl lg:text-4xl"
          aria-label={statement}
        >
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
        </p>
      </Container>
    </section>
  );
}
