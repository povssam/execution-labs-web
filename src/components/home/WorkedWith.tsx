import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";

const clients = [
  "Grace",
  "Orbit Artist Group",
  "Media Scaling",
  "Soniq",
  "Dividends & Total Returns",
];

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

            <div aria-hidden="true" className="worked-marquee-track flex w-max items-center">
              {[0, 1, 2].map((copy) => (
                <div
                  key={copy}
                  className={
                    copy === 0
                      ? "worked-marquee-group flex items-center"
                      : "worked-marquee-group worked-marquee-dupe flex items-center"
                  }
                >
                  {clients.map((client) => (
                    <span
                      key={client}
                      className="flex items-center gap-6 pr-6 sm:gap-10 sm:pr-10"
                    >
                      <span className="worked-wordmark whitespace-nowrap py-1 text-base font-medium text-bone-dim transition-colors duration-200 hover:text-bone sm:text-lg">
                        {client}
                      </span>
                      <span className="h-1 w-1 shrink-0 rounded-full bg-bone/25" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
