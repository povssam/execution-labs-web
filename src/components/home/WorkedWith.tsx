import styles from "./WorkedWith.module.css";

const clients = [
  "Soniq",
  "Grace",
  "Media Scaling",
  "Dividends & Total Returns",
  "Orbit Artist Group",
];

export function WorkedWith() {
  return (
    <section
      className={styles.section}
      role="group"
      aria-label={`Worked with ${clients.join(", ")}`}
    >
      <div className={styles.shell}>
        <div className={styles.meta} aria-hidden="true">
          <span>Worked with</span>
        </div>
      </div>

      <div className={styles.marquee}>
        <div className={styles.track} aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className={styles.sequence}>
              {clients.map((client) => (
                <span key={`${copy}-${client}`} className={styles.item}>
                  <span>{client}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">Worked with {clients.join(", ")}.</span>
    </section>
  );
}
