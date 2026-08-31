"use client";

import { Box, Code2, Sun, Zap } from "lucide-react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { Container } from "../ui/Container";
import styles from "./CapabilityStack.module.css";

const stack = [
  { title: "AI Agents", descriptor: "Autonomous", Icon: Sun },
  { title: "Software", descriptor: "Reliable", Icon: Code2 },
  { title: "Automation", descriptor: "Efficient", Icon: Zap },
  { title: "Product Systems", descriptor: "Scalable", Icon: Box },
] as const;

export function CapabilityStack() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.max(0, Math.min(stack.length - 1, Math.floor(latest * stack.length)));
    setActiveIndex((current) => (current === next ? current : next));
  });

  const select = (index: number) => setActiveIndex(Math.max(0, Math.min(stack.length - 1, index)));

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
    document.getElementById("capability-control-" + bounded)?.focus();
  };

  return (
    <section id="capabilities" aria-labelledby="capabilities-title" data-capability-index={activeIndex} className={styles.section}>
      <div ref={sceneRef} className={styles.scrollScene}>
        <div className={styles.stickyStage}>
          <Container className={styles.container}>
            <div className={styles.instrumentation}>
              <h2 id="capabilities-title">Capabilities</h2>
              <span>{String(activeIndex + 1).padStart(2, "0")} / 04</span>
            </div>

            <div className={styles.capabilityGrid} role="tablist" aria-label="Capabilities">
              {stack.map(({ title, descriptor, Icon }, index) => (
                <button
                  key={title}
                  id={"capability-control-" + index}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  tabIndex={index === activeIndex ? 0 : -1}
                  data-active={index === activeIndex}
                  className={styles.capability}
                  onClick={() => select(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  <Icon aria-hidden="true" className={styles.capabilityIcon} strokeWidth={1.25} />
                  <span className={styles.capabilityNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <strong className={styles.capabilityTitle}>{title}</strong>
                  <span className={styles.capabilityDescriptor}>{descriptor}</span>
                </button>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
