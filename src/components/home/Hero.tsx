import Image from "next/image";
import { Container } from "../ui/Container";
import { CtaButtons } from "../ui/CtaButtons";
import { Logo } from "../brand/Logo";
import { revealDelay } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-44 lg:pb-40">
      {/* immersive glass / lens atmosphere from the real brand asset */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/brand/hero-glass.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-[1.35] object-cover object-[70%_center] opacity-90 sm:scale-110 sm:object-right"
        />
        <div className="absolute right-0 top-0 h-28 w-[34%] bg-ink sm:h-36" />
        {/* keep the left side (text) dark and readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 grid-backdrop opacity-60" aria-hidden />

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <div className="reveal flex items-center gap-2.5 text-bone">
            <Logo size={22} />
            <span className="text-sm font-semibold tracking-tight">Execution Labs</span>
          </div>

          <h1
            className="reveal mt-6 text-[2.7rem] font-semibold leading-[1.02] tracking-tight text-bone sm:text-6xl xl:text-7xl"
            style={revealDelay("0.06s")}
          >
            Agents and software
            <br />
            that save time.
          </h1>

          <p
            className="reveal mt-6 max-w-xl text-base leading-relaxed text-bone-dim sm:text-lg"
            style={revealDelay("0.14s")}
          >
            We build the systems busy teams wish already existed. We understand
            the vision, push it further, and ship work that holds up.
          </p>

          <CtaButtons className="reveal mt-8" style={revealDelay("0.22s")} />
        </div>
      </Container>
    </section>
  );
}
