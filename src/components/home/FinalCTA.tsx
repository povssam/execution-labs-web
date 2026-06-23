import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { ButtonLink } from "../ui/Button";
import { CALENDAR_URL } from "@/lib/site";

export function FinalCTA() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-charcoal px-8 py-16 text-center sm:px-16 sm:py-24">
            <div
              className="pointer-events-none absolute inset-0 grid-backdrop opacity-70"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-1/2 top-[-30%] h-80 w-[720px] max-w-[120%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "linear-gradient(90deg,#e83ede,#9333ea,#14c8aa,#fb8c28)",
              }}
              aria-hidden
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-bone sm:text-5xl">
                Have a system worth building?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-bone-dim">
                Let&apos;s make the first version real.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
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
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
