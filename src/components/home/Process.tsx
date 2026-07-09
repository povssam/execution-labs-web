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
        <SectionHeading
          className="mx-auto max-w-2xl text-center"
          title="Our Process"
          description="Four steps from problem to working system."
        />

        <ol className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-4 sm:gap-5">
          {process.map((step, i) => (
            <Reveal as="li" key={step.index} delay={i * 0.06}>
              <div className="proof-card h-full p-6 sm:p-7">
                <h3 className="text-lg font-medium text-bone sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
