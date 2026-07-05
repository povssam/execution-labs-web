import Image from "next/image";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { CtaButtons } from "../ui/CtaButtons";
import { revealDelay } from "@/lib/utils";

export function Hero() {
  return (
    <section className="section-flow section-flow--hero relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-24 lg:pt-52 lg:pb-28">
      <BrandAtmosphere intensity="hero" focus="right" />

      {/* Prism glass as full-bleed hero atmosphere. Decorative only. */}
      <div className="hero-glass-bg light-sweep absolute inset-0 z-0" aria-hidden>
        <Image
          src="/brand/hero-glass.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-ink via-ink/70 to-ink/15" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-ink via-transparent to-ink/40" aria-hidden />

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <span className="flow-line flow-line--load mb-6 block w-16" aria-hidden />
          <h1
            className="reveal text-[2.7rem] font-semibold leading-[1.02] tracking-tight text-bone sm:text-6xl xl:text-7xl"
            style={revealDelay("0.08s")}
          >
            Agents and software
            <br />
            that save time and money.
          </h1>

          <p
            className="reveal mt-6 max-w-xl text-base leading-relaxed text-bone-dim sm:text-lg"
            style={revealDelay("0.16s")}
          >
            We turn messy briefs into systems that save labor, budget, and time.
          </p>

          <CtaButtons className="reveal mt-8" style={revealDelay("0.24s")} />
        </div>
      </Container>
    </section>
  );
}
