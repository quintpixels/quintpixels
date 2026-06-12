import { gsap } from "gsap";

export function createMagnetic(
  el: HTMLElement,
  options: {
    strength?: number;
    ease?: number;
  } = {},
) {
  const { strength = 0.4 } = options;

  const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

  const handleMouseMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * strength;
    const dy = (e.clientY - centerY) * strength;
    xTo(dx);
    yTo(dy);
  };

  const handleMouseLeave = () => {
    xTo(0);
    yTo(0);
  };

  el.addEventListener("mousemove", handleMouseMove);
  el.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    el.removeEventListener("mousemove", handleMouseMove);
    el.removeEventListener("mouseleave", handleMouseLeave);
  };
}
