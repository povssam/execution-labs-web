import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { CtaButtons } from "../ui/CtaButtons";

export function FinalCTA() {
  return (
    <section className="section-flow section-flow--fade relative overflow-hidden py-20 sm:py-28">
      <BrandAtmosphere intensity="soft" tone="fade" focus="bottom" />
      <Container className="relative z-10">
        <Reveal>
          <div className="relative border-t border-line px-2 py-16 text-center sm:py-24">
            <h2 className="text-wipe mx-auto max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight text-bone sm:text-5xl lg:text-6xl">
              Have a system worth building?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-bone-dim">
              Send the problem. We will map the first useful build.
            </p>
            <CtaButtons className="mt-10 justify-center" primaryLabel="Start a project" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
