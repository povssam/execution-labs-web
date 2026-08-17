import { BrandAtmosphere } from "../BrandAtmosphere";
import { Reveal } from "../ui/Reveal";
import styles from "./Middle.module.css";

const signals = [
  "Faster decisions",
  "Clearer workflows",
  "Less manual follow-up",
  "Launch-ready systems",
];

export function ClientSignals() {
  return (
    <section id="client-signals" className={`${styles.section} ${styles.lastSection} section-flow relative overflow-hidden`}>
      <BrandAtmosphere intensity="soft" tone="system" focus="right" />
      <div className={`${styles.container} relative z-10`}>
        <div className={styles.signalsGrid}>
          {signals.map((signal, index) => (
            <Reveal key={signal} delay={index * 0.04}>
              <p className={styles.signal}>{signal}.</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
