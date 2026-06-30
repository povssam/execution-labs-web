import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { CtaButtons } from "../ui/CtaButtons";
import { revealDelay } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-44 lg:pb-40">
      <BrandAtmosphere intensity="hero" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-ink via-transparent to-ink/45" aria-hidden />

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <h1
            className="reveal text-[2.7rem] font-semibold leading-[1.02] tracking-tight text-bone sm:text-6xl xl:text-7xl"
            style={revealDelay("0.06s")}
          >
            Agents and software
            <br />
            that save time and money.
          </h1>

          <p
            className="reveal mt-6 max-w-xl text-base leading-relaxed text-bone-dim sm:text-lg"
            style={revealDelay("0.14s")}
          >
            We turn messy briefs into systems that save labor, budget, and time.
          </p>

          <CtaButtons className="reveal mt-8" style={revealDelay("0.22s")} />

          <div
            className="reveal mt-8 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint"
            style={revealDelay("0.3s")}
          >
            {["Brief", "Build", "Proof"].map((item) => (
              <span key={item} className="rounded-full border border-line bg-ink/45 px-3 py-1">
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
