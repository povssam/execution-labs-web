import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { CtaButtons } from "../ui/CtaButtons";

export function FinalCTA() {
  return (
    <section className="section-flow section-flow--fade relative overflow-hidden py-20 sm:py-28">
      <BrandAtmosphere intensity="soft" tone="fade" focus="bottom" />
      <Container className="relative z-10">
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-wipe mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-bone sm:text-5xl">
            Have a system worth building?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-bone-dim">
            Send the problem. We&rsquo;ll map the first useful build in 24 hours.
          </p>
          <CtaButtons className="mt-10 justify-center" primaryLabel="Start a project" />
        </Reveal>
      </Container>
    </section>
  );
}
