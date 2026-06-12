import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export function createHorizontalScroll(
  sectionEl: HTMLElement,
  trackEl: HTMLElement,
  options?: {
    onUpdate?: (progress: number) => void;
  },
) {
  const getScrollAmount = () =>
    Math.max(1, trackEl.scrollWidth - window.innerWidth);

  const tween = gsap.to(trackEl, {
    x: () => -getScrollAmount(),
    ease: "none",
    scrollTrigger: {
      trigger: sectionEl,
      start: "top top",
      end: () => `+=${getScrollAmount()}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => options?.onUpdate?.(self.progress),
    },
  });

  return tween;
}
