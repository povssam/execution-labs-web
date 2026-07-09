import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

export function GlobalStatement() {
  return (
    <section className="section-flow scroll-reveal relative overflow-hidden py-14 sm:py-24">
      <BrandAtmosphere intensity="soft" tone="fade" focus="center" />
      <Container className="relative z-10">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="flex items-center gap-3">
            <span className="flow-line" aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-bone-faint">
              The studio
            </span>
            <span className="flow-line rotate-180" aria-hidden />
          </span>
          <p className="mt-6 text-balance text-[1.4rem] font-medium leading-[1.22] text-bone sm:text-3xl sm:leading-[1.16] lg:text-[2.5rem] lg:leading-[1.14]">
            Building exceptional digital experiences for visionaries and
            innovators around the world.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
