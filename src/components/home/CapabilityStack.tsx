"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { Container } from "../ui/Container";
import styles from "./CapabilityStack.module.css";

const stack = [
  { title: "AI Agents", statement: "Observe. Decide. Act.", detail: "Tools, context, handoff." },
  { title: "Software", statement: "Useful software. Shipped.", detail: "A complete product, ready to judge." },
  { title: "Automation", statement: "Less repetition. Clearer handoffs.", detail: "Recurring work, routed cleanly." },
  { title: "Product Systems", statement: "The layer that holds up.", detail: "Product, data, infrastructure." },
] as const;

export function CapabilityStack() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const router = useRouter();
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.max(0, Math.min(stack.length - 1, Math.floor(latest * stack.length)));
    setActiveIndex((current) => (current === next ? current : next));
  });

  const select = (index: number) => {
    if (index === activeIndex) {
      router.push("/services");
      return;
    }
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
              <span>04 / Capabilities</span>
              <span>{String(activeIndex + 1).padStart(2, "0")} / 04</span>
            </div>

            <div className={styles.stackObject} role="group" aria-label="Capability stack">
              <Image src="/brand/hero-glass.png" alt="" fill sizes="(max-width: 767px) 100vw, 1100px" className={styles.prismField} draggable={false} />
              {stack.map((capability, index) => {
                const delta = index - activeIndex;
                const distance = Math.abs(delta);
                return (
                  <motion.button
                    key={capability.title}
                    id={`capability-plane-${index}`}
                    type="button"
                    aria-pressed={index === activeIndex}
                    aria-controls="capability-readout"
                    tabIndex={index === activeIndex ? 0 : -1}
                    className={styles.plane}
                    data-active={index === activeIndex}
                    onClick={() => select(index)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                    animate={reduceMotion ? { opacity: index === activeIndex ? 1 : 0.48 } : {
                      x: delta * 15,
                      y: delta * 66,
                      scale: 1 - distance * 0.035,
                      opacity: 1 - distance * 0.17,
                    }}
                    transition={{ duration: reduceMotion ? 0.18 : 0.52 }}
                    style={{ "--plane-z": stack.length - distance } as CSSProperties}
                  >
                    <span className={styles.planeIndex}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.planeTitle}>{capability.title}</span>
                    {index === activeIndex && (
                      <motion.span id="capability-readout" role="tabpanel" className={styles.readout} initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }}>
                        <strong>{capability.statement}</strong>
                        <small>{capability.detail}</small>
                        <span className={styles.action}>View capability <ArrowUpRight size={14} aria-hidden="true" /></span>
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
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
