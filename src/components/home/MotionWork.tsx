import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { GraceVideo } from "@/components/work/GraceVideo";

export function MotionWork() {
  return (
    <section className="section-flow scroll-reveal relative overflow-hidden py-20 sm:py-28">
      <BrandAtmosphere intensity="section" tone="media" focus="right" />
      <Container className="relative z-10">
        {/* Title and subtitle sit above the video. */}
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <Reveal>
            <span className="flex items-center gap-3">
              <span className="flow-line" aria-hidden />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone-faint">
                Motion work
              </span>
            </span>
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-[1.05] text-bone sm:text-5xl">
              Motion as proof, not decoration
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="max-w-xl text-base leading-relaxed text-bone-dim sm:text-lg">
              Grace shows identity, interface, and motion working as one calm
              product.
            </p>
          </Reveal>
        </div>

        <Reveal
          delay={0.08}
          className="media-reveal light-sweep mt-10 overflow-hidden rounded-xl border border-bone/15 bg-charcoal/40 shadow-[0_35px_120px_-80px_rgba(237,237,237,0.55)] sm:mt-12 sm:rounded-2xl"
        >
          <div className="relative aspect-[16/10] bg-ink sm:aspect-video">
            <GraceVideo label="Grace Animation Final homepage proof" className="scale-[1.01]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-ink/10" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
            Grace / animation final
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
