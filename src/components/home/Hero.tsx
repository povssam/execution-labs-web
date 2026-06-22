import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/Button";
import { SystemMap } from "./SystemMap";
import { CALENDAR_URL } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(231,227,218,0.10),transparent_70%)] blur-2xl"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div>
            <p className="reveal font-mono text-xs uppercase tracking-[0.2em] text-bone-faint">
              Execution Labs
            </p>

            <h1
              className="reveal mt-5 text-5xl font-semibold leading-[1.02] tracking-tight text-bone sm:text-6xl xl:text-7xl"
              style={{ animationDelay: "0.06s" }}
            >
              We build systems
              <br />
              that do the work.
            </h1>

            <p
              className="reveal mt-6 max-w-xl text-lg leading-relaxed text-bone-dim"
              style={{ animationDelay: "0.14s" }}
            >
              AI agents and software that save companies time and money. We move
              fast and the work holds up.
            </p>

            <div
              className="reveal mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "0.22s" }}
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

          <div className="reveal" style={{ animationDelay: "0.2s" }}>
            <SystemMap />
          </div>
        </div>
      </Container>
    </section>
  );
}
