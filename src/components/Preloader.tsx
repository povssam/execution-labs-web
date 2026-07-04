"use client";

import { useEffect, useState } from "react";
import { Logo } from "./brand/Logo";

export function Preloader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t: number | undefined;
    const frame = window.requestAnimationFrame(() => {
      setVisible(true);
      t = window.setTimeout(() => setVisible(false), 760);
    });
    return () => {
      window.cancelAnimationFrame(frame);
      if (t) window.clearTimeout(t);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="preloader pointer-events-none fixed inset-0 z-[80] flex items-center justify-center"
      aria-hidden
    >
      <div className="preloader-mark glass flex items-center gap-3 rounded-full border border-line px-4 py-3 shadow-2xl shadow-black/30">
        <Logo size={34} className="rounded-md" />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim">
          Execution Labs
        </span>
      </div>
    </div>
  );
}
