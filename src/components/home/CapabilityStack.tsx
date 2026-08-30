"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { Container } from "../ui/Container";
import styles from "./CapabilityStack.module.css";

const stack = [
  { title: "AI Agents", statement: "Observe. Reason. Decide. Act.", route: "observe → reason → decide → act" },
  { title: "Software", statement: "Inputs become a useful interface.", route: "inputs → interface → state → output" },
  { title: "Automation", statement: "The useful work keeps moving.", route: "trigger → route → execute → verify" },
  { title: "Product Systems", statement: "One layer holds the moving parts.", route: "subsystems → operating layer" },
] as const;

export function CapabilityStack() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.max(0, Math.min(stack.length - 1, Math.floor(latest * stack.length)));
    setActiveIndex((current) => (current === next ? current : next));
  });

  const select = (index: number) => {
    setActiveIndex(index);
    const scene = sceneRef.current;
    if (!scene) return;
    const top = window.scrollY + scene.getBoundingClientRect().top;
    const travel = Math.max(1, scene.offsetHeight - window.innerHeight);
    window.scrollTo({ top: top + travel * (index / (stack.length - 1)), behavior: reduceMotion ? "auto" : "smooth" });
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = stack.length - 1;
    if (next === null) return;
    event.preventDefault();
    const bounded = Math.max(0, Math.min(stack.length - 1, next));
    select(bounded);
    document.getElementById(`capability-control-${bounded}`)?.focus();
  };

  return (
    <section id="capabilities" data-capability-index={activeIndex} className={styles.section}>
      <div ref={sceneRef} className={styles.scrollScene}>
        <div className={styles.stickyStage}>
          <Container className={styles.container}>
            <div className={styles.instrumentation}>
              <span>02 / Capabilities</span>
              <span>{String(activeIndex + 1).padStart(2, "0")} / 04</span>
            </div>

            <div className={styles.systemObject} data-state={activeIndex} role="group" aria-label="Capability system">
              <div className={styles.systemHalo} />
              <svg className={styles.systemSvg} viewBox="0 0 1000 560" role="presentation">
                <motion.path className={styles.systemRoute} d={activeIndex === 0 ? "M118 278 C255 278 278 136 430 170 S623 420 858 280" : activeIndex === 1 ? "M122 172 H346 C416 172 424 280 500 280 H872" : activeIndex === 2 ? "M124 280 H300 C370 280 372 146 500 146 S632 414 868 414" : "M132 146 H320 C382 146 390 280 500 280 S628 146 692 146 H870"} initial={false} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: reduceMotion ? 0.18 : 0.62, ease: [0.22, 1, 0.36, 1] }} />
                <motion.path className={styles.systemRouteGhost} d={activeIndex === 0 ? "M118 350 C255 350 320 424 440 386 S640 160 858 222" : activeIndex === 1 ? "M128 390 H345 C418 390 422 280 500 280 H870" : activeIndex === 2 ? "M124 398 H286 C366 398 376 280 500 280 S642 282 868 282" : "M134 415 H320 C388 415 388 280 500 280 S640 415 868 415"} initial={false} animate={{ pathLength: 1 }} transition={{ duration: reduceMotion ? 0.18 : 0.62, ease: [0.22, 1, 0.36, 1] }} />
                {[[126, activeIndex === 0 ? 278 : activeIndex === 1 ? 172 : activeIndex === 2 ? 280 : 146], [500, activeIndex === 0 ? 246 : 280], [870, activeIndex === 0 ? 280 : activeIndex === 1 ? 280 : activeIndex === 2 ? 414 : 146]].map(([cx, cy], index) => <motion.circle key={index} className={styles.systemNode} cx={cx} cy={cy} r={index === 1 ? 16 : 8} animate={{ cx, cy }} transition={{ duration: reduceMotion ? 0.18 : 0.62, ease: [0.22, 1, 0.36, 1] }} />)}
                {!reduceMotion && <motion.circle className={styles.systemSignal} r="7" animate={activeIndex === 0 ? { cx: [126, 300, 500, 698, 870], cy: [278, 220, 250, 360, 280] } : activeIndex === 1 ? { cx: [126, 346, 500, 700, 870], cy: [172, 172, 280, 280, 280] } : activeIndex === 2 ? { cx: [126, 300, 500, 690, 868], cy: [280, 280, 146, 320, 414] } : { cx: [132, 320, 500, 690, 870], cy: [146, 146, 280, 146, 146] }} transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1], repeat: 0 }} />}
              </svg>
              <div className={styles.systemCore}><span>{String(activeIndex + 1).padStart(2, "0")}</span><strong>EL</strong></div>
              <motion.div id="capability-readout" role="tabpanel" key={stack[activeIndex].title} className={styles.readout} initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0.18 : 0.35 }}><span>{stack[activeIndex].route}</span><strong>{stack[activeIndex].statement}</strong></motion.div>
            </div>

            <div className={styles.controls} role="tablist" aria-label="Capabilities">
              {stack.map((capability, index) => (
                <button
                  key={capability.title}
                  id={`capability-control-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-controls="capability-readout"
                  tabIndex={index === activeIndex ? 0 : -1}
                  data-active={index === activeIndex}
                  onClick={() => select(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{capability.title}</strong>
                </button>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
