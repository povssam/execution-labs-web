import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

export function GlobalStatement() {
  return (
    <section className="section-flow scroll-reveal relative overflow-hidden pb-14 pt-4 sm:pb-20 sm:pt-4">
      <BrandAtmosphere intensity="soft" tone="fade" focus="center" />
      <Container className="relative z-10">
        <Reveal>
          <p className="max-w-5xl text-[2.15rem] font-medium leading-[1.04] text-bone sm:text-5xl lg:text-6xl">
            Building exceptional digital experiences for visionaries and
            innovators around the world.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
