import { useRef, useEffect } from "react";
import { initCursorAnimator, CursorState } from "@/lib/animations/cursor";

export function useCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const animator = initCursorAnimator(dot, ring, label);
    let entered = false;
    let currentState: CursorState = "default";

    const onMouseMove = (e: MouseEvent) => {
      if (!entered) {
        entered = true;
        animator.show();
      }
      animator.move(e.clientX, e.clientY);
    };

    const onMouseLeave = () => animator.hide();
    const onMouseEnter = () => {
      if (entered) animator.show();
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest<HTMLElement>(
        '[data-cursor], a, button, [role="button"], input, textarea, select',
      );
      if (!closest) {
        if (currentState !== "default") {
          currentState = "default";
          animator.setState("default");
        }
        return;
      }
      const tag = closest.tagName.toLowerCase();
      const cursorAttr = closest.dataset.cursor;

      if (tag === "input" || tag === "textarea") {
        currentState = "text";
        animator.setState("text");
      } else if (cursorAttr) {
        currentState = "hover";
        animator.setState("hover", cursorAttr.toUpperCase());
      } else {
        currentState = "hover";
        animator.setState("hover");
      }
    };

    const onMouseDown = () => {
      if (currentState !== "hidden") animator.setState("active");
    };
    const onMouseUp = () => animator.setState(currentState);

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return { dotRef, ringRef, labelRef };
}
