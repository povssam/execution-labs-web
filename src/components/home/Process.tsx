import { Check, FileText, Hammer, Route } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { process } from "@/lib/data";

const icons = [FileText, Route, Hammer, Check];

function StepArtifact({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="grid gap-1.5">
        <span className="h-1.5 w-16 rounded-full bg-bone/45" />
        <span className="h-1.5 w-24 rounded-full bg-bone/20" />
        <span className="h-1.5 w-12 rounded-full bg-bone/15" />
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-bone/55" />
        <span className="h-px w-8 bg-bone/20" />
        <span className="h-2 w-8 rounded-full border border-bone/25" />
        <span className="h-px w-8 bg-bone/20" />
        <span className="h-2 w-2 rounded-full bg-bone/35" />
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <span
            key={item}
            className="h-5 rounded-md border border-bone/10 bg-bone/[0.04]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-1.5">
      <span className="h-1.5 w-24 rounded-full bg-bone/20" />
      <span className="h-1.5 w-16 rounded-full bg-bone/45" />
      <span className="h-1.5 w-20 rounded-full bg-bone/15" />
    </div>
  );
}

export function Process() {
  return (
    <section id="process" className="border-t border-line bg-charcoal/40 py-20 sm:py-28">
      <Container>
        <SectionHeading label="Process" title="Brief to proof" />

        <div className="relative mt-12">
          <div
            className="process-flow pointer-events-none absolute bottom-0 left-6 top-0 w-px bg-line sm:hidden lg:left-0 lg:right-0 lg:top-1/2 lg:block lg:h-px lg:w-auto"
            aria-hidden
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {process.map((step, i) => (
              <Reveal key={step.index} delay={i * 0.06}>
                <div className="group relative z-10 min-h-52 rounded-2xl border border-line bg-ink/80 p-5 transition-colors duration-200 hover:border-bone/25">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-charcoal text-bone-dim transition-colors duration-150 group-hover:border-bone/30 group-hover:text-bone">
                      {(() => {
                        const Icon = icons[i % icons.length];
                        return <Icon size={17} strokeWidth={1.7} />;
                      })()}
                    </span>
                    <span className="font-mono text-[11px] text-bone-faint">
                      {step.index}
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-bone">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-bone-dim">
                    {step.body}
                  </p>
                  <div className="mt-7 rounded-xl border border-bone/10 bg-charcoal/45 p-4">
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
