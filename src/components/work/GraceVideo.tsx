"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function GraceVideo({
  className,
  controls = false,
  label = "Grace animation final",
}: {
  className?: string;
  controls?: boolean;
  label?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <video
      aria-label={label}
      className={cn("block h-full w-full object-cover", className)}
      src="/brand/grace/grace-animation.mp4"
      muted
      playsInline
      autoPlay={!reducedMotion}
      loop={!reducedMotion}
      controls={controls}
      preload="metadata"
    />
  );
}
