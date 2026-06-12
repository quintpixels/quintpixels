"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["IDEAS", "SYSTEMS", "PRODUCTS", "EXPERIENCES"];

export function StorytellingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<HTMLDivElement[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      const words = wordRefs.current.filter(Boolean);
      if (!words.length) return;

      
      gsap.set(words, { opacity: 0, yPercent: 30 });
      gsap.set(words[0], { opacity: 1, yPercent: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${WORDS.length * 350}`,
          pin: true,
          scrub: 1.2,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      words.forEach((word, i) => {
        if (i === 0) {
          // First word exits
          tl.to(
            word,
            { opacity: 0, yPercent: -30, scale: 0.92, duration: 1 },
            `+=0.5`,
          );
        }
        if (i > 0) {
          // Enter
          tl.fromTo(
            word,
            { opacity: 0, yPercent: 30, scale: 0.95 },
            {
              opacity: 1,
              yPercent: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
            },
          );
          if (i < words.length - 1) {
            // Exit
            tl.to(
              word,
              { opacity: 0, yPercent: -30, scale: 0.92, duration: 1 },
              `+=0.5`,
            );
          }
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-dark-section
      className="relative min-h-screen bg-(--pix-black) flex flex-col items-center justify-center overflow-hidden"
    >
      
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-pixel text-[35vw] text-white/2 leading-none tracking-tighter">
          PIX
        </span>
      </div>

      
      <div className="absolute top-12 left-6 md:left-10 font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">
        003 — We Build
      </div>

      
      <div className="absolute top-12 right-6 md:right-10 z-20 hidden items-center gap-3 border border-white/10 bg-white/[0.03] px-3 py-2 text-white/75 backdrop-blur-sm sm:flex">
        <span className="scroll-cue__mouse border-white/55">
          <span className="scroll-cue__wheel bg-white" />
        </span>
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase">
          Keep scrolling to explore
        </span>
      </div>

      
      <div
        ref={containerRef}
        className="relative z-10 w-full flex items-center justify-center px-6 md:px-10"
      >
        {WORDS.map((word, i) => (
          <div
            key={word}
            ref={(el) => {
              if (el) wordRefs.current[i] = el;
            }}
            className="absolute inset-0 flex items-center justify-center px-6 md:px-16"
            aria-hidden={i !== 0}
          >
            <span className="font-pixel text-display-2xl text-white leading-none text-center select-none tracking-tight w-full max-w-full">
              {word}
            </span>
          </div>
        ))}
      </div>

      
      <div className="absolute bottom-0 left-0 right-0 z-20 h-[3px] bg-white/10 md:h-1">
        <div
          ref={progressBarRef}
          className="h-full bg-white/70 origin-left shadow-[0_0_18px_rgba(255,255,255,0.28)]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      
      <div className="absolute bottom-8 left-6 md:left-10 right-6 md:right-10 flex justify-between items-end gap-5">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/20">
          {WORDS.map((w, i) => (
            <span key={w}>
              {i > 0 && " / "}
              {w}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-white/65 sm:hidden">
          <span className="scroll-cue__mouse border-white/50">
            <span className="scroll-cue__wheel bg-white" />
          </span>
          <span className="font-mono text-[9px] tracking-[0.18em] uppercase">
            Scroll down to continue
          </span>
        </div>
      </div>
    </section>
  );
}
