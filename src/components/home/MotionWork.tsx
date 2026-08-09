import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { GraceVideo } from "@/components/work/GraceVideo";

const proof = ["Brand system", "Product UI", "Social motion", "Launch asset"];

export function MotionWork() {
  return (
    <section id="motion-work" className="section-flow section-space-feature scroll-reveal relative overflow-hidden">
      <BrandAtmosphere intensity="section" tone="media" focus="right" />
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint">
              Motion work
            </span>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.02] text-bone sm:text-5xl lg:text-6xl">
              Motion Work
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-bone-dim sm:text-xl">
              Grace shows identity, interface, and motion working as one calm product.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="media-reveal motion-showcase mt-12 sm:mt-16 lg:mx-[-3vw]">
          <div className="motion-showcase-frame relative aspect-[16/10] overflow-hidden bg-ink sm:aspect-video">
            <GraceVideo label="Grace Animation Final homepage proof" className="scale-[1.01]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-ink/10" />
            <div className="pointer-events-none absolute left-4 top-4 font-mono text-[9px] uppercase tracking-[0.18em] text-bone-faint sm:left-6 sm:top-6 sm:text-[10px]">
              Grace / motion proof
            </div>
            <div className="pointer-events-none absolute bottom-4 right-4 font-mono text-[9px] uppercase tracking-[0.18em] text-bone-faint sm:bottom-6 sm:right-6 sm:text-[10px]">
              Grace Animation Final
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="motion-proof mt-6 grid grid-cols-2 gap-y-4 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint sm:grid-cols-4 sm:text-[11px]">
          {proof.map((item, index) => (
            <span key={item} className="flex items-center gap-3 sm:justify-center">
              <span className="text-bone/30">0{index + 1}</span>
              {item}
            </span>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
