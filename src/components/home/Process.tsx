import { Reveal } from "../ui/Reveal";
import { process } from "@/lib/data";
import styles from "./Middle.module.css";

export function Process() {
  return (
    <section id="process" className={`${styles.section} ${styles.compactSection} section-flow relative overflow-hidden`}>
      <div className={`${styles.container} relative z-10`}>
        <div className={styles.processGrid}>
          {process.map((step, index) => (
            <Reveal key={step.index} delay={index * 0.07} className={styles.processItem}>
              <article>
                <h3 className={styles.itemTitle}>{step.title}</h3>
                <p className={styles.itemCopy}>{step.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
