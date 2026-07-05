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
          className="hero-media light-sweep reveal relative"
          style={revealDelay("0.02s")}
        >
          <Image
            src="/brand/hero-glass.png"
            alt="Execution Labs glass prism identity"
            width={1500}
            height={500}
            priority
            className="hero-glass-blend block h-40 w-full object-cover sm:h-64 lg:h-72"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 hidden items-center justify-between px-1 pt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/55 sm:flex">
            <span>Execution Labs / systems studio</span>
            <span>Brief → System → Build → Proof</span>
          </div>
        </div>

        <div className="relative z-10 -mt-8 max-w-3xl sm:-mt-12">
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
