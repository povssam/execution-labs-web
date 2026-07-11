import { BrandAtmosphere } from "../BrandAtmosphere";

const clients = [
  "Grace",
  "Orbit Artist Group",
  "Media Scaling",
  "Soniq",
  "Dividends & Total Returns",
];

/* Gentle opacity rhythm across the strip. Kept high so every name reads clean.
   Uniform type, no chrome. */
const rhythm = [0.92, 0.72, 0.84, 0.68, 0.78];

export function WorkedWith() {
  return (
    <section className="section-flow scroll-reveal relative -mt-4 overflow-hidden pt-0 pb-12 sm:-mt-6 sm:pb-16">
      <BrandAtmosphere intensity="soft" tone="proof" focus="left" />

      <div
        className="worked-marquee relative z-10 overflow-hidden pt-3 sm:pt-4"
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
                  className="worked-wordmark whitespace-nowrap px-10 py-2 text-lg font-medium text-bone sm:px-20 sm:text-2xl"
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
