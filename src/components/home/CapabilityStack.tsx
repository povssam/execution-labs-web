"use client";

import { Blocks, Bot, Code2, Workflow } from "lucide-react";
import { useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { Container } from "../ui/Container";
import styles from "./CapabilityStack.module.css";

const stack = [
  { title: "AI Agents", descriptor: "Autonomous", Icon: Bot },
  { title: "Software", descriptor: "Reliable", Icon: Code2 },
  { title: "Automation", descriptor: "Efficient", Icon: Workflow },
  { title: "Product Systems", descriptor: "Scalable", Icon: Blocks },
] as const;

export function CapabilityStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerRef = useRef<{ id: number; startX: number; startY: number } | null>(null);
  const suppressClick = useRef(false);

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

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" || pointerRef.current) return;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Synthetic touch events and a cancelled pointer may not be capturable.
    }
    pointerRef.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY };
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerRef.current;
    pointerRef.current = null;
    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // The pointer may already have been released by the browser.
    }
    if (!start || start.id !== event.pointerId) return;

    const deltaX = event.clientX - start.startX;
    const deltaY = event.clientY - start.startY;
    if (Math.abs(deltaX) < 32 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    suppressClick.current = true;
    select(activeIndex + (deltaX < 0 ? 1 : -1));
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  };

  return (
    <section id="capabilities" aria-labelledby="capabilities-title" data-capability-index={activeIndex} className={styles.section}>
      <div className={styles.scrollScene}>
        <div className={styles.stickyStage}>
          <Container className={styles.container}>
            <div className={styles.instrumentation}>
              <h2 id="capabilities-title">Capabilities</h2>
            </div>

            <div
              className={styles.capabilityGrid}
              role="tablist"
              aria-label="Capabilities"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => {
                pointerRef.current = null;
              }}
            >
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
                  onClick={() => {
                    if (!suppressClick.current) select(index);
                  }}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  <Icon aria-hidden="true" className={styles.capabilityIcon} strokeWidth={1.25} />
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
