import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { process } from "@/lib/data";
import { gradient } from "@/lib/brand";

export function Process() {
  return (
    <section id="process" className="border-t border-line bg-charcoal/40 py-16 sm:py-24">
      <Container>
        <SectionHeading label="Process" title="How the work gets made" />

        <div className="relative mt-12">
          <div
            className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent lg:block"
            aria-hidden
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {process.map((step, i) => (
              <Reveal key={step.index} delay={i * 0.06}>
                <div className="group relative">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full p-px" style={{ background: gradient(i) }}>
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-ink font-mono text-sm text-bone">
                      {step.index}
                    </div>
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
        </div>
      </Container>
    </section>
  );
}
