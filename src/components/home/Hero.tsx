import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/Button";
import { OpsDashboard } from "./OpsDashboard";
import { CALENDAR_URL } from "@/lib/site";
import { industries } from "@/lib/data";

const stats = [
  { value: "6 wks", label: "Idea to MVP" },
  { value: "70%", label: "Less manual ops" },
  { value: "24h", label: "First reply" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(231,227,218,0.10),transparent_70%)] blur-2xl"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1.15fr] lg:gap-12">
          <div>
            <div className="reveal inline-flex items-center gap-2 rounded-full border border-line bg-charcoal-2/40 px-4 py-1.5 font-mono text-xs text-bone-dim">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              AI agents and software, built fast
            </div>

            <h1
              className="reveal mt-6 text-5xl font-semibold leading-[1.02] tracking-tight text-bone sm:text-6xl xl:text-7xl"
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

            <p
              className="reveal mt-3 text-xs text-bone-faint"
              style={{ animationDelay: "0.26s" }}
            >
              Free scoping call. No pressure, no hard sell.
            </p>

            <dl
              className="reveal mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6"
              style={{ animationDelay: "0.3s" }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl font-semibold tracking-tight text-bone">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-bone-faint">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div
              className="reveal mt-10"
              style={{ animationDelay: "0.34s" }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint">
                Shipped for teams in
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {industries.map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-line px-3 py-1 text-xs text-bone-dim"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="reveal" style={{ animationDelay: "0.2s" }}>
            <OpsDashboard />
          </div>
        </div>
      </Container>
    </section>
  );
}
