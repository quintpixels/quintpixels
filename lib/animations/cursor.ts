import { gsap } from "gsap";

export type CursorState =
  | "default"
  | "hover"
  | "active"
  | "text"
  | "drag"
  | "hidden";

const RING_BASE = 30;
const RING_HOVER = 54;
const RING_ACTIVE = 18;
const RING_DRAG = 64;

export interface CursorAnimator {
  move: (x: number, y: number) => void;
  setState: (state: CursorState, labelText?: string) => void;
  show: () => void;
  hide: () => void;
}

export function initCursorAnimator(
  dot: HTMLElement,
  ring: HTMLElement,
  label: HTMLElement,
): CursorAnimator {
  gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0 });
  gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0 });
  gsap.set(label, { opacity: 0 });

  const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
  const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
  const xRing = gsap.quickTo(ring, "x", { duration: 0.32, ease: "power3.out" });
  const yRing = gsap.quickTo(ring, "y", { duration: 0.32, ease: "power3.out" });
  const xLbl = gsap.quickTo(label, "x", { duration: 0.32, ease: "power3.out" });
  const yLbl = gsap.quickTo(label, "y", { duration: 0.32, ease: "power3.out" });

  let currentLabel = "";

  return {
    move(x, y) {
      xDot(x);
      yDot(y);
      xRing(x);
      yRing(y);
      xLbl(x + 22);
      yLbl(y + 22);
    },

    setState(state, labelText) {
      switch (state) {
        case "hover":
          gsap.to(ring, {
            width: RING_HOVER,
            height: RING_HOVER,
            opacity: 0.7,
            borderRadius: "50%",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
          if (labelText && labelText !== currentLabel) {
            currentLabel = labelText;
            label.textContent = labelText;
            gsap.to(label, { opacity: 1, duration: 0.2 });
          }
          break;

        case "active":
          gsap.to(ring, {
            width: RING_ACTIVE,
            height: RING_ACTIVE,
            opacity: 1,
            duration: 0.12,
            ease: "power3.out",
          });
          gsap.to(dot, { scale: 1.8, opacity: 1, duration: 0.12 });
          break;

        case "text":
          gsap.to(ring, {
            width: 2,
            height: 26,
            opacity: 1,
            borderRadius: 2,
            duration: 0.2,
          });
          gsap.to(dot, { scale: 0, opacity: 0, duration: 0.15 });
          gsap.to(label, {
            opacity: 0,
            duration: 0.15,
            onComplete: () => {
              currentLabel = "";
            },
          });
          break;

        case "drag":
          gsap.to(ring, {
            width: RING_DRAG,
            height: RING_DRAG,
            opacity: 0.5,
            borderRadius: "50%",
            duration: 0.35,
          });
          gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
          if (labelText && labelText !== currentLabel) {
            currentLabel = labelText;
            label.textContent = labelText;
            gsap.to(label, { opacity: 1, duration: 0.2 });
          }
          break;

        case "hidden":
          gsap.to([dot, ring, label], { opacity: 0, duration: 0.2 });
          currentLabel = "";
          break;

        default:
          gsap.to(ring, {
            width: RING_BASE,
            height: RING_BASE,
            opacity: 0.55,
            borderRadius: "50%",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
          if (currentLabel) {
            gsap.to(label, {
              opacity: 0,
              duration: 0.15,
              onComplete: () => {
                currentLabel = "";
              },
            });
          }
          break;
      }
    },

    show() {
      gsap.to(dot, { opacity: 1, duration: 0.4 });
      gsap.to(ring, { opacity: 0.55, duration: 0.4 });
    },

    hide() {
      gsap.to([dot, ring, label], { opacity: 0, duration: 0.3 });
    },
  };
}
