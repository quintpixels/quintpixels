"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/providers/SmoothScrollProvider";

function getScrollProgress() {
  const root = document.documentElement;
  const maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
  return Math.min(1, Math.max(0, window.scrollY / maxScroll));
}

function isInsideHiddenProgressSection() {
  const hiddenSections = document.querySelectorAll<HTMLElement>(
    "[data-hide-scroll-progress]",
  );

  return Array.from(hiddenSections).some((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.72 && rect.bottom > 0;
  });
}

function getScrollNudge(percent: number) {
  if (percent >= 98) return "You made it to the bottom";
  if (percent >= 75) return "Last stretch, keep going";
  if (percent >= 45) return "More pixels below";
  if (percent >= 12) return "Good start, scroll on";
  return "Tiny scroll, big reveal";
}

export function ScrollProgressIndicator() {
  const lenis = useLenis();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isHiddenSection, setIsHiddenSection] = useState(true);
  const rafRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const clearTimers = () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    const showAfterScroll = () => {
      setIsVisible(!isInsideHiddenProgressSection());
    };

    const update = () => {
      rafRef.current = null;
      setProgress(getScrollProgress());
      setIsHiddenSection(isInsideHiddenProgressSection());
    };

    const schedule = (scrolling = true) => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(update);
      if (!scrolling) return;

      setIsVisible(false);
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = window.setTimeout(showAfterScroll, 180);
    };

    const onScroll = () => schedule(true);
    const onResize = () => schedule(false);

    lenis?.on("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    schedule(false);

    return () => {
      clearTimers();
      lenis?.off("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [lenis]);

  const percent = Math.round(progress * 100);
  const dash = 118;
  const nudge = getScrollNudge(percent);

  return (
    <aside
      className={`scroll-progress ${isVisible && !isHiddenSection ? "scroll-progress--visible" : ""}`}
      aria-label={`Scroll progress ${percent}%`}
    >
      <span className="scroll-progress__label">
        {percent >= 98 ? "Almost done" : "Keep scrolling"}
      </span>
      <span className="scroll-progress__value">{percent}%</span>
      <span className="scroll-progress__tip">{nudge}</span>
      <span className="scroll-progress__line" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </span>
      <svg
        className="scroll-progress__ring"
        width="46"
        height="46"
        viewBox="0 0 46 46"
        aria-hidden="true"
      >
        <circle className="scroll-progress__track" cx="23" cy="23" r="19" />
        <circle
          className="scroll-progress__bar"
          cx="23"
          cy="23"
          r="19"
          strokeDasharray={dash}
          strokeDashoffset={dash - dash * progress}
        />
      </svg>
    </aside>
  );
}
