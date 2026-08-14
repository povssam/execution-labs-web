import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { BrandAtmosphere } from "@/components/BrandAtmosphere";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CtaButtons } from "@/components/ui/CtaButtons";
import { FinalCTA } from "@/components/home/FinalCTA";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { Process } from "@/components/home/Process";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services | Execution Labs",
  description:
    "What Execution Labs builds: AI agents, internal tools, MVP software, and product systems that save time and protect budget.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-16 sm:pt-48 sm:pb-20">
        <BrandAtmosphere intensity="section" />
        <Container className="relative z-10">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone-faint">
              Services
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-bone sm:text-6xl">
              Build the system that fixes the cost
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg text-bone-dim">
              Pick the layer. We scope, ship, and prove it in use.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <CtaButtons className="mt-9" />
          </Reveal>
        </Container>
      </section>

      <WhatWeBuild />

      <Process />

      <section id="faq" className="services-faq section-flow relative overflow-hidden">
        <BrandAtmosphere intensity="soft" />
        <Container className="relative z-10">
          <Reveal className="services-faq-heading">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint">
              FAQ
            </span>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.04] text-bone sm:text-4xl lg:text-6xl">
              Questions clients ask first.
            </h2>
          </Reveal>
          <div className="services-faq-list">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={(i % 3) * 0.04}>
                <details className="services-faq-item group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-bone transition-colors hover:text-white">
                    {faq.q}
                    <Plus
                      size={18}
                      className="shrink-0 text-bone-faint transition-transform duration-200 group-open:rotate-45"
                    />
                  </summary>
                  <p className="services-faq-answer text-sm leading-relaxed text-bone-dim">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
