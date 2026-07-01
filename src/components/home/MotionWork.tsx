import { Play } from "lucide-react";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { GraceVideo } from "@/components/work/GraceVideo";

const proof = ["Brand system", "Product UI", "Social motion", "Launch asset"];

export function MotionWork() {
  return (
    <section className="section-flow scroll-reveal relative overflow-hidden py-20 sm:py-28">
      <BrandAtmosphere intensity="section" tone="media" focus="right" />
      <Container className="relative z-10">
        <Reveal className="media-reveal overflow-hidden rounded-xl border border-bone/15 bg-charcoal/40 shadow-[0_35px_120px_-80px_rgba(237,237,237,0.55)]">
          <div className="relative aspect-[16/10] bg-ink sm:aspect-video">
            <GraceVideo label="Grace Animation Final homepage proof" className="scale-[1.01]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/62 via-transparent to-ink/12" />
            <div className="pointer-events-none absolute left-4 top-4 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint sm:block">
              Grace / motion proof
            </div>
            <div className="pointer-events-none absolute bottom-4 left-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-bone/15 bg-ink/70 px-3 py-1 text-xs text-bone-dim backdrop-blur-md">
                <Play size={12} />
                Grace Animation Final
              </span>
            </div>
          </div>
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
            <div className="mt-5 flex flex-wrap gap-2">
              {proof.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-bone/10 bg-bone/[0.025] px-3 py-1.5 text-xs text-bone-dim"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
