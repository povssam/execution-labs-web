import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { process } from "@/lib/data";

export function Process() {
  return (
    <section id="process" className="section-flow relative overflow-hidden bg-charcoal/15 py-20 sm:py-28">
      <BrandAtmosphere intensity="soft" tone="system" focus="right" />
      <Container className="relative z-10">
        <SectionHeading label="Process" title="Brief to proof" />

        <div className="relative mt-10 sm:mt-14">
          {/* The proof-flow rail: vertical on mobile, horizontal on desktop. */}
          <div className="flow-rail-y left-[3px] sm:hidden" aria-hidden />
          <div className="flow-rail-x top-[3px] hidden sm:block" aria-hidden />

          <ol className="grid gap-8 sm:grid-cols-4 sm:gap-6">
            {process.map((step, i) => (
              <Reveal as="li" key={step.index} delay={i * 0.06}>
                <div className="relative pl-7 sm:pl-0 sm:pt-9">
                  <span
                    className="flow-dot left-0 top-[5px] sm:left-0 sm:top-0"
                    style={{ opacity: 1 - i * 0.14 }}
                    aria-hidden
                  />
                  <span className="font-mono text-[11px] text-bone-faint">
                    {step.index}
                  </span>
                  <h3 className="mt-1.5 text-lg font-medium text-bone sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-bone-dim">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
