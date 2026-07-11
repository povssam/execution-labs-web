"use client";

import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { motion, useReducedMotion } from "framer-motion";
import { GraceVideo } from "@/components/work/GraceVideo";

export function MotionWork() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-flow scroll-reveal relative overflow-hidden py-20 sm:py-28">
      <BrandAtmosphere intensity="section" tone="media" focus="right" />
      <Container className="relative z-10">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.32, ease: [0.2, 0.8, 0.3, 1] }}
        >
          <h2 className="text-balance text-4xl font-semibold leading-[1.05] text-bone sm:text-5xl">
            Motion Work
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-bone-dim sm:text-lg">
            Grace shows identity, interface, and motion working as one calm
            product.
          </p>
        </motion.div>

        <motion.div
          className="media-reveal light-sweep mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl border border-bone/15 bg-charcoal/40 shadow-[0_35px_120px_-80px_rgba(237,237,237,0.55)] sm:mt-12 sm:rounded-2xl"
          initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.99 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.38, ease: [0.2, 0.8, 0.3, 1] }}
        >
          <div className="relative aspect-[16/10] bg-ink sm:aspect-video">
            <GraceVideo label="Grace Animation Final homepage proof" className="scale-[1.01]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-ink/10" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
