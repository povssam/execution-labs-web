import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SectionGlow } from "../ui/SectionGlow";
import { capabilities } from "@/lib/data";
import { gradient } from "@/lib/brand";

export function WhatWeBuild() {
  return (
    <section id="what-we-build" className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow className="left-[-8rem] top-4" color="#e83ede" opacity={0.07} />
      <Container className="relative">
        <SectionHeading label="What we build" title="Four things we build" />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {capabilities.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.06} className="h-full">
              <div className="group h-full rounded-2xl border border-line bg-charcoal/40 p-7 transition-colors duration-200 hover:bg-charcoal-2/70">
                <span
                  className="block h-9 w-9 rounded-xl opacity-80"
                  style={{ background: gradient(i) }}
                />
                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <h3 className="text-xl font-medium text-bone">{item.title}</h3>
                  <span className="font-mono text-xs text-bone-faint">0{i + 1}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                  {item.body}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.points.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-bone-dim"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
