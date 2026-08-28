const clients = [
  "Soniq",
  "Dividends & Total Returns",
  "Grace",
  "Orbit Artist Group",
  "Media Scaling",
];

export function WorkedWith() {
  return (
    <section className="worked-with-surface relative overflow-hidden">
      <div
        className="worked-with-grid relative z-10"
        role="group"
        aria-label={`Worked with ${clients.join(", ")}`}
      >
        <div className="worked-with-heading">
          <span>Worked with</span>
          <span>00 / selected systems</span>
        </div>

        <div className="worked-client-grid">
          {clients.map((client, index) => (
            <span key={client} className="worked-client">
              <span className="worked-client-node" aria-hidden="true" />
              <span>{client}</span>
              <span className="worked-client-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
