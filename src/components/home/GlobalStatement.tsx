import Image from "next/image";
import { Container } from "../ui/Container";
import styles from "./GlobalStatement.module.css";

export function GlobalStatement() {
  return (
    <section
      id="studio-statement"
      className={`${styles.section} section-flow relative overflow-hidden`}
    >
      <Container className={styles.container}>
        <div className={styles.frame}>
          <Image
            src="/brand/hero-glass.png"
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, 1280px"
            className={styles.lensImage}
            draggable={false}
          />
          <div className={styles.lensShade} aria-hidden="true" />

          <div className={styles.instrumentation}>
            <span>Execution Labs</span>
            <span>Refracted systems</span>
          </div>

          <div className={styles.copy}>
            <span className={styles.kicker}>Built for real use</span>
            <h2>The work changes when the system is clear.</h2>
            <p>Agents and software shaped around the work that needs to move.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
