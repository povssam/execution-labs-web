import Image from "next/image";
import { Container } from "../ui/Container";
import { CtaButtons } from "../ui/CtaButtons";
import { revealDelay } from "@/lib/utils";

export function Hero() {
  return (
    <section className="home-hero relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/brand/hero-glass.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-signature scale-[1.35] object-cover object-[70%_center] opacity-90 sm:scale-110 sm:object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 grid-backdrop opacity-60" aria-hidden />

      <Container className="home-hero-content relative z-10">
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
            We turn your vision into systems that save labor, budget, and time.
          </p>

          <CtaButtons className="reveal mt-8" style={revealDelay("0.22s")} />
        </div>
      </Container>
    </section>
  );
}
