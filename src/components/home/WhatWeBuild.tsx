import { ArrowUpRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { capabilities } from "@/lib/data";

export function WhatWeBuild() {
  return (
    <section id="what-we-build" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          label="What we build"
          title="Four layers, one standard"
          description="Pick the layer you need. We build it to last and to grow."
        />

        <div className="mt-14 overflow-hidden rounded-2xl border border-line">
          {capabilities.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="group relative flex flex-col gap-5 border-b border-line bg-charcoal/40 px-6 py-7 transition-colors duration-200 last:border-b-0 hover:bg-charcoal-2/70 sm:flex-row sm:items-center sm:gap-8 sm:px-8">
                  <span className="font-mono text-xs text-bone-faint sm:w-10">
                    0{i + 1}
                  </span>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-ink text-bone transition-colors duration-200 group-hover:border-bone/30">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>

                  <div className="sm:flex-1">
                    <h3 className="text-xl font-medium text-bone">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-bone-dim">
                      {item.body}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:w-56 sm:justify-end">
                    {item.points.map((p) => (
                      <span
                        key={p}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-bone-dim"
                      >
                        {p}
                      </span>
                    ))}
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="hidden shrink-0 text-bone-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone sm:block"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
