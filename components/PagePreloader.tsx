"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export function PagePreloader() {
  const [mounted, setMounted] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const quintRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<HTMLDivElement>(null);
  const studioRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const dotsRef = useRef<HTMLSpanElement[]>([]);
  const barsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      
      gsap.set([quintRef.current, pixelsRef.current], { yPercent: 115, opacity: 0 });
      gsap.set(logoRef.current, { scale: 0.5, opacity: 0, rotation: -15 });
      gsap.set(studioRef.current, { opacity: 0, y: 6, letterSpacing: "0.7em" });
      gsap.set(barsRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(dotsRef.current, { scale: 0, opacity: 0 });
      gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.55,
            ease: "power2.inOut",
            onComplete: () => {
              document.body.style.overflow = "";
              setMounted(false);
            },
          });
        },
      });

      tl.to(logoRef.current, {
        scale: 1, opacity: 1, rotation: 0,
        duration: 0.65, ease: "back.out(1.6)",
      }, 0);

      tl.to(quintRef.current, { yPercent: 0, opacity: 1, duration: 0.6 }, 0.1);

      tl.to(pixelsRef.current, { yPercent: 0, opacity: 1, duration: 0.6 }, 0.22);

      tl.to(studioRef.current, {
        opacity: 1, y: 0, letterSpacing: "0.45em", duration: 0.55,
      }, 0.5);

      tl.to(barsRef.current, {
        scaleX: 1, duration: 0.45, ease: "power2.out",
        stagger: { each: 0.05 },
      }, 0.35);

      tl.to(dotsRef.current, {
        scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)",
        stagger: { each: 0.1 },
      }, 0.65);

      const obj = { val: 0 };
      tl.to(obj, {
        val: 100,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate() {
          if (percentRef.current) {
            percentRef.current.textContent = `${Math.round(obj.val)}%`;
          }
        },
      }, 0.5);

      tl.to(progressBarRef.current, {
        scaleX: 1, duration: 1.2, ease: "power2.inOut",
      }, 0.5);

      tl.to({}, { duration: 0.18 });
    }, overlayRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-[var(--pix-black)] overflow-hidden"
      style={{ zIndex: 99999 }}
      aria-label="Loading Quint Pixels"
    >
      
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute left-5 top-0 h-full flex flex-col justify-center gap-3 opacity-25"
      >
        {[28, 16, 36, 12, 22, 18].map((w, i) => (
          <div
            key={i}
            ref={el => { if (el) barsRef.current[i] = el; }}
            className="h-px bg-white/60"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center text-center px-6">
        
        <div
          ref={logoRef}
          className="mb-6 w-12 h-12 sm:w-14 sm:h-14"
          aria-hidden="true"
        >
          <Image
            src="/white-logo.png"
            alt=""
            width={56}
            height={56}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        <div className="overflow-hidden leading-none">
          <div
            ref={quintRef}
            className="font-pixel text-white select-none"
            style={{
              fontSize: "clamp(2.8rem, 13vw, 9rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
            }}
          >
            QUINT
          </div>
        </div>

        <div className="overflow-hidden leading-none">
          <div
            ref={pixelsRef}
            className="font-pixel text-white/20 select-none"
            style={{
              fontSize: "clamp(2.8rem, 13vw, 9rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
            }}
          >
            PIXELS
          </div>
        </div>

        <span
          ref={studioRef}
          className="mt-5 block font-mono text-[8px] sm:text-[9px] text-white/28 uppercase"
          style={{ letterSpacing: "0.7em" }}
        >
          Creative Technology Studio
        </span>

        <div className="mt-7 flex items-center gap-2" aria-hidden="true">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              ref={el => { if (el) dotsRef.current[i] = el; }}
              className="inline-block w-1 h-1 rounded-full bg-white/40"
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 inset-x-6 sm:inset-x-10">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[7px] tracking-[0.3em] uppercase text-white/18">
            Loading
          </span>
          <span
            ref={percentRef}
            className="font-mono text-[7px] tracking-[0.2em] text-white/25"
          >
            0%
          </span>
        </div>
        <div className="h-px w-full bg-white/8 overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-white/45"
            style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute top-5 right-6 flex items-center gap-2 opacity-15"
      >
        <div className="w-px h-5 bg-white/50" />
        <span className="font-mono text-[7px] tracking-widest text-white/60 uppercase">QP</span>
      </div>
    </div>
  );
}
