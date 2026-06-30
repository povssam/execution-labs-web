import { Check, FileText, Hammer, Route } from "lucide-react";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { process } from "@/lib/data";

const icons = [FileText, Route, Hammer, Check];

function StepArtifact({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="grid gap-1.5">
        <span className="h-1 w-12 rounded-full bg-bone/45" />
        <span className="h-1 w-20 rounded-full bg-bone/20" />
        <span className="h-1 w-10 rounded-full bg-bone/15" />
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-bone/55" />
        <span className="h-px w-6 bg-bone/20" />
        <span className="h-1.5 w-7 rounded-full border border-bone/25" />
        <span className="h-px w-6 bg-bone/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-bone/35" />
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <span
            key={item}
            className="h-3 rounded border border-bone/10 bg-bone/[0.04]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-1.5">
      <span className="h-1 w-20 rounded-full bg-bone/20" />
      <span className="h-1 w-12 rounded-full bg-bone/45" />
      <span className="h-1 w-16 rounded-full bg-bone/15" />
    </div>
  );
}

export function Process() {
  return (
    <section id="process" className="section-flow relative overflow-hidden bg-charcoal/15 py-20 sm:py-28">
      <BrandAtmosphere intensity="soft" tone="system" focus="right" />
      <Container className="relative z-10">
        <SectionHeading label="Process" title="Brief to proof" />

        <div className="relative mt-10">
          <div
            className="process-flow pointer-events-none absolute bottom-0 left-6 top-0 w-px bg-line sm:hidden lg:left-0 lg:right-0 lg:top-1/2 lg:block lg:h-px lg:w-auto"
            aria-hidden
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {process.map((step, i) => (
              <Reveal key={step.index} delay={i * 0.06}>
                <div className="group relative z-10 rounded-2xl border border-line bg-ink/80 p-4 transition-colors duration-200 hover:border-bone/25 sm:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-charcoal text-bone-dim transition-colors duration-150 group-hover:border-bone/30 group-hover:text-bone">
                      {(() => {
                        const Icon = icons[i % icons.length];
                        return <Icon size={15} strokeWidth={1.7} />;
                      })()}
                    </span>
                    <span className="font-mono text-[11px] text-bone-faint">
                      {step.index}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-medium text-bone">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-bone-dim">
                    {step.body}
                  </p>
                  <div className="mt-5 rounded-lg border border-bone/10 bg-charcoal/45 p-3">
                    <StepArtifact index={i} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
