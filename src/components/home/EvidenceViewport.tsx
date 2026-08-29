"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { caseStudies } from "@/lib/data";
import { Container } from "../ui/Container";
import styles from "./EvidenceViewport.module.css";

const media: Record<string, string> = {
  grace: "/brand/grace/grace-animation-poster.jpg",
  "orbit-artist-group": "/brand/projects/orbit-artist-group-orbit.png",
  "media-scaling": "/brand/projects/media-scaling-orbit.png",
  soniq: "/brand/projects/soniq-orbit.png",
  "dividends-total-returns": "/brand/projects/dividends-total-returns-orbit.png",
};

export function EvidenceViewport() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const active = caseStudies[activeIndex];
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.max(0, Math.min(caseStudies.length - 1, Math.floor(latest * caseStudies.length)));
    setActiveIndex((current) => (current === next ? current : next));
  });

  const select = (index: number) => {
    setActiveIndex(index);
    const scene = sceneRef.current;
    if (!scene) return;
    const top = window.scrollY + scene.getBoundingClientRect().top;
    const travel = Math.max(1, scene.offsetHeight - window.innerHeight);
    window.scrollTo({ top: top + travel * (index / (caseStudies.length - 1)), behavior: reduceMotion ? "auto" : "smooth" });
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = caseStudies.length - 1;
    if (next === null) return;
    event.preventDefault();
    const bounded = Math.max(0, Math.min(caseStudies.length - 1, next));
    select(bounded);
    document.getElementById(`evidence-tab-${bounded}`)?.focus();
  };

  return (
    <section id="proof" data-evidence-index={activeIndex} className={styles.section}>
      <div ref={sceneRef} className={styles.scrollScene}>
        <div className={styles.stickyStage}>
          <Container className={styles.container}>
            <div className={styles.instrumentation}><span>05 / Evidence</span><span>{String(activeIndex + 1).padStart(2, "0")} / 05</span></div>
            <div className={styles.viewport}>
              <AnimatePresence mode="sync" initial={false}>
                <motion.div key={active.slug} data-media={active.slug} className={styles.media} initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.018 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0.2 : 0.5 }}>
                  {active.slug === "grace" && !reduceMotion ? (
                    <video className={styles.video} autoPlay muted loop playsInline poster={media.grace}><source src="/brand/grace/grace-animation.mp4" type="video/mp4" /></video>
                  ) : (
                    <Image src={media[active.slug]} alt={`${active.client} project evidence`} fill sizes="(max-width: 767px) 100vw, 1200px" className={styles.image} />
                  )}
                </motion.div>
              </AnimatePresence>
              <div className={styles.shade} />
              <div className={styles.readout} aria-live="polite">
                <span>{active.category.split(",")[0]} / {active.year}</span><h2>{active.client}</h2><p>{active.artifact}</p>
                <Link href={`/work/${active.slug}`}>Open project <ArrowUpRight size={14} aria-hidden="true" /></Link>
              </div>
              <div className={styles.controls} role="tablist" aria-label="Project evidence">
                {caseStudies.map((study, index) => (
                  <button key={study.slug} id={`evidence-tab-${index}`} type="button" role="tab" aria-selected={index === activeIndex} tabIndex={index === activeIndex ? 0 : -1} onClick={() => select(index)} onKeyDown={(event) => onKeyDown(event, index)}><span>{String(index + 1).padStart(2, "0")}</span><span className="sr-only">{study.client}</span></button>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
