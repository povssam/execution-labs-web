import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { GraceVideo } from "@/components/work/GraceVideo";

export function MotionWork() {
  return (
    <section className="section-flow scroll-reveal relative overflow-hidden py-20 sm:py-28">
      <BrandAtmosphere intensity="section" tone="media" focus="right" />
      <Container className="relative z-10">
        {/* Centered title and subtitle sit above the video. */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-semibold leading-[1.05] text-bone sm:text-5xl">
            Motion as proof, not decoration
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-bone-dim sm:text-lg">
            Grace shows identity, interface, and motion working as one calm
            product.
          </p>
        </Reveal>

        <Reveal
          delay={0.08}
          className="media-reveal light-sweep mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl border border-bone/15 bg-charcoal/40 shadow-[0_35px_120px_-80px_rgba(237,237,237,0.55)] sm:mt-12 sm:rounded-2xl"
        >
          <div className="relative aspect-[16/10] bg-ink sm:aspect-video">
            <GraceVideo label="Grace Animation Final homepage proof" className="scale-[1.01]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-ink/10" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
            Grace / animation final
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
