import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { process } from "@/lib/data";

export function Process() {
  return (
    <section id="process" className="border-t border-line bg-charcoal/40 py-20 sm:py-24">
      <Container>
        <SectionHeading label="Process" title="How the work gets made" />

        <div className="relative mt-14">
          {/* connecting line */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-line lg:block"
            aria-hidden
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {process.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.index} delay={i * 0.06}>
                  <div className="group relative">
                    <div className="flex items-center gap-3">
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-ink font-mono text-sm text-bone transition-colors duration-200 group-hover:border-bone/40">
                        {step.index}
                      </div>
                      <Icon
                        size={18}
                        strokeWidth={1.6}
                        className="text-bone-faint transition-colors duration-200 group-hover:text-bone"
                      />
                    </div>
                    <h3 className="mt-6 text-lg font-medium text-bone">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
