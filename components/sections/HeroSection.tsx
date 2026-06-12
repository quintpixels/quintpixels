"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateHeroEntrance } from "@/lib/animations/hero";

gsap.registerPlugin(ScrollTrigger);

const PIXEL_SIZE = 44; 
const PIXEL_SCROLL_DISTANCE = "+=24%";
const PIXEL_SCROLL_SCRUB = 0.12;

type PixelCell = {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  g: number;
  b: number;
};

function buildPixelGrid(
  width: number,
  height: number,
  size: number,
): PixelCell[] {
  const cols = Math.ceil(width / size);
  const rows = Math.ceil(height / size);
  const cells: PixelCell[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      
      const v = 8 + Math.floor(Math.random() * 12);
      const warm = Math.floor(Math.random() * 4);
      cells.push({
        x: col * size,
        y: row * size,
        w: size + 1,
        h: size + 1,
        r: v + warm,
        g: v,
        b: Math.max(0, v - 2),
      });
    }
  }

  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  return cells;
}

interface HeroProps {
  headline?: string;
  subheadline?: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
}

export function HeroSection({
  headline = "QUINT\nPIXELS",
  subheadline = "We engineer cinematic digital experiences—\nwhere craft meets computation.",
  ctaPrimaryText = "Explore Work",
  ctaPrimaryHref = "/portfolio",
  ctaSecondaryText = "Our Studio",
  ctaSecondaryHref = "/about",
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoImgRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<PixelCell[]>([]);
  const headlineLines = headline
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const eyebrowLine = headlineLines[0] ?? "QUINT";
  const mainLine =
    headlineLines.length > 1 ? headlineLines.slice(1).join(" ") : "PIXELS";

  useEffect(() => {
    const hero = heroRef.current;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!hero || !container || !canvas) return;

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const setupCanvas = () => {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
      pixelsRef.current = buildPixelGrid(
        canvas.width,
        canvas.height,
        PIXEL_SIZE,
      );
    };
    setupCanvas();

    const gsapCtx = gsap.context(() => {
      
      animateHeroEntrance(container);

      const WAVE_FRAC = 0.18;

      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: PIXEL_SCROLL_DISTANCE,
        pin: true,
        pinSpacing: true,
        scrub: PIXEL_SCROLL_SCRUB,
        onUpdate(self) {
          const progress = self.progress;
          const cells = pixelsRef.current;
          const total = cells.length;
          const waveSize = total * WAVE_FRAC;
          const filled = progress * total;

          ctx2d.clearRect(0, 0, canvas.width, canvas.height);

          for (let i = 0; i < Math.ceil(filled + waveSize); i++) {
            if (i >= total) break;
            const cell = cells[i];
            const t = Math.min(1, Math.max(0, (filled - i) / waveSize));
            if (t <= 0) continue;

            const halfW = cell.w / 2;
            const halfH = cell.h / 2;
            const cx = cell.x + halfW;
            const cy = cell.y + halfH;

            ctx2d.save();
            ctx2d.translate(cx, cy);
            ctx2d.scale(t, t);
            ctx2d.fillStyle = `rgb(${cell.r},${cell.g},${cell.b})`;
            ctx2d.fillRect(-halfW, -halfH, cell.w, cell.h);
            ctx2d.restore();
          }
        },
      });

      gsap.to(container, {
        scale: 0.9,
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: PIXEL_SCROLL_DISTANCE,
          scrub: PIXEL_SCROLL_SCRUB,
        },
      });
    }, hero);

    const onResize = () => {
      setupCanvas();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      gsapCtx.revert(); 
    };
  }, []);

  const handleLogoEnter = () => {
    if (!logoImgRef.current) return;
    gsap.to(logoImgRef.current, {
      rotation: 360,
      duration: 0.7,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  };

  const handleLogoLeave = () => {
    if (!logoImgRef.current) return;
    gsap.to(logoImgRef.current, {
      rotation: 0,
      duration: 0.5,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={heroRef}
      data-hide-scroll-progress
      className="relative min-h-screen flex items-center overflow-hidden bg-(--pix-white)"
    >
      
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute w-full h-full opacity-[0.1]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 pointer-events-none"
        aria-hidden="true"
      />

      <div
        ref={containerRef}
        className="relative z-10 w-full px-6 md:px-10 lg:px-16 pt-24"
      >
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-(--pix-gray) mb-8 flex items-center gap-3">
          <span className="inline-block w-6 h-px bg-(--pix-gray)" />
          Creative Technology Studio — Est. 2026
        </div>

        <div className="flex items-center gap-3 sm:gap-4 md:gap-5 mb-2">
          <div className="overflow-hidden">
            <h1
              data-hero-top
              className="font-pixel text-hero-label text-(--pix-gray) leading-none select-none"
            >
              {eyebrowLine}
            </h1>
          </div>
          <div
            ref={logoImgRef}
            onMouseEnter={handleLogoEnter}
            onMouseLeave={handleLogoLeave}
            className="shrink-0 cursor-pointer"
            style={{ width: "clamp(1.4rem, 4.6vw, 6rem)", height: "clamp(1.4rem, 4.6vw, 6rem)" }}
          >
            <Image
              src="/big-logo.png"
              alt="Quint Pixels logo"
              width={56}
              height={56}
              className="w-full h-full object-contain select-none"
              priority
            />
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            data-hero-main
            className="font-pixel text-hero-main text-(--pix-black) leading-none select-none"
          >
            {mainLine}
          </div>
        </div>

        <div className="mt-10 max-w-lg md:max-w-xl">
          <p
            data-hero-sub
            className="font-sans text-base md:text-lg text-(--pix-gray) leading-relaxed"
          >
            {subheadline.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br className="hidden md:block" />}
              </span>
            ))}
          </p>
        </div>

        <div data-hero-cta className="mt-10 flex items-center gap-6">
          <a
            href={ctaPrimaryHref}
            className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.15em] uppercase border border-(--pix-black) px-6 py-3.5 hover:bg-(--pix-black) hover:text-(--pix-white) transition-all duration-300"
          >
            {ctaPrimaryText}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href={ctaSecondaryHref}
            className="font-mono text-xs tracking-[0.15em] uppercase text-(--pix-gray) hover:text-(--pix-black) transition-colors duration-300"
          >
            {ctaSecondaryText}
          </a>
        </div>

      </div>

      <div data-scroll-cue className="hero-scroll-cue">
        <span className="scroll-cue__mouse border-white/60">
          <span className="scroll-cue__wheel bg-white" />
        </span>
        <span>Scroll down</span>
      </div>

    </section>
  );
}
