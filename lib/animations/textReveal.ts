import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);


export function revealLines(
  el: HTMLElement,
  options: {
    stagger?: number;
    duration?: number;
    start?: string;
    delay?: number;
  } = {},
) {
  const {
    stagger = 0.1,
    duration = 1.0,
    start = "top 85%",
    delay = 0,
  } = options;
  const split = new SplitType(el, { types: "lines" });

  if (!split.lines?.length) return;

  
  split.lines.forEach((line) => {
    const wrapper = document.createElement("div");
    wrapper.style.overflow = "hidden";
    wrapper.style.display = "block";
    line.parentNode?.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  gsap.from(split.lines, {
    yPercent: 105,
    opacity: 0,
    stagger,
    duration,
    delay,
    ease: "power4.out",
    scrollTrigger: {
      trigger: el,
      start,
      toggleActions: "play none none none",
    },
  });
}


export function revealChars(
  el: HTMLElement,
  options: {
    stagger?: number;
    duration?: number;
    start?: string;
    y?: number;
  } = {},
) {
  const { stagger = 0.04, duration = 1.1, start = "top 80%", y = 60 } = options;
  const split = new SplitType(el, { types: "chars" });

  if (!split.chars?.length) return;

  gsap.from(split.chars, {
    y,
    opacity: 0,
    stagger,
    duration,
    ease: "power4.out",
    scrollTrigger: {
      trigger: el,
      start,
      toggleActions: "play none none none",
    },
  });
}


export function revealWords(
  el: HTMLElement,
  options: {
    stagger?: number;
    duration?: number;
    start?: string;
  } = {},
) {
  const { stagger = 0.08, duration = 1.0, start = "top 82%" } = options;
  const split = new SplitType(el, { types: "words" });

  if (!split.words?.length) return;

  gsap.from(split.words, {
    yPercent: 110,
    opacity: 0,
    stagger,
    duration,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start,
      toggleActions: "play none none none",
    },
  });
}


export function revealFade(
  elements: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>,
  options: {
    stagger?: number;
    duration?: number;
    y?: number;
    start?: string;
  } = {},
) {
  const { stagger = 0.1, duration = 0.9, y = 40, start = "top 85%" } = options;

  gsap.from(elements, {
    y,
    opacity: 0,
    stagger,
    duration,
    ease: "power3.out",
    scrollTrigger: {
      trigger: Array.isArray(elements) ? elements[0] : elements,
      start,
      toggleActions: "play none none none",
    },
  });
}


export function revealLine(
  el: HTMLElement,
  options: { start?: string; duration?: number; delay?: number } = {},
) {
  const { start = "top 85%", duration = 0.8, delay = 0 } = options;

  gsap.from(el, {
    scaleX: 0,
    transformOrigin: "left center",
    duration,
    delay,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: el,
      start,
      toggleActions: "play none none none",
    },
  });
}
