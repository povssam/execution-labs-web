import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { capabilities } from "@/lib/data";

/**
 * Services index. Large centered headline, then a two-column grid of real
 * capabilities on desktop that stacks on mobile. Editorial treatment only:
 * number, title, stance, body. No icons, no pills, no fake dashboards.
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
          <span className="flex items-center gap-3">
            <span className="flow-line" aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-bone-faint">
              What we build
            </span>
            <span className="flow-line rotate-180" aria-hidden />
          </span>
          <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-bone sm:text-5xl sm:leading-[1.05]">
            Six capabilities. One system that holds up.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-16 sm:grid-cols-2">
          {capabilities.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.05}>
              <div className="group flex h-full flex-col gap-3 bg-ink px-6 py-8 transition-colors duration-200 hover:bg-charcoal/40 sm:px-9 sm:py-10">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-bone-faint transition-colors duration-200 group-hover:text-bone-dim">
                    0{i + 1}
                  </span>
                  <h3 className="text-2xl font-medium text-bone transition-transform duration-200 group-hover:translate-x-1 sm:text-3xl">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm font-medium text-bone/90 sm:text-base">
                  {item.stance}
                </p>
                <p className="max-w-md text-sm leading-relaxed text-bone-dim">
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
