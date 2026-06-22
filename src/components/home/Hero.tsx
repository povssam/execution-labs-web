"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/Button";
import { OpsDashboard } from "./OpsDashboard";

const EASE = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: "6 wks", label: "Idea to MVP" },
  { value: "70%", label: "Less manual ops" },
  { value: "24h", label: "First reply" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(231,227,218,0.10),transparent_70%)] blur-2xl"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1.15fr] lg:gap-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-charcoal-2/40 px-4 py-1.5 font-mono text-xs text-bone-dim"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              AI agents and software, built fast
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
              className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight text-bone sm:text-6xl xl:text-7xl"
            >
              We build systems
              <br />
              that do the work.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-bone-dim"
            >
              Execution Labs builds AI agents and software that save companies
              time and money. From internal tools to full product systems, we
              move fast and the work holds up.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <ButtonLink href="/contact">
                Start a project
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </ButtonLink>
              <ButtonLink href="/work" variant="secondary">
                See work
              </ButtonLink>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl font-semibold tracking-tight text-bone">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-bone-faint">
                    {s.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            <OpsDashboard />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
