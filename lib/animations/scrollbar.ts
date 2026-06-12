import { gsap } from "gsap";

export interface ScrollbarHandles {
  destroy: () => void;
}

export function initScrollbar(
  thumb: HTMLElement,
  container: HTMLElement,
): ScrollbarHandles {
  gsap.set(container, { opacity: 1 });

  const update = () => {
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight;
    const viewH = window.innerHeight;
    const maxScroll = docH - viewH;
    const pct = maxScroll > 0 ? scrollY / maxScroll : 0;
    const thumbH = Math.max(36, (viewH / docH) * viewH);
    const maxTop = viewH - thumbH;

    gsap.set(thumb, { y: pct * maxTop, height: thumbH });
  };

  window.addEventListener("scroll", update, { passive: true });
  update();

  return {
    destroy() {
      window.removeEventListener("scroll", update);
    },
  };
}
