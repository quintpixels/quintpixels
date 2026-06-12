import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initViewportFocus(): () => void {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("[data-section-focus]"),
  );
  if (!sections.length) return () => {};

  const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

  sections.forEach((section) => {

        gsap.set(section, { opacity: 0.92 });

    const t = ScrollTrigger.create({
      trigger: section,
      start: "top 72%",
      end: "bottom 28%",
      onEnter: () =>
        gsap.to(section, { opacity: 1, duration: 0.7, ease: "power2.out" }),
      onLeave: () => gsap.to(section, { opacity: 0.92, duration: 0.5 }),
      onEnterBack: () =>
        gsap.to(section, { opacity: 1, duration: 0.7, ease: "power2.out" }),
      onLeaveBack: () => gsap.to(section, { opacity: 0.92, duration: 0.5 }),
    });
    triggers.push(t);
  });

  return () => triggers.forEach((t) => t.kill());
}
