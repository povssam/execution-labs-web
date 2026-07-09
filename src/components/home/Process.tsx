import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { process } from "@/lib/data";

/**
 * Process timeline. Steps sit on the proof-flow rail and render as glowing
 * proof-cards. Content is visible by default; the glow is enhancement only.
 */
export function Process() {
  return (
    <section
      id="process"
      className="section-flow relative overflow-hidden bg-charcoal/15 py-20 sm:py-28"
    >
      <BrandAtmosphere intensity="soft" tone="system" focus="right" />
      <Container className="relative z-10">
        <SectionHeading label="Process" title="Brief to proof" />

        <div className="relative mt-10 sm:mt-14">
          {/* The proof-flow rail runs behind the cards, horizontal on desktop. */}
          <div className="flow-rail-x top-[7px] hidden sm:block" aria-hidden />

          <ol className="grid gap-4 sm:grid-cols-4 sm:gap-5">
            {process.map((step, i) => (
              <Reveal as="li" key={step.index} delay={i * 0.06}>
                <div className="relative sm:pt-7">
                  <span
                    className="flow-dot left-0 top-1 hidden sm:block"
                    style={{ opacity: 1 - i * 0.14 }}
                    aria-hidden
                  />
                  <div className="proof-card h-full p-5 sm:p-6">
                    <span className="font-mono text-[11px] text-bone-faint">
                      {step.index}
                    </span>
                    <h3 className="mt-2 text-lg font-medium text-bone sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-bone-dim">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
