import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export function animateHeroEntrance(containerEl: HTMLElement) {
  const tl = gsap.timeline({ delay: 0.3 });

  const topLine = containerEl.querySelector("[data-hero-top]");
  const mainLine = containerEl.querySelector("[data-hero-main]");
  const subLine = containerEl.querySelector("[data-hero-sub]");
  const cta = containerEl.querySelector("[data-hero-cta]");

  if (topLine) {
    const split = new SplitType(topLine as HTMLElement, { types: "chars" });
    tl.from(split.chars, {
      yPercent: 120,
      opacity: 0,
      stagger: 0.04,
      duration: 1.1,
      ease: "power4.out",
    });
  }

  if (mainLine) {
    const split = new SplitType(mainLine as HTMLElement, { types: "chars" });
    tl.from(
      split.chars,
      {
        yPercent: 120,
        opacity: 0,
        stagger: 0.05,
        duration: 1.2,
        ease: "power4.out",
      },
      "-=0.7",
    );
  }

  if (subLine) {
    tl.from(
      subLine,
      {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      },
      "-=0.5",
    );
  }

  if (cta) {
    tl.from(
      cta,
      {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.4",
    );
  }

  return tl;
}

export function animateHeroScroll(heroEl: HTMLElement) {
  const overlay = heroEl.querySelector("[data-hero-overlay]");
  const typography = heroEl.querySelector("[data-hero-typography]");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroEl,
      start: "top top",
      end: "+=120%",
      scrub: 1.5,
      pin: true,
      pinSpacing: true,
    },
  });

  if (typography) {
    tl.to(typography, {
      scale: 0.88,
      yPercent: -8,
      ease: "none",
    });
  }

  if (overlay) {
    tl.to(
      overlay,
      {
        opacity: 1,
        ease: "none",
      },
      "<",
    );
  }

  return tl;
}
