"use client";

import { useEffect, useRef } from "react";

type Fragment = {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  speed: number;
  drift: number;
  phase: number;
};

export function PixelFragmentSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let tick = 0;
    const fragments: Fragment[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      fragments.length = 0;

      const count = Math.min(
        180,
        Math.floor((canvas.width * canvas.height) / 16_000),
      );

      for (let i = 0; i < count; i++) {
        fragments.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: ([1, 1, 2, 2, 3, 4] as const)[Math.floor(Math.random() * 6)],
          baseOpacity: 0.04 + Math.random() * 0.11,
          speed: 0.06 + Math.random() * 0.2,
          drift: (Math.random() - 0.5) * 0.12,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    init();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const step = 4;
      const offset = (tick * 0.22) % step;
      ctx.fillStyle = "rgba(11,11,10,0.004)";
      for (let y = -step + offset; y < canvas.height; y += step) {
        ctx.fillRect(0, y, canvas.width, 1);
      }

      const gs = 64;
      ctx.fillStyle = "rgba(11,11,10,0.04)";
      for (let gx = gs / 2; gx < canvas.width; gx += gs) {
        for (let gy = gs / 2; gy < canvas.height; gy += gs) {
          ctx.fillRect(Math.floor(gx), Math.floor(gy), 1, 1);
        }
      }

      fragments.forEach((f) => {
        const pulse = Math.sin(tick * 0.016 + f.phase) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(11,11,10,${(f.baseOpacity * pulse).toFixed(3)})`;
        ctx.fillRect(Math.floor(f.x), Math.floor(f.y), f.size, f.size);

        f.y -= f.speed;
        f.x += f.drift;

        if (f.y < -f.size) {
          f.y = canvas.height + f.size;
          f.x = Math.random() * canvas.width;
        }
        if (f.x < -f.size) f.x = canvas.width + f.size;
        else if (f.x > canvas.width + f.size) f.x = -f.size;
      });

      tick++;
      rafId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    />
  );
}
