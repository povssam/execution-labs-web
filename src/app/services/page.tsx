import type { Metadata } from "next";
import { Bot, ChartNoAxesCombined, PanelsTopLeft, Plus, Workflow } from "lucide-react";
import { BrandAtmosphere } from "@/components/BrandAtmosphere";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaButtons } from "@/components/ui/CtaButtons";
import { FinalCTA } from "@/components/home/FinalCTA";
import { capabilities, process, faqs } from "@/lib/data";

const icons = [Bot, PanelsTopLeft, ChartNoAxesCombined, Workflow];

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

      <section id="what-we-build" className="relative overflow-hidden pb-24 sm:pb-28">
        <BrandAtmosphere intensity="soft" />
        <Container className="relative z-10">
          <div className="grid gap-5 sm:grid-cols-2">
            {capabilities.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 0.05} className="h-full">
                <div className="group flex h-full flex-col rounded-2xl border border-line bg-charcoal/40 p-7 transition-colors duration-200 hover:border-bone/25 hover:bg-charcoal-2/70">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink text-bone-dim transition-colors duration-150 group-hover:border-bone/40 group-hover:text-bone">
                      {(() => {
                        const Icon = icons[i % icons.length];
                        return <Icon size={18} strokeWidth={1.8} />;
                      })()}
                    </span>
                    <span className="font-mono text-xs text-bone-faint">
                      0{i + 1}
                    </span>
                  </div>
                  <h2 className="mt-6 text-xl font-medium text-bone">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                    {item.stance}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 pt-1">
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

      <section className="relative overflow-hidden border-y border-line bg-charcoal/25 py-24 sm:py-28">
        <BrandAtmosphere intensity="soft" />
        <Container className="relative z-10">
          <SectionHeading
            label="How we work"
            title="A tight loop, brief to real usage"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {process.map((step, i) => (
              <Reveal key={step.index} delay={i * 0.06}>
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-ink font-mono text-sm text-bone">
                    {step.index}
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-bone">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="faq" className="relative overflow-hidden py-24 sm:py-32">
        <BrandAtmosphere intensity="soft" />
        <Container className="relative z-10">
          <SectionHeading
            label="FAQ"
            title="Questions clients ask first"
            description="Straight answers before you reach out."
          />
          <div className="mt-12 overflow-hidden rounded-2xl border border-line">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={(i % 3) * 0.04}>
                <details className="group border-b border-line bg-charcoal/40 last:border-b-0 open:bg-charcoal-2/50">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-medium text-bone transition-colors hover:bg-charcoal-2/70 sm:px-8">
                    {faq.q}
                    <Plus
                      size={18}
                      className="shrink-0 text-bone-faint transition-transform duration-200 group-open:rotate-45"
                    />
                  </summary>
                  <p className="px-6 pb-6 text-sm leading-relaxed text-bone-dim sm:px-8">
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
