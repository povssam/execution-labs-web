import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { capabilities } from "@/lib/data";

/**
 * Services index. Editorial title plus descriptions only: no numbers, no
 * labels, no product-card chrome.
 */
export function WhatWeBuild() {
  return (
    <section
      id="services"
      className="section-flow relative overflow-hidden py-20 sm:py-28"
    >
      <BrandAtmosphere intensity="soft" tone="calm" focus="right" />
      <Container className="relative z-10">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-bone sm:text-5xl sm:leading-[1.05]">
            Services
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-12 border-t border-line/80 sm:mt-16 sm:grid-cols-2">
          {capabilities.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.05}>
              <div className="group flex h-full flex-col gap-3 border-b border-line/80 py-8 sm:py-10">
                <h3 className="text-2xl font-medium text-bone transition-colors duration-200 group-hover:text-white sm:text-3xl">
                  {item.title}
                </h3>
                <p className="max-w-lg text-sm leading-relaxed text-bone-dim sm:text-base">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
