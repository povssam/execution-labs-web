import { Bot, ChartNoAxesCombined, PanelsTopLeft, Workflow } from "lucide-react";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { capabilities } from "@/lib/data";

const icons = [Bot, PanelsTopLeft, ChartNoAxesCombined, Workflow];

export function WhatWeBuild() {
  return (
    <section id="what-we-build" className="section-flow relative overflow-hidden py-20 sm:py-28">
      <BrandAtmosphere intensity="soft" tone="calm" focus="right" />
      <Container className="relative z-10">
        <SectionHeading
          label="What we build"
          title="Four ways we turn a brief into a system"
          description="Agents, tools, MVPs, and systems built to hold up."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {capabilities.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.06} className="h-full">
              <div className="group h-full rounded-2xl border border-line bg-charcoal/40 p-6 transition-colors duration-200 hover:border-bone/25 hover:bg-charcoal-2/60 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink text-bone-dim transition-colors duration-150 group-hover:border-bone/40 group-hover:text-bone">
                    {(() => {
                      const Icon = icons[i % icons.length];
                      return <Icon size={18} strokeWidth={1.8} />;
                    })()}
                  </span>
                  <span className="font-mono text-xs text-bone-faint">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-xl font-medium text-bone">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                  {item.stance}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.points.slice(0, 2).map((p) => (
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
