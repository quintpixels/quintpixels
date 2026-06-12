"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";


const NAV_LINKS = [
  { href: "/", label: "HOME", index: "01" },
  { href: "/about", label: "ABOUT", index: "02" },
  { href: "/services", label: "SERVICES", index: "03" },
  { href: "/portfolio", label: "PORTFOLIO", index: "04" },
  { href: "/products", label: "PRODUCTS", index: "05" },
  { href: "/contact", label: "CONTACT", index: "06" },
];

const META = [
  { label: "CURRENT MODE", value: "CREATIVE ENGINEERING" },
  { label: "LOCATION", value: "INDIA" },
  { label: "STATUS", value: "AVAILABLE FOR PROJECTS" },
  { label: "SYSTEM", value: "MOTION INTERFACE ACTIVE" },
  { label: "YEAR", value: "2026" },
];


const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·/—";

function scrambleText(el: HTMLElement, original: string) {
  let frame = 0;
  const maxFrames = 15;
  let rafId: number;
  const tick = () => {
    const progress = frame / maxFrames;
    el.textContent = original
      .split("")
      .map((ch, i) => {
        if (ch === " ") return " ";
        if (i < Math.floor(progress * original.length)) return ch;
        return SCRAMBLE_CHARS[
          Math.floor(Math.random() * SCRAMBLE_CHARS.length)
        ];
      })
      .join("");
    frame++;
    if (frame <= maxFrames) rafId = requestAnimationFrame(tick);
    else el.textContent = original;
  };
  rafId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(rafId);
}


export function Navigation() {
  const pathname = usePathname();

  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  
  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    const closeHandler = () => setIsOpen(false);
    document.addEventListener("pix:nav:open", openHandler);
    document.addEventListener("pix:nav:close", closeHandler);
    return () => {
      document.removeEventListener("pix:nav:open", openHandler);
      document.removeEventListener("pix:nav:close", closeHandler);
    };
  }, []);

  
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  
  const handleClose = () => setIsOpen(false);

  
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { display: "flex", flexDirection: "column" });

      const links = overlay.querySelectorAll("[data-nav-link]");
      const metas = overlay.querySelectorAll("[data-nav-meta]");
      const bgPx = overlay.querySelector("[data-nav-bgpx]");
      const topBar = overlay.querySelector("[data-nav-topbar]");
      const bottomBar = overlay.querySelector("[data-nav-bottombar]");
      const dividers = overlay.querySelectorAll("[data-nav-divider]");

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.fromTo(
        overlay,
        { clipPath: "inset(100% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.88,
          ease: "power4.inOut",
        },
      );
      if (bgPx)
        tl.fromTo(
          bgPx,
          { opacity: 0, scale: 1.07 },
          { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" },
          "-=0.55",
        );
      if (topBar)
        tl.fromTo(
          topBar,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
          "-=0.75",
        );
      if (dividers.length)
        tl.fromTo(
          dividers,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.55,
            stagger: 0.04,
            ease: "power2.out",
            transformOrigin: "left center",
          },
          "-=0.6",
        );
      if (links.length)
        tl.fromTo(
          links,
          { y: 55, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.065,
            duration: 0.72,
            ease: "power3.out",
          },
          "-=0.45",
        );
      if (metas.length)
        tl.fromTo(
          metas,
          { opacity: 0, x: 22 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.52",
        );
      if (bottomBar)
        tl.fromTo(
          bottomBar,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.3",
        );
    } else {
      document.body.style.overflow = "";
      tlRef.current?.kill();

      const links = overlay.querySelectorAll("[data-nav-link]");
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(overlay, { display: "none" });
            
            document.dispatchEvent(new CustomEvent("pix:nav:closed"));
          },
        })
        .to(links, {
          y: -45,
          opacity: 0,
          stagger: 0.035,
          duration: 0.35,
          ease: "power3.in",
        })
        .to(
          overlay,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.62,
            ease: "power4.inOut",
          },
          "-=0.12",
        );
    }
  }, [isOpen]);

  
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      tlRef.current?.kill();
    };
  }, []);

  
  useEffect(() => {
    if (!isOpen) return;
    const container = scrollContainerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;
    const bgPx = overlay.querySelector<HTMLElement>("[data-nav-bgpx]");
    if (!bgPx) return;
    gsap.set(bgPx, { y: 0 });
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const max = scrollHeight - clientHeight;
      if (max <= 0) return;
      const p = scrollTop / max;
      gsap.to(bgPx, {
        y: p * -100,
        duration: 0.5,
        ease: "power1.out",
        overwrite: true,
      });
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-9999 bg-(--pix-white) overflow-hidden"
      style={{
        clipPath: "inset(100% 100% 0% 0%)",
        display: "none",
        flexDirection: "column",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!isOpen}
    >
      
      <div
        data-nav-bgpx
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
      >
        <span
          className="font-pixel leading-none tracking-tight"
          style={{
            fontSize: "clamp(8rem, 24vw, 28rem)",
            color: "rgba(11,11,10,0.022)",
          }}
        >
          PIXELS
        </span>
      </div>

      
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(11,11,10,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(11,11,10,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          opacity: 0.018,
        }}
      />

      
      <div
        data-nav-topbar
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-7 sm:px-10 lg:px-16 h-18 border-b border-(--pix-border)/55"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/"
            onClick={handleClose}
            className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-(--pix-gray) hover:text-(--pix-black) transition-colors duration-300"
          >
            QUINT PIXELS
          </Link>
          <div
            data-nav-divider
            className="hidden sm:block h-px w-8 bg-(--pix-border) origin-left"
          />
          <span className="hidden sm:block font-mono text-[8px] tracking-[0.24em] uppercase text-(--pix-gray-light)">
            NAVIGATION MENU
          </span>
        </div>
        <button
          onClick={handleClose}
          aria-label="Close navigation"
          className="group flex items-center gap-2.5 font-pixel text-[9px] tracking-[0.18em] uppercase border border-(--pix-black)/20 px-4 py-2.5 text-(--pix-black)/70 hover:bg-(--pix-black) hover:text-(--pix-white) hover:border-(--pix-black) transition-all duration-350 cursor-pointer"
        >
          <span className="font-sans text-base font-extralight leading-none group-hover:rotate-90 transition-transform duration-400 block">
            ×
          </span>
          <span className="hidden sm:inline">CLOSE</span>
        </button>
      </div>

      
      <div
        className="absolute left-0 right-0 z-10 flex overflow-hidden"
        style={{ top: "4.5rem", bottom: "2.75rem" }}
      >
        
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden"
          data-lenis-prevent
          style={
            {
              height: "100%",
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(11,11,10,0.15) transparent",
            } as React.CSSProperties
          }
        >
          <nav
            aria-label="Main navigation links"
            className="px-7 sm:px-10 lg:px-16 py-4 sm:py-6"
          >
            <div
              data-nav-divider
              className="h-px bg-(--pix-border)/55 origin-left"
            />
            <ul>
              {NAV_LINKS.map(({ href, label, index }) => {
                const isActive = pathname === href;
                return (
                  <li key={href} data-nav-link className="group relative">
                    <Link
                      href={href}
                      onClick={handleClose}
                      onMouseEnter={(e) => {
                        const el =
                          e.currentTarget.querySelector<HTMLElement>(
                            "[data-nav-text]",
                          );
                        if (el) scrambleText(el, label);
                      }}
                      className="flex items-center gap-5 sm:gap-8 lg:gap-10 w-full py-[5vh] sm:py-[6vh] hover:pl-4 transition-all duration-500 ease-out"
                    >
                      <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] text-(--pix-gray-light) shrink-0 w-7 sm:w-8">
                        {index}
                      </span>
                      <span
                        data-nav-text
                        className={cn(
                          "font-pixel leading-[0.9] transition-colors duration-300 tracking-tight",
                          isActive
                            ? "text-(--pix-black)/25"
                            : "text-(--pix-black) group-hover:text-(--pix-black)/55",
                        )}
                        style={{ fontSize: "clamp(3rem, 10vw, 11.5rem)" }}
                      >
                        {label}
                      </span>
                      {isActive && (
                        <span className="hidden sm:inline-block font-mono text-[7px] tracking-[0.28em] uppercase text-(--pix-gray) border border-(--pix-border) px-2 py-1 shrink-0 self-center">
                          HERE
                        </span>
                      )}
                      <span
                        aria-hidden="true"
                        className="font-mono text-lg sm:text-xl text-(--pix-gray) opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 ml-auto mr-1 sm:mr-3 transition-all duration-350 shrink-0"
                      >
                        →
                      </span>
                    </Link>
                    <div
                      data-nav-divider
                      className="h-px bg-(--pix-border)/55 origin-left"
                    />
                  </li>
                );
              })}
            </ul>
            <div className="h-[6vh]" />
          </nav>
        </div>

        
        <aside className="hidden lg:flex flex-col justify-center gap-8 px-12 xl:px-16 py-12 min-w-65 xl:min-w-75 border-l border-(--pix-border)/45 shrink-0 overflow-y-auto">
          <div
            aria-hidden="true"
            className="font-pixel leading-none mb-2 select-none"
            style={{
              fontSize: "clamp(5rem, 8vw, 9rem)",
              color: "rgba(11,11,10,0.055)",
            }}
          >
            IX
          </div>
          {META.map(({ label, value }) => (
            <div key={label} data-nav-meta className="space-y-1.5">
              <p className="font-mono text-[8px] tracking-[0.32em] uppercase text-(--pix-gray-light)">
                {label}
              </p>
              <p className="font-mono text-[11px] sm:text-[12px] tracking-wider text-(--pix-black) leading-snug">
                {value}
              </p>
            </div>
          ))}
          <div
            data-nav-meta
            className="mt-auto pt-7 border-t border-(--pix-border)/55"
          >
            <p className="font-mono text-[8px] tracking-[0.24em] uppercase text-(--pix-gray-light)">
              © 2026 QUINT PIXELS
            </p>
          </div>
        </aside>
      </div>

      
      <div
        data-nav-bottombar
        className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between px-7 sm:px-10 lg:px-16 h-11 border-t border-(--pix-border)/55"
      >
        <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.3em] uppercase text-(--pix-gray-light)">
          CREATIVE TECHNOLOGY STUDIO
        </span>
        <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.3em] uppercase text-(--pix-gray-light)">
          INDIA · 2026
        </span>
      </div>
    </div>
  );
}
