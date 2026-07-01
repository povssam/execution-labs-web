import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";

const clients = [
  "Grace",
  "Orbit Artist Group",
  "Media Scaling",
  "Soniq",
  "Dividends & Total Returns",
];

const marqueeItems = [...clients, ...clients, ...clients];

export function WorkedWith() {
  return (
    <section className="section-flow scroll-reveal relative overflow-hidden border-y border-line/80 py-7 sm:py-9">
      <BrandAtmosphere intensity="soft" tone="proof" focus="left" />
      <Container className="relative z-10">
        <div className="grid gap-5 lg:grid-cols-[10rem_1fr] lg:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint">
            Worked with
          </p>

          <div
            className="worked-marquee relative overflow-hidden"
            aria-label={`Worked with ${clients.join(", ")}`}
          >
            <ul className="sr-only">
              {clients.map((client) => (
                <li key={client}>{client}</li>
              ))}
            </ul>

            <div className="worked-marquee-track flex w-max items-center gap-5 sm:gap-8">
              {marqueeItems.map((client, index) => (
                <span
                  key={`${client}-${index}`}
                  aria-hidden="true"
                  className="worked-wordmark whitespace-nowrap rounded-md border border-bone/10 bg-bone/[0.025] px-4 py-2 text-sm font-medium text-bone-dim shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] sm:px-5 sm:text-base"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
