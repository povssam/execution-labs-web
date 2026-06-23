import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/Button";
import { Logo } from "../brand/Logo";
import { CALENDAR_URL } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-20 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />

      <Container className="relative">
        <div className="max-w-3xl">
          <div className="reveal flex items-center gap-2.5 text-bone">
            <Logo size={22} />
            <span className="text-sm font-semibold tracking-tight">Execution Labs</span>
          </div>

          <h1
            className="reveal mt-6 text-[2.7rem] font-semibold leading-[1.02] tracking-tight text-bone sm:text-6xl xl:text-7xl"
            style={{ "--reveal-delay": "0.06s" } as React.CSSProperties}
          >
            We build systems
            <br />
            that do the work.
          </h1>

          <p
            className="reveal mt-6 max-w-xl text-base leading-relaxed text-bone-dim sm:text-lg"
            style={{ "--reveal-delay": "0.14s" } as React.CSSProperties}
          >
            We build agents and software that save companies time and money.
            Custom systems for teams that need speed, taste, and real execution.
          </p>

          <div
            className="reveal mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ "--reveal-delay": "0.22s" } as React.CSSProperties}
          >
            <ButtonLink href="/contact">
              Start a project
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </ButtonLink>
            <ButtonLink href={CALENDAR_URL} variant="secondary">
              Book a call
            </ButtonLink>
          </div>
        </div>

        {/* signature glass / lens brand banner (real asset) */}
        <div
          className="reveal mt-12 overflow-hidden rounded-2xl border border-line sm:mt-14"
          style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}
        >
          <Image
            src="/brand/hero-glass.png"
            alt="Execution Labs"
            width={1500}
            height={500}
            priority
            className="h-auto w-full"
          />
        </div>
      </Container>
    </section>
  );
}
