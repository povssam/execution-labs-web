import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
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
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-bone sm:text-5xl sm:leading-[1.05]">
            Our Process
          </h2>
        </Reveal>

        <ol className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-4 sm:gap-5">
          {process.map((step, i) => (
            <Reveal as="li" key={step.index} delay={i * 0.06}>
              <div className="glow-card relative h-full p-6 sm:p-7">
                {i < process.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-bone-faint/60 sm:block"
                  >
                    &#8594;
                  </span>
                )}
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
