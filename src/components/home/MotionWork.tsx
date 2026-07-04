import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { GraceVideo } from "@/components/work/GraceVideo";

export function MotionWork() {
  return (
    <section className="section-flow scroll-reveal relative overflow-hidden py-20 sm:py-28">
      <BrandAtmosphere intensity="section" tone="media" focus="right" />
      <Container className="relative z-10">
        <Reveal className="media-reveal light-sweep overflow-hidden rounded-xl border border-bone/15 bg-charcoal/40 shadow-[0_35px_120px_-80px_rgba(237,237,237,0.55)] sm:rounded-2xl">
          <div className="relative aspect-[16/10] bg-ink sm:aspect-video">
            <GraceVideo label="Grace Animation Final homepage proof" className="scale-[1.01]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-ink/10" />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
            Grace / animation final
          </p>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone-faint">
              Motion work
            </span>
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-[1.05] text-bone sm:text-5xl">
              Motion as proof, not decoration
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="max-w-xl text-base leading-relaxed text-bone-dim sm:text-lg">
              Grace shows identity, interface, and motion working as one calm
              product language.
            </p>
            <p className="mt-4 font-mono text-xs tracking-[0.04em] text-bone-faint">
              Brand system · Product UI · Social motion · Launch asset
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
