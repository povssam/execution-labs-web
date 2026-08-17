"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
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
  startAt = 0,
}: {
  className?: string;
  controls?: boolean;
  label?: string;
  startAt?: number;
}) {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || startAt <= 0) return;

    const seekToStart = () => {
      if (video.duration > startAt) video.currentTime = startAt;
    };

    if (video.readyState >= 1) seekToStart();
    else video.addEventListener("loadedmetadata", seekToStart, { once: true });

    return () => video.removeEventListener("loadedmetadata", seekToStart);
  }, [startAt]);

  return (
    <video
      ref={videoRef}
      aria-label={label}
      className={cn("block h-full w-full object-cover", className)}
      src="/brand/grace/grace-animation.mp4"
      muted
      playsInline
      autoPlay={!reducedMotion}
      loop={!reducedMotion}
      controls={controls}
      preload="auto"
      poster="/brand/grace/grace-animation-poster.jpg"
    />
  );
}
