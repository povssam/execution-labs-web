import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/Button";
import { Logo } from "../brand/Logo";
import { AgentRunCard, WorkflowCard } from "./ui-cards";
import { CALENDAR_URL } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />
      {/* signature glass / lens brand asset */}
      <Image
        src="/brand/glass.png"
        alt=""
        width={1600}
        height={1000}
        priority
        aria-hidden
        className="pointer-events-none absolute right-[-22%] top-[-12%] z-0 w-[1100px] max-w-none opacity-80 mix-blend-screen sm:right-[-10%] lg:right-[-4%] lg:w-[920px]"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-8 lg:gap-12">
          <div>
            <div className="reveal flex items-center gap-2.5 text-bone">
              <Logo size={22} />
              <span className="text-sm font-semibold tracking-tight">Execution Labs</span>
            </div>

            <h1
              className="reveal mt-6 text-[2.6rem] font-semibold leading-[1.03] tracking-tight text-bone sm:text-6xl xl:text-7xl"
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
              Custom systems for teams that need speed, taste, and real
              execution.
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

          {/* stacked product previews */}
          <div
            className="reveal relative mx-auto w-full max-w-sm"
            style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}
          >
            <div className="flex flex-col gap-4">
              <div className="lg:translate-x-3">
                <AgentRunCard />
              </div>
              <div className="lg:-translate-x-3">
                <WorkflowCard />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
