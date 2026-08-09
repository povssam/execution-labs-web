const clients = [
  "Soniq",
  "Dividends & Total Returns",
  "Grace",
  "Orbit Artist Group",
  "Media Scaling",
];

export function WorkedWith() {
  return (
    <section className="relative overflow-hidden bg-ink pb-8 sm:pb-10">
      <div className="relative z-10">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-bone-faint">
          Worked with
        </p>

        <div
          className="worked-marquee relative mt-4 overflow-hidden sm:mt-5"
          aria-label={`Worked with ${clients.join(", ")}`}
        >
          <ul className="sr-only">
            {clients.map((client) => (
              <li key={client}>{client}</li>
            ))}
          </ul>

          <div className="worked-marquee-track flex w-max items-center">
            {[0, 1].map((group) => (
              <div
                key={group}
                aria-hidden="true"
                className="worked-marquee-group flex shrink-0 items-center gap-10 pr-10 sm:gap-16 sm:pr-16 lg:gap-24 lg:pr-24"
              >
                {clients.map((client) => (
                  <span
                    key={`${group}-${client}`}
                    className="worked-wordmark whitespace-nowrap text-sm font-medium text-bone-dim sm:text-base lg:text-lg"
                  >
                    {client}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
