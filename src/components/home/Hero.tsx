import Image from "next/image";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { CtaButtons } from "../ui/CtaButtons";
import { revealDelay } from "@/lib/utils";

export function Hero() {
  return (
    <section className="section-flow section-flow--hero relative overflow-hidden pt-32 pb-0 sm:pt-40 lg:pt-48">
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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-2rem] z-[1] h-44 bg-gradient-to-b from-transparent via-ink/30 to-ink blur-3xl"
      />

      <Container className="relative z-10">
        <div className="max-w-4xl">
          <h1
            className="reveal text-balance text-[2.95rem] font-semibold leading-[0.97] tracking-tight text-bone sm:text-6xl lg:text-[4.9rem] xl:text-[5.65rem]"
            style={revealDelay("0.08s")}
          >
            Agents and software
            <br />
            that save time and money.
          </h1>

          <p
            className="reveal mt-6 max-w-xl text-pretty text-base leading-relaxed text-bone-dim sm:text-lg"
            style={revealDelay("0.16s")}
          >
            We turn your vision into systems that save labor, budget, and time.
          </p>

          <CtaButtons className="reveal mt-8" style={revealDelay("0.24s")} />
        </div>
      </Container>
    </section>
  );
}
