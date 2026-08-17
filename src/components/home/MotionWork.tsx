import Image from "next/image";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Reveal } from "../ui/Reveal";
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
            Interface and motion working as one calm product.
          </p>
        </Reveal>

        <Reveal delay={0.08} className={styles.motionMediaReveal}>
          <div className={styles.motionMediaWrap}>
            <div className={styles.motionMedia}>
              <Image
                src="/media/generated/motion-work-study.webp"
                alt="Interface transitioning from wireframe geometry into a resolved motion surface"
                fill
                sizes="(max-width: 767px) calc(100vw - 16px), (max-width: 1440px) calc(100vw - 64px), 1440px"
                className={styles.motionImage}
              />
              <div className={styles.motionMediaShade} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
