import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BrandAtmosphere } from "@/components/BrandAtmosphere";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudy } from "@/lib/data";
import styles from "./SoniqCaseStudy.module.css";

const soniqArtifact = "/brand/projects/soniq-orbit.png";

export function SoniqCaseStudy({
  study,
  next,
}: {
  study: CaseStudy;
  next: CaseStudy;
}) {
  return (
    <>
      <main className={styles.page}>
        <section className={styles.hero}>
          <BrandAtmosphere intensity="section" tone="proof" focus="right" />
          <Container className={styles.heroContainer}>
            <Reveal>
              <Link href="/work" className={styles.backLink}>
                <ArrowLeft size={15} aria-hidden="true" />
                All work
              </Link>
            </Reveal>

            <Reveal delay={0.04} className={styles.titleBlock}>
              <span>{study.artifact}</span>
              <h1>{study.client}</h1>
              <div className={styles.meta}>
                <span>{study.category}</span>
                <span>{study.year}</span>
              </div>
              <p>A music product taken from concept to a usable MVP.</p>
            </Reveal>
          </Container>
        </section>

        <section className={styles.artifacts} aria-label="Soniq product artifacts">
          <Container>
            <Reveal className={styles.primaryFigure}>
              <figure>
                <div className={styles.primaryMedia}>
                  <Image
                    src={soniqArtifact}
                    alt="Soniq music product interface with waveform and playback controls"
                    fill
                    priority
                    sizes="(max-width: 767px) calc(100vw - 3rem), min(86rem, calc(100vw - 6rem))"
                    className={styles.primaryImage}
                  />
                </div>
                <figcaption>
                  <span>01</span>
                  <span>Product interface</span>
                </figcaption>
              </figure>
            </Reveal>

            <div className={styles.detailGrid}>
              <Reveal className={styles.detailFigure}>
                <figure>
                  <div className={`${styles.detailMedia} ${styles.waveform}`}>
                    <Image
                      src={soniqArtifact}
                      alt="Soniq waveform timeline detail"
                      fill
                      sizes="(max-width: 767px) calc(100vw - 3rem), 44vw"
                      className={styles.detailImage}
                    />
                  </div>
                  <figcaption>
                    <span>02</span>
                    <span>Waveform</span>
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal delay={0.04} className={styles.detailFigure}>
                <figure>
                  <div className={`${styles.detailMedia} ${styles.playback}`}>
                    <Image
                      src={soniqArtifact}
                      alt="Soniq playback controls detail"
                      fill
                      sizes="(max-width: 767px) calc(100vw - 3rem), 44vw"
                      className={styles.detailImage}
                    />
                  </div>
                  <figcaption>
                    <span>03</span>
                    <span>Playback</span>
                  </figcaption>
                </figure>
              </Reveal>
            </div>

            <Reveal className={styles.result}>
              <span>Result</span>
              <p>{study.result}</p>
            </Reveal>

            <Reveal className={styles.nextRow}>
              <Link href={`/work/${next.slug}`}>
                <span>Next project</span>
                <strong>{next.client}</strong>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </Reveal>
          </Container>
        </section>
      </main>

      <FinalCTA compact />
    </>
  );
}
