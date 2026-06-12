import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export function createWordCycle(
  sectionEl: HTMLElement,
  wordEls: HTMLElement[],
  options: {
    pinDuration?: number;
    scrub?: number;
  } = {},
) {
  const { pinDuration = 300, scrub = 1.2 } = options;
  const count = wordEls.length;

  
  gsap.set(wordEls, { opacity: 0, yPercent: 40 });
  gsap.set(wordEls[0], { opacity: 1, yPercent: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      start: "top top",
      end: `+=${pinDuration * count}`,
      pin: true,
      scrub,
    },
  });

  wordEls.forEach((el, i) => {
    if (i === 0) {
      tl.to(el, { opacity: 0, yPercent: -40, duration: 0.5 }, `+=0.5`);
    } else {
      tl.fromTo(
        el,
        { opacity: 0, yPercent: 40 },
        { opacity: 1, yPercent: 0, duration: 0.5 },
      );
      if (i < count - 1) {
        tl.to(el, { opacity: 0, yPercent: -40, duration: 0.5 }, `+=0.5`);
      }
    }
  });

  return tl;
}

/**
 * Dark section entrance — fade in background color
 */
export function createSectionEntrance(
  el: HTMLElement,
  options: { start?: string; fromY?: number } = {},
) {
  const { start = "top 80%", fromY = 60 } = options;

  gsap.from(el, {
    y: fromY,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start,
      toggleActions: "play none none none",
    },
  });
}
