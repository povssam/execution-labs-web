import { BrandAtmosphere } from "../BrandAtmosphere";
import { Reveal } from "../ui/Reveal";
import { GraceVideo } from "@/components/work/GraceVideo";
import styles from "./Middle.module.css";

export function MotionWork() {
  return (
    <section
      id="motion-work"
      className={`${styles.section} ${styles.motionSection} section-flow relative overflow-hidden`}
    >
      <BrandAtmosphere intensity="soft" tone="media" focus="left" />
      <div className={`${styles.container} relative z-10`}>
        <Reveal className={styles.motionLead}>
          <h2 className={styles.motionTitle}>Motion Work</h2>
          <p className={styles.motionCopy}>
            Grace shows identity, interface, and motion working as one calm product.
          </p>
        </Reveal>

        <Reveal delay={0.08} className={styles.motionMediaReveal}>
          <div className={styles.motionMediaWrap}>
            <div className={styles.motionMedia}>
              <GraceVideo
                startAt={20}
                className={styles.motionVideo}
                label="Grace identity, interface, and motion sequence"
              />
              <div className={styles.motionMediaShade} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
