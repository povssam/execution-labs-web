"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { caseStudies, type CaseStudy, type PreviewKind } from "@/lib/data";
import { GraceVideo } from "@/components/work/GraceVideo";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import styles from "./ProjectPortfolio.module.css";

const tilePositions = [
  { left: "16%", top: "57%", rotate: "-8deg" },
  { left: "25%", top: "24%", rotate: "-6deg" },
  { left: "50%", top: "8%", rotate: "2deg" },
  { left: "75%", top: "24%", rotate: "7deg" },
  { left: "84%", top: "57%", rotate: "10deg" },
] as const;

const proofItems = (study: CaseStudy) => study.proof.split(",").map((item) => item.trim());

function discipline(study: CaseStudy) {
  return study.category.split(",")[0];
}

function ArtifactSurface({ study, mobile = false }: { study: CaseStudy; mobile?: boolean }) {
  if (study.assets?.video) {
    return (
      <div className={styles.videoSurface}>
        {mobile ? (
          <Image
            src="/brand/grace/grace-animation-poster.jpg"
            alt={`${study.client} motion proof`}
            fill
            sizes="78vw"
            className={styles.videoPoster}
          />
        ) : (
          <GraceVideo autoPlay desktopOnly label={`${study.client} motion proof`} />
        )}
        <div className={styles.videoSheen} aria-hidden="true" />
        <span className={styles.mediaLabel}>motion proof</span>
      </div>
    );
  }

  const items = proofItems(study);

  return (
    <div className={styles.artifactSurface} data-kind={study.preview as PreviewKind}>
      <div className={styles.artifactGrid} aria-hidden="true" />
      <div className={styles.artifactPrism} aria-hidden="true" />
      <div className={styles.artifactHeader}>
        <span>{study.tags[0]}</span>
        <span>{study.year}</span>
      </div>

      {study.preview === "queue" && (
        <div className={styles.artifactQueue} aria-hidden="true">
          {items.map((item, index) => (
            <span key={item} style={{ "--queue-index": index } as React.CSSProperties}>
              <i />
              {item}
            </span>
          ))}
        </div>
      )}

      {study.preview === "bars" && (
        <div className={styles.artifactBars} aria-hidden="true">
          {["18%", "34%", "28%", "56%", "44%", "68%", "51%", "78%"].map((height, index) => (
            <i key={index} style={{ "--bar-height": height } as React.CSSProperties} />
          ))}
        </div>
      )}

      {study.preview === "lines" && (
        <svg className={styles.artifactLines} viewBox="0 0 220 100" fill="none" aria-hidden="true">
          <path d="M4 78 C24 78 28 44 46 44 S66 84 84 84 S106 22 126 22 S150 64 170 64 S190 35 216 35" />
          <path d="M4 88 C32 88 36 62 52 62 S78 92 98 92 S120 42 140 42 S166 76 184 76 S202 57 216 57" />
          <circle cx="126" cy="22" r="4" />
          <circle cx="170" cy="64" r="4" />
        </svg>
      )}

      {study.preview === "rings" && (
        <div className={styles.artifactRings} aria-hidden="true">
          <span />
          <span />
          <span />
          <b>return</b>
        </div>
      )}

      <div className={styles.artifactFooter}>
        <span>{study.artifact}</span>
        <span>{items[0]}</span>
      </div>
    </div>
  );
}

function ProjectTile({
  study,
  index,
  active,
  onSelect,
  onKeyDown,
}: {
  study: CaseStudy;
  index: number;
  active: boolean;
  onSelect: (index: number) => void;
  onKeyDown: (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => void;
}) {
  const position = tilePositions[index];

  return (
    <button
      type="button"
      className={styles.projectTile}
      data-portfolio-tile-index={index}
      data-active={active}
      aria-pressed={active}
      aria-label={`Select ${study.client} project`}
      onClick={() => onSelect(index)}
      onKeyDown={(event) => onKeyDown(event, index)}
      style={
        {
          "--tile-left": position.left,
          "--tile-top": position.top,
          "--tile-rotate": position.rotate,
        } as React.CSSProperties
      }
    >
      <span className={styles.tileMedia}>
        <ArtifactSurface study={study} />
      </span>
      <span className={styles.tileCaption}>
        <span>{study.client}</span>
        <span>{discipline(study)}</span>
      </span>
    </button>
  );
}

export function WorkCarousel() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const mobileRailRef = useRef<HTMLDivElement | null>(null);
  const mobileCards = useRef<Array<HTMLButtonElement | null>>([]);
  const scrollFrame = useRef<number | null>(null);
  const mobileScrollFrame = useRef<number | null>(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const activeStudy = caseStudies[activeIndex];

  const setActive = useCallback((requestedIndex: number) => {
    const nextIndex = Math.max(0, Math.min(caseStudies.length - 1, requestedIndex));
    activeRef.current = nextIndex;
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    return nextIndex;
  }, []);

  const centerMobileCard = useCallback((index: number) => {
    const rail = mobileRailRef.current;
    const card = mobileCards.current[index];
    if (!rail || !card) return;

    rail.scrollTo({
      left: Math.max(0, card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [reducedMotion]);

  const selectProject = useCallback((requestedIndex: number, centerMobile = true) => {
    const nextIndex = setActive(requestedIndex);
    if (centerMobile && window.matchMedia("(max-width: 767px)").matches) {
      centerMobileCard(nextIndex);
    }
  }, [centerMobileCard, setActive]);

  useEffect(() => {
    const updateFromScroll = () => {
      scrollFrame.current = null;
      if (window.matchMedia("(max-width: 767px)").matches) return;

      const scene = sceneRef.current;
      if (!scene) return;
      const bounds = scene.getBoundingClientRect();
      const travel = Math.max(1, scene.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.42 - bounds.top) / travel));
      setActive(Math.round(progress * (caseStudies.length - 1)));
    };

    const onScroll = () => {
      if (scrollFrame.current !== null) return;
      scrollFrame.current = window.requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scrollFrame.current !== null) window.cancelAnimationFrame(scrollFrame.current);
    };
  }, [setActive]);

  useEffect(() => {
    const updateFromMobileScroll = () => {
      mobileScrollFrame.current = null;
      const rail = mobileRailRef.current;
      if (!rail || !window.matchMedia("(max-width: 767px)").matches) return;

      const center = rail.getBoundingClientRect().left + rail.clientWidth / 2;
      let closestIndex = activeRef.current;
      let closestDistance = Number.POSITIVE_INFINITY;

      mobileCards.current.forEach((card, index) => {
        if (!card) return;
        const cardCenter = card.getBoundingClientRect().left + card.offsetWidth / 2;
        const distance = Math.abs(center - cardCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActive(closestIndex);
    };

    const onScroll = () => {
      if (mobileScrollFrame.current !== null) return;
      mobileScrollFrame.current = window.requestAnimationFrame(updateFromMobileScroll);
    };

    const rail = mobileRailRef.current;
    rail?.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      rail?.removeEventListener("scroll", onScroll);
      if (mobileScrollFrame.current !== null) window.cancelAnimationFrame(mobileScrollFrame.current);
    };
  }, [setActive]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = index + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = index - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = caseStudies.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    selectProject(nextIndex);
    window.requestAnimationFrame(() => {
      const boundedIndex = Math.max(0, Math.min(caseStudies.length - 1, nextIndex!));
      const selector = window.matchMedia("(max-width: 767px)").matches
        ? `[data-mobile-project="${boundedIndex}"]`
        : `[data-portfolio-tile-index="${boundedIndex}"]`;
      document.querySelector<HTMLButtonElement>(selector)?.focus();
    });
  };

  return (
    <section
      id="selected-work"
      data-portfolio-index={activeIndex}
      className={`${styles.section} section-flow relative`}
    >
      <BrandAtmosphere intensity="soft" tone="media" focus="right" />
      <Container className={`${styles.container} relative z-10`}>
        <div className={styles.intro}>
          <span>03 / Project portfolio</span>
          <span>Scroll / select / open</span>
        </div>

        <div ref={sceneRef} className={styles.portfolioScroll}>
          <div className={styles.portfolioSticky}>
            <div className={styles.portfolioStage}>
              <svg className={styles.orbit} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <ellipse cx="50" cy="51" rx="43" ry="38" />
                <path d="M10 58 C20 9 80 9 90 58" />
                <path d="M18 73 C30 96 70 96 82 73" />
                <circle cx="50" cy="13" r="1.2" />
                <circle cx="16" cy="57" r="1.2" />
                <circle cx="84" cy="57" r="1.2" />
              </svg>

              <div className={styles.orbitRule} aria-hidden="true" />

              <div className={styles.desktopTiles} role="list" aria-label="Project portfolio">
                {caseStudies.map((study, index) => (
                  <span key={study.slug} role="listitem">
                    <ProjectTile
                      study={study}
                      index={index}
                      active={index === activeIndex}
                      onSelect={selectProject}
                      onKeyDown={handleKeyDown}
                    />
                  </span>
                ))}
              </div>

              <div className={styles.core} aria-live="polite">
                <div key={activeStudy.slug} className={styles.coreContent}>
                  <span className={styles.coreIndex}>Project portfolio / {String(activeIndex + 1).padStart(2, "0")}—05</span>
                  <h2 id="selected-work-title" className={styles.coreTitle}>
                    Project<br />
                    Portfolio
                  </h2>
                  <div className={styles.coreProject}>
                    <div className={styles.coreProjectHeader}>
                      <span>{activeStudy.client}</span>
                      <span>{activeStudy.year}</span>
                    </div>
                    <p className={styles.coreDiscipline}>{discipline(activeStudy)}</p>
                    <p className={styles.coreSummary}>{activeStudy.summary}</p>
                    <Link href={`/work/${activeStudy.slug}`} className={styles.coreLink}>
                      Open case study
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className={styles.stageFooter}>
                <span className={styles.stageFooterSignal} aria-hidden="true" />
                <span>Signal resolved / {activeStudy.artifact}</span>
                <span>{activeStudy.tags.slice(0, 2).join(" / ")}</span>
              </div>
            </div>

            <div ref={mobileRailRef} className={styles.mobileRail} role="list" aria-label="Project portfolio touch rail">
              {caseStudies.map((study, index) => (
                <button
                  key={study.slug}
                  ref={(element) => {
                    mobileCards.current[index] = element;
                  }}
                  type="button"
                  data-mobile-project={index}
                  data-active={index === activeIndex}
                  aria-pressed={index === activeIndex}
                  aria-label={`Select ${study.client} project`}
                  className={styles.mobileCard}
                  onClick={() => selectProject(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  <span className={styles.mobileCardMedia}>
                    <ArtifactSurface study={study} mobile />
                  </span>
                  <span className={styles.mobileCardMeta}>
                    <span>{study.client}</span>
                    <span>{discipline(study)}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.portfolioSteps} aria-hidden="true">
            {caseStudies.map((study) => (
              <div key={study.slug} className={styles.portfolioStep} data-portfolio-step={study.slug} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
