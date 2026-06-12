"use client";
import { useEffect, useRef } from "react";
import { initScrollbar } from "@/lib/animations/scrollbar";

export function CinematicScrollbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const thumb = thumbRef.current;
    if (!container || !thumb) return;

    const handles = initScrollbar(thumb, container);
    return () => handles.destroy();
  }, []);

  return (
    <div ref={containerRef} className="csb-container" aria-hidden="true">
      <div className="csb-track">
        <div ref={thumbRef} className="csb-thumb" />
      </div>
    </div>
  );
}
