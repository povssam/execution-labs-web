import Image from "next/image";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { CtaButtons } from "../ui/CtaButtons";
import { revealDelay } from "@/lib/utils";

export function Hero() {
  return (
    <section className="section-flow section-flow--hero relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-10">
      <BrandAtmosphere intensity="hero" focus="right" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-ink via-transparent to-ink/45" aria-hidden />

      <Container className="relative z-10">
        <div
          className="hero-media reveal relative mb-10 overflow-hidden rounded-xl border border-bone/10 bg-charcoal/35 shadow-[0_30px_120px_-80px_rgba(237,237,237,0.6)] sm:mb-12"
          style={revealDelay("0.02s")}
        >
          <Image
            src="/brand/hero-glass.png"
            alt="Execution Labs glass prism identity"
            width={1500}
            height={500}
            priority
            className="block h-28 w-full object-cover sm:h-56 lg:h-64"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-ink/10" />
        </div>

        <div className="max-w-3xl">
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
