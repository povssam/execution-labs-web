import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

export function GlobalStatement() {
  return (
    <section className="section-flow scroll-reveal relative overflow-hidden py-14 sm:py-24">
      <BrandAtmosphere intensity="soft" tone="fade" focus="center" />
      <Container className="relative z-10">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="text-balance text-[1.35rem] font-medium leading-[1.24] text-bone sm:text-[1.75rem] sm:leading-[1.2] lg:text-[2.25rem] lg:leading-[1.18]">
            Building exceptional digital experiences for visionaries and
            innovators around the world.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
