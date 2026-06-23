import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { CtaButtons } from "../ui/CtaButtons";
import { SectionGlow } from "../ui/SectionGlow";

export function FinalCTA() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-charcoal px-8 py-16 text-center sm:px-16 sm:py-24">
            <div
              className="pointer-events-none absolute inset-0 grid-backdrop opacity-70"
              aria-hidden
            />
            <SectionGlow className="left-1/2 top-[-40%] -translate-x-1/2" color="#9333ea" opacity={0.16} />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-bone sm:text-5xl">
                Have a system worth building?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-bone-dim">
                Let&apos;s make the first version real.
              </p>
              <CtaButtons className="mt-10 justify-center" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
