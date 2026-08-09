import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

export function GlobalStatement() {
  return (
    <section className="section-flow scroll-reveal relative overflow-hidden pb-24 pt-96 sm:pb-32 sm:pt-[25rem] lg:pb-36 lg:pt-56">
      <BrandAtmosphere intensity="soft" tone="fade" focus="center" />
      <Container className="relative z-10">
        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-2xl font-medium leading-[1.18] text-bone sm:text-3xl lg:text-4xl">
            Building exceptional digital experiences for visionaries and
            innovators around the world.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
