import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";

const clients = [
  "Grace",
  "Orbit Artist Group",
  "Media Scaling",
  "Soniq",
  "Dividends & Total Returns",
];

/* Soft opacity rhythm across the strip. Uniform type, no chrome. */
const rhythm = [0.8, 0.52, 0.68, 0.48, 0.62];

export function WorkedWith() {
  return (
    <section className="section-flow scroll-reveal relative overflow-hidden py-12 sm:py-16">
      <BrandAtmosphere intensity="soft" tone="proof" focus="left" />

      <Container className="relative z-10">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.26em] text-bone-faint">
          Worked with
        </p>
      </Container>

      <div
        className="worked-marquee relative z-10 mt-8 overflow-hidden sm:mt-10"
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
              {clients.map((client, i) => (
                <span
                  key={client}
                  className="worked-wordmark whitespace-nowrap px-8 py-1 text-lg font-medium text-bone sm:px-16 sm:text-2xl"
                  style={{ opacity: rhythm[i] }}
                >
                  {client}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
