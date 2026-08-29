"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useCallback, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";
import { caseStudies } from "@/lib/data";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import styles from "./ProjectPortfolio.module.css";

const ORBIT_COUNT = 18;
const ORBIT_STEP = 360 / ORBIT_COUNT;
const ORBIT_PROJECTS = [0, 1, 2, 3, 4, 0, 2, 4, 1, 3, 0, 4, 2, 1, 3, 0, 4, 2] as const;
const ORBIT_SIZES = ["small", "large", "medium", "large", "small", "medium", "large", "small", "medium", "large", "small", "medium", "large", "small", "medium", "large", "small", "medium"] as const;
const ORBIT_SHAPES = ["square", "portrait", "square", "landscape", "square", "portrait", "square", "landscape", "portrait", "square", "landscape", "square", "portrait", "square", "landscape", "portrait", "square", "landscape"] as const;

const projectImages: Record<string, string> = {
  grace: "/brand/grace/grace-animation-poster.jpg",
  "orbit-artist-group": "/brand/projects/orbit-artist-group-orbit.png",
  "media-scaling": "/brand/projects/media-scaling-orbit.png",
  soniq: "/brand/projects/soniq-orbit.png",
  "dividends-total-returns": "/brand/projects/dividends-total-returns-orbit.png",
};

function discipline(category: string) {
  return category.split(",")[0];
}

function OrbitTile({
  itemIndex,
  projectIndex,
  activeIndex,
  rotation,
  reducedRotation,
  reducedMotion,
  onSelect,
  onKeyDown,
}: {
  itemIndex: number;
  projectIndex: number;
  activeIndex: number;
  rotation: MotionValue<number>;
  reducedRotation: number;
  reducedMotion: boolean;
  onSelect: (index: number) => void;
  onKeyDown: (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => void;
}) {
  const study = caseStudies[projectIndex];
  const angle = itemIndex * ORBIT_STEP;
  const counterRotation = useTransform(rotation, (latest) => -(latest + angle));
  const isFocus = itemIndex === activeIndex;

  return (
    <div
      className={styles.orbitArm}
      style={{ "--arm-angle": `${angle}deg` } as CSSProperties}
    >
      <div className={styles.tileAnchor}>
        <motion.button
          type="button"
          className={styles.projectTile}
          data-orbit-item={itemIndex}
          data-orbit-primary-index={itemIndex < caseStudies.length ? itemIndex : undefined}
          data-active={isFocus}
          data-selected={projectIndex === activeIndex}
          data-size={ORBIT_SIZES[itemIndex]}
          data-shape={ORBIT_SHAPES[itemIndex]}
          aria-pressed={projectIndex === activeIndex}
          aria-label={`Select ${study.client} project`}
          onClick={() => onSelect(projectIndex)}
          onKeyDown={(event) => onKeyDown(event, projectIndex)}
          style={{
            rotate: reducedMotion ? -(reducedRotation + angle) : counterRotation,
          }}
          animate={{ scale: isFocus ? 1.08 : 1 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={projectImages[study.slug]}
            alt={`${study.client} project visual`}
            fill
            sizes="(max-width: 767px) 110px, 160px"
            className={styles.projectImage}
            draggable={false}
          />
          <span className={styles.tileShade} aria-hidden="true" />
        </motion.button>
      </div>
    </div>
  );
}

export function WorkCarousel() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = Boolean(usePrefersReducedMotion());
  const activeStudy = caseStudies[activeIndex];
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const targetRotation = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(caseStudies.length - 1) * ORBIT_STEP],
  );
  const rotation = useSpring(targetRotation, {
    stiffness: 86,
    damping: 24,
    mass: 0.72,
  });
  const reducedRotation = -activeIndex * ORBIT_STEP;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.max(
      0,
      Math.min(caseStudies.length - 1, Math.round(latest * (caseStudies.length - 1))),
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const selectProject = useCallback((requestedIndex: number) => {
    const nextIndex = Math.max(0, Math.min(caseStudies.length - 1, requestedIndex));
    setActiveIndex(nextIndex);

    const scene = sceneRef.current;
    if (!scene) return;
    const sceneTop = window.scrollY + scene.getBoundingClientRect().top;
    const travel = Math.max(1, scene.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: sceneTop + travel * (nextIndex / (caseStudies.length - 1)),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [reducedMotion]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = index + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = index - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = caseStudies.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    const boundedIndex = Math.max(0, Math.min(caseStudies.length - 1, nextIndex));
    selectProject(boundedIndex);
    window.setTimeout(() => {
      document.querySelector<HTMLButtonElement>(`[data-orbit-primary-index="${boundedIndex}"]`)?.focus();
    }, reducedMotion ? 0 : 450);
  };

  return (
    <section
      id="selected-work"
      data-portfolio-index={activeIndex}
      className={`${styles.section} section-flow relative`}
    >
      <div ref={sceneRef} className={styles.portfolioScroll}>
        <div className={styles.portfolioSticky}>
          <div className={styles.stage}>
            <Image
              src="/brand/hero-glass.png"
              alt=""
              fill
              sizes="100vw"
              className={styles.prismField}
              draggable={false}
            />
            <div className={styles.instrumentation}>
              <span>Project portfolio</span>
              <span>Scroll / select / open</span>
            </div>

            <div className={styles.rotorPosition} aria-label="Project portfolio orbit">
              <motion.div
                className={styles.orbitRotor}
                style={{ rotate: reducedMotion ? reducedRotation : rotation }}
              >
                {ORBIT_PROJECTS.map((projectIndex, itemIndex) => (
                  <OrbitTile
                    key={`${itemIndex}-${caseStudies[projectIndex].slug}`}
                    itemIndex={itemIndex}
                    projectIndex={projectIndex}
                    activeIndex={activeIndex}
                    rotation={rotation}
                    reducedRotation={reducedRotation}
                    reducedMotion={reducedMotion}
                    onSelect={selectProject}
                    onKeyDown={handleKeyDown}
                  />
                ))}
              </motion.div>
            </div>

            <div className={styles.orbitCenter} aria-live="polite">
              <span className={styles.centerIndex}>
                {String(activeIndex + 1).padStart(2, "0")} / 05
              </span>
              <h2>Project Portfolio</h2>
              <div key={activeStudy.slug} className={styles.activeProject}>
                <strong>{activeStudy.client}</strong>
                <span>{discipline(activeStudy.category)} / {activeStudy.year}</span>
                <Link href={`/work/${activeStudy.slug}`} className={styles.openProject}>
                  Open project
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
