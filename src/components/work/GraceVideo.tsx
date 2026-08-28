"use client";

import { useSyncExternalStore } from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const QUERY = "(prefers-reduced-motion: reduce)";
const DESKTOP_QUERY = "(min-width: 768px)";

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

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export function GraceVideo({
  className,
  controls = false,
  autoPlay = false,
  desktopOnly = false,
  label = "Grace animation final",
}: {
  className?: string;
  controls?: boolean;
  autoPlay?: boolean;
  desktopOnly?: boolean;
  label?: string;
}) {
  const reducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();

  if (desktopOnly && !isDesktop) return null;

  return (
    <video
      aria-label={label}
      className={cn("block h-full w-full object-cover", className)}
      src="/brand/grace/grace-animation.mp4"
      muted
      playsInline
      autoPlay={autoPlay && !reducedMotion}
      loop={autoPlay && !reducedMotion}
      controls={controls}
      preload={autoPlay ? "auto" : "metadata"}
      poster="/brand/grace/grace-animation-poster.jpg"
    />
  );
}
