import { gsap } from "gsap";

export function openSidebar(
  panel: HTMLElement,
  backdrop: HTMLElement,
  fields: Element[],
) {
  gsap.set([panel, backdrop], { visibility: "visible", pointerEvents: "auto" });

  const tl = gsap.timeline();
  tl.fromTo(
    backdrop,
    { opacity: 0 },
    { opacity: 1, duration: 0.35, ease: "none" },
  );
  tl.fromTo(
    panel,
    { xPercent: 100 },
    { xPercent: 0, duration: 0.55, ease: "power3.out" },
    "<0.08",
  );
  if (fields.length) {
    tl.fromTo(
      fields,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.44, ease: "power2.out" },
      "<0.18",
    );
  }
  return tl;
}

export function closeSidebar(
  panel: HTMLElement,
  backdrop: HTMLElement,
  onComplete?: () => void,
) {
  const tl = gsap.timeline({
    onComplete() {
      gsap.set([panel, backdrop], {
        visibility: "hidden",
        pointerEvents: "none",
      });
      onComplete?.();
    },
  });
  tl.to(panel, { xPercent: 100, duration: 0.44, ease: "power3.in" });
  tl.to(backdrop, { opacity: 0, duration: 0.28, ease: "none" }, "<0.08");
  return tl;
}
