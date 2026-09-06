"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { Container } from "../ui/Container";
import styles from "./ProjectPortfolio.module.css";

type ProjectSample = {
  id: string;
  slug: string;
  src: string;
};

const projectSamples: readonly ProjectSample[] = [
  { id: "grace", slug: "grace", src: "/brand/grace/grace-avatar.jpg" },
  { id: "media-scaling", slug: "media-scaling", src: "/brand/projects/media-scaling-orbit.png" },
  { id: "dividends-total-returns", slug: "dividends-total-returns", src: "/brand/projects/dividends-total-returns-orbit.png" },
  { id: "orbit-artist-group", slug: "orbit-artist-group", src: "/brand/projects/orbit-artist-group-orbit.png" },
  { id: "soniq", slug: "soniq", src: "/brand/projects/soniq-orbit.png" },
];

// Dedupe before rendering so one project ID can never produce two cards.
const uniqueProjects = projectSamples.filter((project, index, projects) =>
  projects.findIndex((candidate) => candidate.id === project.id) === index,
);

const orbitSamples = uniqueProjects.map((project, slot) => ({
  ...project,
  slot,
  position: slot - (uniqueProjects.length - 1) / 2,
  baseRotation: (slot - (uniqueProjects.length - 1) / 2) * 1.5,
}));

function PortfolioCard({
  sample,
  progress,
  reduceMotion,
  isFocal,
  onSelect,
}: {
  sample: (typeof orbitSamples)[number];
  progress: MotionValue<number>;
  reduceMotion: boolean;
  isFocal: boolean;
  onSelect: () => void;
}) {
  const transform = useTransform(progress, (value) => {
    const progressValue = Math.max(0, Math.min(1, value));
    if (reduceMotion) {
      return `translate3d(0, 0, 0) rotate(${sample.baseRotation}deg)`;
    }

    const travel = (progressValue - 0.5) * 2;
    const rate = 0.84 + sample.slot * 0.06;
    const x = travel * sample.position * 4 * rate;
    const y = travel * (sample.slot % 2 === 0 ? 3 : -3);
    const rotation = sample.baseRotation + travel * sample.position * 0.7;
    return `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rotation.toFixed(2)}deg)`;
  });

  return (
    <div
      className={styles.orbitArm}
      data-project-id={sample.id}
    >
      <motion.div className={styles.tileUpright} style={{ transform }}>
        <button
          type="button"
          className={styles.tile}
          data-focal={isFocal}
          aria-label={isFocal ? `Open ${sample.slug} project` : `Focus ${sample.slug} project sample`}
          onClick={(event) => {
            event.stopPropagation();
            onSelect();
          }}
        >
          <span className={styles.tileMedia}>
            <Image
              src={sample.src}
              alt=""
              fill
              sizes="(max-width: 767px) 64px, 112px"
              className={styles.tileImage}
              draggable={false}
            />
          </span>
        </button>
      </motion.div>
    </div>
  );
}

export function ProjectPortfolio() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const router = useRouter();
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start center", "end center"],
  });

  const select = useCallback((requestedIndex: number, scrollToState = true) => {
    const next = ((requestedIndex % orbitSamples.length) + orbitSamples.length) % orbitSamples.length;
    activeRef.current = next;
    setActiveIndex(next);

    if (!scrollToState || !sceneRef.current) return;

    const scene = sceneRef.current;
    const top = window.scrollY + scene.getBoundingClientRect().top;
    const travel = Math.max(1, scene.offsetHeight - window.innerHeight);
    const progress = next / (orbitSamples.length - 1);
    window.scrollTo({
      top: top + travel * progress,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [reduceMotion]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.round(Math.max(0, Math.min(1, latest)) * (orbitSamples.length - 1));
    if (next === activeRef.current) return;
    activeRef.current = next;
    setActiveIndex(next);
  });

  const openSample = useCallback((sample: (typeof orbitSamples)[number]) => {
    router.push(`/work/${sample.slug}`);
  }, [router]);

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      select(activeRef.current + 1, false);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      select(activeRef.current - 1, false);
    }
    if (event.key === "Home") {
      event.preventDefault();
      select(0, false);
    }
    if (event.key === "End") {
      event.preventDefault();
      select(orbitSamples.length - 1, false);
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openSample(orbitSamples[activeRef.current]);
    }
  };

  return (
    <section
      id="selected-work"
      className={styles.section}
      data-portfolio-index={activeIndex}
      aria-labelledby="portfolio-title"
    >
      <div ref={sceneRef} className={styles.scrollScene}>
        <div className={styles.stickyStage}>
          <Container className={styles.container}>
            <div className={styles.instrumentation}>
              <span>03 / Selected work</span>
            </div>

            <div
              className={styles.orbitStage}
              tabIndex={0}
              role="group"
              aria-label="Project portfolio. Scroll through the gallery or use arrow keys to move between projects. Press Enter to open the focused project."
              onKeyDown={onKeyDown}
            >
              <div className={styles.orbitRotor}>
                {orbitSamples.map((sample) => (
                  <PortfolioCard
                    key={sample.id}
                    sample={sample}
                    progress={scrollYProgress}
                    reduceMotion={reduceMotion}
                    isFocal={sample.slot === activeIndex}
                    onSelect={() => {
                      if (sample.slot === activeRef.current) openSample(sample);
                      else select(sample.slot, false);
                    }}
                  />
                ))}
              </div>

              <div className={styles.centerReadout}>
                <h2 id="portfolio-title">Project Portfolio</h2>
                <p>Selected work from Execution Labs.</p>
                <button
                  type="button"
                  className={styles.centerAction}
                  onClick={(event) => {
                    event.stopPropagation();
                    router.push("/work");
                  }}
                >
                  View work
                </button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
