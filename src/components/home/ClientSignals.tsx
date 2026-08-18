import { Reveal } from "../ui/Reveal";
import styles from "./Middle.module.css";

const outcomes = [
  "Faster decisions.",
  "Clearer workflows.",
  "Less follow-up.",
  "Ready to launch.",
];

export function ClientSignals() {
  return (
    <section
      id="client-signals"
      className={`${styles.section} ${styles.outcomesSection} ${styles.lastSection} section-flow relative overflow-hidden`}
    >
      <div className={`${styles.container} relative z-10`}>
        <div className={styles.outcomesComposition}>
          {outcomes.map((outcome, index) => (
            <Reveal key={outcome} delay={index * 0.06}>
              <p className={styles.outcome}>{outcome}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
