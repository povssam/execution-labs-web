"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Container } from "../ui/Container";

const words = "Building exceptional digital experiences for visionaries and innovators around the world.".split(
  " ",
);

export function GlobalStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.dataset.ready = "true";

    let fallbackTimer: number | null = window.setTimeout(() => {
      setVisible(true);
    }, 600);

    if (!("IntersectionObserver" in window)) {
      section.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
        if (fallbackTimer !== null) window.clearTimeout(fallbackTimer);
        fallbackTimer = null;
      },
      { rootMargin: "-12% 0px -12% 0px", threshold: 0.12 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (fallbackTimer !== null) window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="studio-statement"
      className="statement-section section-flow relative overflow-hidden"
      data-visible={visible}
    >
      <Container className="relative z-10">
        <p className="statement-copy mx-auto max-w-3xl text-center text-2xl font-medium leading-[1.18] text-bone sm:text-3xl lg:text-4xl">
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="statement-word"
              style={{ "--statement-index": index } as CSSProperties}
            >
              {word}
              {index < words.length - 1 ? "\u00a0" : ""}
            </span>
          ))}
        </p>
      </Container>
    </section>
  );
}
