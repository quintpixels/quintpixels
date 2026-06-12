import { gsap } from "gsap";
import SplitType from "split-type";

export function runNotFoundReveal(container: HTMLElement): () => void {
  gsap.set(container, { autoAlpha: 0 });

  const tl = gsap.timeline({ delay: 0.1 });

  const headerEl = container.querySelector<HTMLElement>("[data-nf-header]");
  const el404 = container.querySelector<HTMLElement>("[data-nf-404]");
  const lineEl = container.querySelector<HTMLElement>("[data-nf-line]");
  const statusEl = container.querySelector<HTMLElement>("[data-nf-status]");
  const subEl = container.querySelector<HTMLElement>("[data-nf-sub]");
  const actionsEl = container.querySelector<HTMLElement>("[data-nf-actions]");
  const metaItems = Array.from(
    container.querySelectorAll<HTMLElement>("[data-nf-meta]"),
  );
  const sideLeft = container.querySelector<HTMLElement>("[data-nf-side-left]");
  const sideRight = container.querySelector<HTMLElement>(
    "[data-nf-side-right]",
  );
  const footerEl = container.querySelector<HTMLElement>("[data-nf-footer]");

    tl.to(container, { autoAlpha: 1, duration: 0.5, ease: "power2.out" });

    if (headerEl) {
    gsap.set(headerEl, { y: -14, autoAlpha: 0 });
    tl.to(
      headerEl,
      { y: 0, autoAlpha: 1, duration: 0.75, ease: "power3.out" },
      "-=0.3",
    );
  }

    if (el404) {
    const split = new SplitType(el404, { types: "chars" });
    if (split.chars?.length) {
      gsap.set(split.chars, { yPercent: 110, opacity: 0 });
      tl.to(
        split.chars,
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.5",
      );
    }
  }

    if (lineEl) {
    gsap.set(lineEl, { scaleX: 0, transformOrigin: "left center" });
    tl.to(lineEl, { scaleX: 1, duration: 0.75, ease: "power3.out" }, "-=0.55");
  }

    if (statusEl) {
    gsap.set(statusEl, { y: 14, autoAlpha: 0 });
    tl.to(
      statusEl,
      { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
      "-=0.45",
    );
  }

    if (subEl) {
    gsap.set(subEl, { y: 10, autoAlpha: 0 });
    tl.to(
      subEl,
      { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4",
    );
  }

    if (actionsEl) {
    gsap.set(actionsEl, { y: 20, autoAlpha: 0 });
    tl.to(
      actionsEl,
      { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
      "-=0.38",
    );
  }

    if (metaItems.length) {
    gsap.set(metaItems, { autoAlpha: 0, x: -6 });
    tl.to(
      metaItems,
      { autoAlpha: 1, x: 0, stagger: 0.06, duration: 0.5, ease: "power2.out" },
      "-=0.4",
    );
  }

    if (sideLeft) {
    gsap.set(sideLeft, { autoAlpha: 0 });
    tl.to(sideLeft, { autoAlpha: 1, duration: 1.4 }, "-=0.5");
  }
  if (sideRight) {
    gsap.set(sideRight, { autoAlpha: 0 });
    tl.to(sideRight, { autoAlpha: 1, duration: 1.4 }, "<");
  }

    if (footerEl) {
    gsap.set(footerEl, { y: 10, autoAlpha: 0 });
    tl.to(
      footerEl,
      { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
      "-=0.7",
    );
  }

  return () => tl.kill();
}

export function setupGlitch(el: HTMLElement): () => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  let killed = false;

  function scheduleNext() {
    if (killed) return;
    const delay = 4500 + Math.random() * 7000;
    timeoutId = setTimeout(() => {
      if (killed) return;
      const strong = Math.random() > 0.4;
      const tl = gsap.timeline({ onComplete: scheduleNext });

      if (strong) {
        tl.to(el, { x: -5, skewX: -1.2, duration: 0.05, ease: "none" })
          .to(el, { x: 4, skewX: 0.8, duration: 0.05, ease: "none" })
          .to(el, { x: -2, skewX: 0, duration: 0.04, ease: "none" })
          .to(el, { x: 0, duration: 0.1, ease: "power2.out" });
      } else {
        tl.to(el, { x: -3, duration: 0.06, ease: "none" }).to(el, {
          x: 0,
          duration: 0.1,
          ease: "power2.out",
        });
      }
    }, delay);
  }

  scheduleNext();
  return () => {
    killed = true;
    clearTimeout(timeoutId);
    gsap.killTweensOf(el);
  };
}

export function setupMouseParallax(
  container: HTMLElement,
  layers: { el: HTMLElement; strength: number }[],
): () => void {
  const onMouseMove = (e: MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    layers.forEach(({ el, strength }) => {
      gsap.to(el, {
        x: dx * strength,
        y: dy * strength,
        duration: 1.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  };

  container.addEventListener("mousemove", onMouseMove);
  return () => container.removeEventListener("mousemove", onMouseMove);
}
