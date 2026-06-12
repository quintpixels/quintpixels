"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function PixelCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;

        gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });

    const xTo = gsap.quickTo(el, "x", { duration: 0.1, ease: "power2.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.1, ease: "power2.out" });
    let visible = false;

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to(el, { opacity: 1, duration: 0.2 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement).closest(
        'a, button, [role="button"], [data-cursor], label, input, textarea',
      );
      gsap.to(el, {
        scale: interactive ? 2.2 : 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const onLeave = () => gsap.to(el, { opacity: 0, duration: 0.25 });
    const onEnter = () => {
      if (visible) gsap.to(el, { opacity: 1, duration: 0.25 });
    };
    const onDown = () => gsap.to(el, { scale: 0.6, duration: 0.1 });
    const onUp = () => gsap.to(el, { scale: 1, duration: 0.15 });

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

    return <div ref={ref} className="cursor-square" aria-hidden="true" />;
}
