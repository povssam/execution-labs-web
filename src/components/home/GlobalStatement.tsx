import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

export function GlobalStatement() {
  return (
    <section className="section-flow scroll-reveal relative overflow-hidden pb-[calc(3.25rem+env(safe-area-inset-bottom))] pt-4 sm:pb-20 sm:pt-4">
      <BrandAtmosphere intensity="soft" tone="fade" focus="center" />
      <Container className="relative z-10">
        <Reveal>
          <p className="max-w-[19em] text-[1.55rem] font-medium leading-[1.18] text-bone sm:max-w-5xl sm:text-5xl sm:leading-[1.04] lg:text-6xl">
            Building exceptional digital experiences for visionaries and
            innovators around the world.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
