import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { capabilities } from "@/lib/data";

export function WhatWeBuild() {
  return (
    <section id="what-we-build" className="section-flow relative overflow-hidden py-20 sm:py-28">
      <BrandAtmosphere intensity="soft" tone="calm" focus="right" />
      <Container className="relative z-10">
        <SectionHeading
          label="What we build"
          title="Four ways we turn a brief into a system"
        />

        <div className="mt-10 border-t border-line sm:mt-12">
          {capabilities.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-b border-line py-6 transition-colors duration-200 hover:border-bone/25 sm:grid-cols-[4rem_1fr_auto] sm:gap-x-8 sm:py-8">
                <span className="font-mono text-xs text-bone-faint transition-colors duration-200 group-hover:text-bone-dim">
                  0{i + 1}
                </span>
                <h3 className="text-2xl font-medium text-bone transition-transform duration-200 group-hover:translate-x-1 sm:text-3xl">
                  {item.title}
                </h3>
                <p className="col-start-2 mt-2 max-w-md text-sm leading-relaxed text-bone-dim sm:col-start-3 sm:mt-0 sm:text-right">
                  {item.stance}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </Container>
    </section>
  );
}
