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
            that save time and money.
          </h1>

          <p
            className="reveal mt-6 max-w-xl text-base leading-relaxed text-bone-dim sm:text-lg"
            style={revealDelay("0.14s")}
          >
            We turn messy briefs into working systems. Less manual work, fewer
            expensive misses, and software the team can use.
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
