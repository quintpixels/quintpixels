"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    let mounted = true;
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    requestAnimationFrame(() => {
      if (mounted) setLenisInstance(lenis);
    });

    const syncScrollTrigger = () => ScrollTrigger.update();
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    const refresh = () => ScrollTrigger.refresh();

    
    lenis.on("scroll", syncScrollTrigger);
    gsap.ticker.add(tick);

    gsap.ticker.lagSmoothing(0);
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
    document.fonts?.ready.then(refresh).catch(() => undefined);
    requestAnimationFrame(refresh);

    return () => {
      mounted = false;
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      lenis.off("scroll", syncScrollTrigger);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}
