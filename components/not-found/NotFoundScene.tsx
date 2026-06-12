"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PixelFragmentSystem } from "./PixelFragmentSystem";
import { createMagnetic } from "@/lib/animations/magnetic";
import { setPage404 } from "@/lib/page404Flag";
import {
  runNotFoundReveal,
  setupGlitch,
  setupMouseParallax,
} from "@/lib/animations/notFoundReveal";

export function NotFoundScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const el404Ref = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const btnHomeRef = useRef<HTMLAnchorElement>(null);
  const btnPortfolioRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  
  useEffect(() => {
    setPage404(true);
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.backgroundColor;
    const prevBody = body.style.backgroundColor;
    html.style.backgroundColor = "#f7f5f2";
    body.style.backgroundColor = "#f7f5f2";
    return () => {
      setPage404(false);
      html.style.backgroundColor = prevHtml;
      body.style.backgroundColor = prevBody;
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const cleanups: Array<() => void> = [];

    cleanups.push(runNotFoundReveal(scene));

    if (el404Ref.current) {
      cleanups.push(setupGlitch(el404Ref.current));
    }

    
    const parallaxLayers: { el: HTMLElement; strength: number }[] = [];
    if (el404Ref.current)
      parallaxLayers.push({ el: el404Ref.current, strength: 10 });
    if (bgTextRef.current)
      parallaxLayers.push({ el: bgTextRef.current, strength: -18 });
    if (parallaxLayers.length) {
      cleanups.push(setupMouseParallax(scene, parallaxLayers));
    }

    if (btnHomeRef.current)
      cleanups.push(createMagnetic(btnHomeRef.current, { strength: 0.35 }));
    if (btnPortfolioRef.current)
      cleanups.push(
        createMagnetic(btnPortfolioRef.current, { strength: 0.35 }),
      );

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div
      ref={sceneRef}
      className="relative min-h-screen bg-[#f7f5f2] overflow-hidden flex flex-col"
    >
      
      <div className="absolute inset-0 z-0">
        <PixelFragmentSystem />
      </div>

      
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <span
          className="font-pixel text-[#0b0b0a] leading-none"
          style={{
            fontSize: "clamp(8rem, 44vw, 58rem)",
            opacity: 0.022,
            letterSpacing: "0.05em",
          }}
        >
          PIXELS
        </span>
      </div>

      
      <div
        className="nf-scan-beam absolute left-0 right-0 h-px pointer-events-none z-0"
        aria-hidden="true"
      />

      
      <div
        data-nf-side-left
        className="hidden lg:flex absolute left-5 top-1/2 -translate-y-1/2 z-10 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-mono text-[7px] tracking-[0.4em] text-[#0b0b0a]/9 uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          SYSTEM INTERRUPTED — ERROR CODE 404 — PAGE NOT FOUND — PIXEL INTERFACE
        </span>
      </div>

      
      <div
        data-nf-side-right
        className="hidden lg:flex absolute right-5 top-1/2 -translate-y-1/2 z-10 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-mono text-[7px] tracking-[0.4em] text-[#0b0b0a]/9 uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          QUINT PIXELS — CREATIVE TECHNOLOGY STUDIO — EST. 2026
        </span>
      </div>

      
      <header
        data-nf-header
        className="relative z-10 flex items-center justify-between px-6 md:px-10 lg:px-14 py-6 border-b border-[#e0ddd8]"
      >
        <Link href="/" className="group flex items-center gap-3">
          <span className="block w-1.5 h-1.5 bg-[#0b0b0a]/25 group-hover:bg-[#0b0b0a]/60 transition-colors duration-300" />
          <span className="font-pixel text-[7px] tracking-[0.38em] uppercase text-[#0b0b0a]/35 group-hover:text-[#0b0b0a]/65 transition-colors duration-300">
            QUINT PIXELS
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-2.5">
          <span className="font-mono text-[8px] tracking-[0.2em] text-[#0b0b0a]/12 uppercase">
            SIGNAL
          </span>
          <span className="font-mono text-[8px] text-[#0b0b0a]/8">/</span>
          <span className="font-mono text-[8px] tracking-[0.2em] text-[#0b0b0a]/25 uppercase">
            LOST
          </span>
        </div>
      </header>

      
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 py-16 md:py-24">
        
        <div className="flex flex-wrap items-start justify-center gap-8 md:gap-14 lg:gap-20 mb-14 md:mb-20">
          {[
            { label: "ERROR CODE", value: "404" },
            { label: "STATUS", value: "PAGE MISSING" },
            { label: "SYSTEM", value: "ACTIVE" },
            { label: "INTERFACE", value: "PIXEL v2.0" },
          ].map((item) => (
            <div key={item.label} data-nf-meta className="text-center">
              <div className="font-pixel text-[7px] tracking-[0.3em] text-[#0b0b0a]/18 uppercase mb-2">
                {item.label}
              </div>
              <div className="font-mono text-[9px] md:text-[10px] tracking-[0.18em] text-[#0b0b0a]/30 uppercase">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        
        <div className="overflow-hidden">
          <div
            ref={el404Ref}
            data-nf-404
            data-text="404"
            className="glitch-404 font-pixel text-[#0b0b0a] leading-none select-none"
            style={{
              fontSize: "clamp(7rem, 33vw, 42rem)",
              letterSpacing: "-0.01em",
            }}
          >
            404
          </div>
        </div>

        
        <div
          data-nf-line
          className="w-24 md:w-32 h-px bg-[#0b0b0a]/18 mt-8 mb-8 origin-left"
        />

        
        <p
          data-nf-status
          className="font-pixel text-[9px] md:text-[10px] tracking-[0.55em] text-[#0b0b0a]/28 uppercase mb-5"
        >
          SIGNAL LOST
        </p>

        
        <p
          data-nf-sub
          className="font-mono text-[10px] md:text-[11px] tracking-[0.12em] text-[#0b0b0a]/18 uppercase text-center max-w-[32ch] leading-loose"
        >
          THE ROUTE YOU REQUESTED
          <br />
          DOES NOT EXIST WITHIN THIS SYSTEM.
        </p>

        
        <div
          data-nf-actions
          className="flex flex-col sm:flex-row items-center gap-4 mt-12 md:mt-16"
        >
          
          <Link
            ref={btnHomeRef}
            href="/"
            className="group relative flex items-center gap-3 border border-[#0b0b0a]/22 hover:border-[#0b0b0a]/65 px-8 py-4 font-pixel text-[8px] tracking-[0.28em] uppercase text-[#0b0b0a]/50 hover:text-[#f7f5f2] transition-colors duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-[#0b0b0a] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-420 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <ArrowLeft
              size={10}
              strokeWidth={1.5}
              className="relative z-10 transition-colors duration-300 group-hover:text-[#0b0b0a]"
            />
            <span className="relative z-10">RETURN HOME</span>
          </Link>

          
          <Link
            ref={btnPortfolioRef}
            href="/portfolio"
            className="group flex items-center gap-3 border border-[#0b0b0a]/10 hover:border-[#0b0b0a]/28 px-8 py-4 font-pixel text-[8px] tracking-[0.28em] uppercase text-[#0b0b0a]/22 hover:text-[#0b0b0a]/55 transition-all duration-300"
          >
            <span>EXPLORE WORK</span>
            <ArrowUpRight
              size={10}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </main>

      
      <footer
        data-nf-footer
        className="relative z-10 flex items-center justify-between px-6 md:px-10 lg:px-14 py-5 border-t border-[#e0ddd8]"
      >
        <div className="flex items-center gap-6">
          <div data-nf-meta className="hidden sm:flex items-center gap-2.5">
            <span className="font-pixel text-[6px] tracking-[0.3em] text-[#0b0b0a]/12 uppercase">
              LOCATION
            </span>
            <span className="font-mono text-[8px] tracking-widest text-[#0b0b0a]/20 uppercase truncate max-w-[24ch]">
              {pathname ?? "UNKNOWN"}
            </span>
          </div>
        </div>

        <div
          data-nf-meta
          className="font-mono text-[8px] tracking-[0.22em] text-[#0b0b0a]/12 uppercase"
        >
          © {new Date().getFullYear()} QUINT PIXELS
        </div>
      </footer>
    </div>
  );
}
