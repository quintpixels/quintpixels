"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AppWindow,
  BarChart3,
  Code2,
  Cpu,
  Database,
  Megaphone,
  Monitor,
  Palette,
  Sparkles,
  Globe,
  Layers,
  Network,
  Workflow,
  Briefcase,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES_FALLBACK = [
  {
    num: "01",
    title: "Web App\nDevelopment",
    desc: "Full-stack web applications built with precision — from architecture to interface. React, Next.js, and beyond.",
    icon: "Monitor",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    num: "02",
    title: "Software\nDevelopment",
    desc: "Systems that scale. We build robust backend infrastructure, APIs, and distributed services.",
    icon: "Code2",
    tags: ["Node.js", "Python", "Go"],
  },
  {
    num: "03",
    title: "Mobile App\nDevelopment",
    desc: "Cross-platform mobile experiences that feel native — elegant, fast, and purposeful.",
    icon: "AppWindow",
    tags: ["React Native", "Swift", "Kotlin"],
  },
  {
    num: "04",
    title: "UI/UX\nSystems",
    desc: "Design systems that speak a coherent visual language — from atoms to entire product experiences.",
    icon: "Sparkles",
    tags: ["Figma", "Design Systems", "Prototyping"],
  },
  {
    num: "05",
    title: "AI\nIntegrations",
    desc: "Intelligent systems woven seamlessly into your product. LLMs, vision models, and custom pipelines.",
    icon: "Cpu",
    tags: ["LLMs", "ML Pipelines", "Agents"],
  },
  {
    num: "06",
    title: "Cloud\nEngineering",
    desc: "Infrastructure that breathes. DevOps, CI/CD, and cloud architecture for demanding workloads.",
    icon: "Database",
    tags: ["AWS", "GCP", "Kubernetes"],
  },
];

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Monitor, Code2, AppWindow, Sparkles, Cpu, Database,
  Palette, Megaphone, BarChart3, Globe, Layers, Network,
  Workflow, Briefcase, Zap,
};

type CardAnim = "browser" | "terminal" | "phone" | "palette" | "neural" | "cloud";

function resolveAnim(title: string, icon: string): CardAnim {
  const key = `${title} ${icon}`.toLowerCase();
  if (key.includes("ui") || key.includes("ux") ||  key.includes("design") ||key.includes("design") || key.includes("brand") || key.includes("palette")) return "palette";
  if (key.includes("web") || key.includes("monitor")) return "browser";
  if (key.includes("software") || key.includes("code") || key.includes("backend")) return "terminal";
  if (key.includes("mobile") || key.includes("app")) return "phone";
  if (key.includes("cloud") || key.includes("devops") || key.includes("infrastructure")) return "cloud";
  if (key.includes("ai") || key.includes("ml") || key.includes("cpu") || key.includes("neural")) return "neural";
  return "cloud";
}

function BrowserVisual({ cardRef }: { cardRef: React.RefObject<HTMLDivElement | null> }) {
  const lines = useRef<HTMLDivElement[]>([]);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onEnter = () => {
      if (progress.current) {
        gsap.fromTo(progress.current, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" });
      }
      if (lines.current.length) {
        gsap.fromTo(lines.current, { scaleX: 0, opacity: 0 }, {
          scaleX: 1, opacity: 1, duration: 0.4, ease: "power2.out",
          stagger: { each: 0.07, from: "start" },
        });
      }
    };
    const onLeave = () => {
      if (progress.current) gsap.to(progress.current, { scaleX: 0, duration: 0.5, ease: "power2.in" });
      if (lines.current.length) gsap.to(lines.current, { scaleX: 0.3, opacity: 0.3, duration: 0.3, stagger: 0.04 });
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); };
  }, [cardRef]);

  return (
    <div className="relative w-full h-28 rounded-sm overflow-hidden border border-[var(--pix-border)] bg-[var(--pix-surface)]">
      
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[var(--pix-border)] bg-[var(--pix-white)]">
        <span className="w-2 h-2 rounded-full bg-red-400/70" />
        <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
        <span className="w-2 h-2 rounded-full bg-green-400/70" />
        <div className="flex-1 mx-2 h-4 rounded-sm bg-[var(--pix-border)] flex items-center px-2">
          <span className="font-mono text-[7px] text-[var(--pix-gray-light)]">quintpixels.dev</span>
        </div>
      </div>
      
      <div className="h-px bg-[var(--pix-border)] overflow-hidden">
        <div ref={progress} className="h-full bg-[var(--pix-black)] origin-left" style={{ transform: "scaleX(0)" }} />
      </div>
      
      <div className="p-3 space-y-2">
        {[80, 60, 70, 45].map((w, i) => (
          <div
            key={i}
            ref={el => { if (el) lines.current[i] = el; }}
            className="h-1.5 rounded-full bg-[var(--pix-border)] origin-left"
            style={{ width: `${w}%`, transform: "scaleX(0.3)", opacity: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}

function TerminalVisual({ cardRef }: { cardRef: React.RefObject<HTMLDivElement | null> }) {
  const lines = useRef<HTMLSpanElement[]>([]);
  const cursor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onEnter = () => {
      const tl = gsap.timeline();
      lines.current.forEach((line, i) => {
        tl.to(line, { opacity: 1, duration: 0.01 }, i * 0.18);
      });
      if (cursor.current) {
        gsap.to(cursor.current, { opacity: 0, repeat: 8, yoyo: true, duration: 0.4, ease: "steps(1)" });
      }
    };
    const onLeave = () => {
      gsap.to(lines.current, { opacity: 0, stagger: 0.05, duration: 0.2 });
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); };
  }, [cardRef]);

  const codeLines = [
    { color: "text-purple-700", text: "const api = " },
    { color: "text-cyan-700", text: "  .route('/build')" },
    { color: "text-green-700", text: "  .deploy(prod)" },
    { color: "text-amber-600", text: "// → 200 OK ✓" },
  ];

  return (
    <div className="w-full h-28 rounded-sm overflow-hidden bg-[var(--pix-black)] border border-[var(--pix-dark-border)] font-mono">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-white/5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
        <span className="font-mono text-[7px] text-white/40">bash — zsh</span>
      </div>
      <div className="p-3 space-y-1">
        {codeLines.map((line, i) => (
          <div key={i} className="flex items-center">
            {i === 0 && <span className="text-green-400/70 text-[8px] mr-1">$</span>}
            <span
              ref={el => { if (el) lines.current[i] = el; }}
              className={`text-[8px] ${line.color}`}
              style={{ opacity: 0 }}
            >
              {line.text}
            </span>
          </div>
        ))}
        <span ref={cursor} className="inline-block w-1.5 h-3 bg-green-400/80 ml-1 align-middle" />
      </div>
    </div>
  );
}

function PhoneVisual({ cardRef }: { cardRef: React.RefObject<HTMLDivElement | null> }) {
  const notif = useRef<HTMLDivElement>(null);
  const phoneBody = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onEnter = () => {
      if (phoneBody.current) {
        gsap.fromTo(phoneBody.current, { y: 6 }, { y: 0, duration: 0.5, ease: "back.out(2)" });
      }
      if (notif.current) {
        gsap.fromTo(notif.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)", delay: 0.2 });
      }
    };
    const onLeave = () => {
      if (notif.current) gsap.to(notif.current, { y: -20, opacity: 0, duration: 0.3 });
      if (phoneBody.current) gsap.to(phoneBody.current, { y: 6, duration: 0.3 });
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); };
  }, [cardRef]);

  return (
    <div className="w-full h-28 flex items-center justify-center overflow-hidden">
      <div ref={phoneBody} className="relative w-16 h-24 rounded-xl border-2 border-white/20 bg-black/30 overflow-hidden flex flex-col" style={{ transform: "translateY(6px)" }}>
        
        <div className="flex justify-center pt-1.5">
          <div className="w-6 h-1 rounded-full bg-white/20" />
        </div>
        
        <div className="flex-1 bg-gradient-to-b from-white/5 to-black/20 m-1 rounded-lg p-1.5 overflow-hidden">
          
          <div ref={notif} className="bg-white/10 rounded-md p-1.5 border border-white/10" style={{ opacity: 0, transform: "translateY(-20px)" }}>
            <div className="flex items-center gap-1 mb-1">
              <div className="w-2 h-2 rounded-full bg-blue-400/70" />
              <span className="font-mono text-[6px] text-white/50">QuintPixels</span>
            </div>
            <div className="font-mono text-[6px] text-white/70">Build deployed ✓</div>
          </div>
          
          <div className="grid grid-cols-3 gap-1 mt-2">
            {[..."▪▪▪▪▪▪"].map((_, i) => (
              <div key={i} className="aspect-square rounded-sm bg-white/10" />
            ))}
          </div>
        </div>
        
        <div className="flex justify-center pb-1.5">
          <div className="w-8 h-0.5 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}

function PaletteVisual({ cardRef }: { cardRef: React.RefObject<HTMLDivElement | null> }) {
  const wheel = useRef<HTMLDivElement>(null);
  const swatches = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onEnter = () => {
      if (wheel.current) {
        gsap.to(wheel.current, { rotation: 180, duration: 1.2, ease: "power2.inOut" });
      }
      if (swatches.current.length) {
        gsap.fromTo(swatches.current, { scaleY: 0, opacity: 0 }, {
          scaleY: 1, opacity: 1, duration: 0.4, ease: "back.out(2)",
          stagger: { each: 0.05, from: "start" },
        });
      }
    };
    const onLeave = () => {
      if (wheel.current) gsap.to(wheel.current, { rotation: 0, duration: 0.8, ease: "power2.out" });
      if (swatches.current.length) gsap.to(swatches.current, { scaleY: 0, opacity: 0, duration: 0.25, stagger: 0.04 });
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); };
  }, [cardRef]);

  const colors = ["#FF6B6B", "#FFE66D", "#4ECDC4", "#A8E6CF", "#3D5A80", "#E07A5F"];

  return (
    <div className="w-full h-28 flex items-center gap-4 px-4">
      
      <div ref={wheel} className="shrink-0 w-14 h-14 rounded-full overflow-hidden" style={{ background: "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)" }}>
        <div className="w-full h-full rounded-full bg-black/60 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-black/80 border border-white/20" />
        </div>
      </div>
      
      <div className="flex gap-2 flex-1 items-end h-16">
        {colors.map((c, i) => (
          <div
            key={c}
            ref={el => { if (el) swatches.current[i] = el; }}
            className="flex-1 rounded-sm origin-bottom"
            style={{
              backgroundColor: c,
              height: `${40 + i * 8}%`,
              opacity: 0,
              transform: "scaleY(0)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function NeuralVisual({ cardRef }: { cardRef: React.RefObject<HTMLDivElement | null> }) {
  const nodes = useRef<SVGCircleElement[]>([]);
  const paths = useRef<SVGPathElement[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    let animation: gsap.core.Tween | null = null;
    const onEnter = () => {
      if (nodes.current.length) {
        gsap.to(nodes.current, {
          scale: 1.3, transformOrigin: "center center",
          duration: 0.5, ease: "back.out(2)",
          stagger: { each: 0.08, from: "random" },
          yoyo: true, repeat: 3,
        });
      }
      if (paths.current.length) {
        gsap.fromTo(paths.current, { opacity: 0.1 }, {
          opacity: 0.7, duration: 0.3,
          stagger: { each: 0.06, from: "random" },
          yoyo: true, repeat: 5,
        });
      }
    };
    const onLeave = () => {
      gsap.killTweensOf([...nodes.current, ...paths.current]);
      gsap.to(nodes.current, { scale: 1, opacity: 0.4, duration: 0.3 });
      gsap.to(paths.current, { opacity: 0.15, duration: 0.3 });
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [cardRef]);

  const pts = [
    { x: 20, y: 56 }, { x: 60, y: 28 }, { x: 60, y: 84 },
    { x: 110, y: 14 }, { x: 110, y: 56 }, { x: 110, y: 98 },
    { x: 160, y: 28 }, { x: 160, y: 70 }, { x: 200, y: 48 },
  ];
  const edges = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[3,6],[4,6],[4,7],[5,7],[6,8],[7,8]];

  return (
    <div className="w-full h-28 overflow-hidden border border-[var(--pix-border)] rounded-sm bg-[var(--pix-surface)]">
      <svg ref={svgRef} viewBox="0 0 220 112" className="w-full h-full" aria-hidden="true">
        {edges.map(([a, b], i) => (
          <path
            key={i}
            ref={el => { if (el) paths.current[i] = el; }}
            d={`M${pts[a].x},${pts[a].y}L${pts[b].x},${pts[b].y}`}
            stroke="var(--pix-black)" strokeWidth="0.8" fill="none"
            style={{ opacity: 0.15 }}
          />
        ))}
        {pts.map((p, i) => (
          <circle
            key={i}
            ref={el => { if (el) nodes.current[i] = el; }}
            cx={p.x} cy={p.y} r={i === 8 ? 5 : 3}
            fill="var(--pix-black)"
            style={{ opacity: 0.4 }}
          />
        ))}
      </svg>
    </div>
  );
}

function CloudVisual({ cardRef }: { cardRef: React.RefObject<HTMLDivElement | null> }) {
  const particles = useRef<HTMLDivElement[]>([]);
  const serverRacks = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onEnter = () => {
      if (particles.current.length) {
        particles.current.forEach((p, i) => {
          gsap.fromTo(p,
            { y: 0, opacity: 0, scale: 1 },
            {
              y: -40 - i * 5,
              opacity: 0.7,
              scale: 0.5,
              duration: 1.2 + i * 0.15,
              ease: "power1.out",
              repeat: 3,
              yoyo: true,
              delay: i * 0.12,
            }
          );
        });
      }
      if (serverRacks.current.length) {
        gsap.fromTo(serverRacks.current, { scaleX: 0 }, {
          scaleX: 1, duration: 0.5, ease: "power2.out",
          stagger: { each: 0.08 },
        });
      }
    };
    const onLeave = () => {
      gsap.killTweensOf(particles.current);
      gsap.to(particles.current, { y: 0, opacity: 0, scale: 1, duration: 0.3 });
      gsap.to(serverRacks.current, { scaleX: 0.3, duration: 0.3 });
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); };
  }, [cardRef]);

  return (
    <div className="w-full h-28 flex items-end gap-3 px-4 pb-3 overflow-hidden relative border border-[var(--pix-border)] rounded-sm bg-[var(--pix-surface)]">
      
      <div className="flex-1 space-y-1.5">
        {[90, 70, 55, 80].map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              ref={el => { if (el) serverRacks.current[i] = el; }}
              className="h-2.5 bg-[var(--pix-border)] rounded-sm origin-left border border-[var(--pix-border)]"
              style={{ width: `${w}%`, transform: "scaleX(0.3)" }}
            >
              <div className="flex items-center h-full px-2 gap-1">
                <span className="w-1 h-1 rounded-full bg-green-500/80 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                <div className="flex-1 h-0.5 bg-[var(--pix-gray-light)] rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-6 right-6 w-16 h-16">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={el => { if (el) particles.current[i] = el; }}
            className="absolute w-1 h-1 rounded-full bg-[var(--pix-black)]"
            style={{
              bottom: `${i * 10}%`,
              left: `${20 + i * 12}%`,
              opacity: 0,
            }}
          />
        ))}
        <div className="absolute bottom-0 right-0 w-12 h-8 rounded-sm border border-[var(--pix-border)] flex items-center justify-center">
          <span className="font-mono text-[10px] text-[var(--pix-gray)]">☁</span>
        </div>
      </div>
    </div>
  );
}

interface ServiceCardProps {
  num: string;
  title: string;
  desc: string;
  icon?: string;
  tags: string[];
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}

function ServiceCard({ num, title, desc, icon, tags, index, cardRef }: ServiceCardProps) {
  const Icon = (icon && ICON_MAP[icon]) ? ICON_MAP[icon] : Monitor;
  const anim = resolveAnim(title, icon ?? "");
  const innerRef = useRef<HTMLDivElement>(null);

  const setRef = (el: HTMLDivElement | null) => {
    (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    cardRef(el);
  };

  const safeTags = Array.isArray(tags)
    ? tags
    : typeof tags === "string"
      ? (tags as string).split(",").map((t) => t.trim()).filter(Boolean)
      : [];

  return (
    <div
      ref={setRef}
      data-service-anim={anim}
      className="group relative flex flex-col bg-[var(--pix-white)] border border-[var(--pix-border)] rounded-sm overflow-hidden cursor-default transition-all duration-500 hover:border-[var(--pix-black)]/30 hover:shadow-2xl hover:-translate-y-1"
      style={{ willChange: "transform" }}
    >
      
      <div className="absolute top-0 left-0 right-0 h-px bg-[var(--pix-black)] origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />

      <div className="flex items-start justify-between p-6 pb-3">
        <div>
          <span className="font-mono text-[9px] tracking-[0.3em] text-[var(--pix-gray-light)] uppercase">
            {num}
          </span>
          <h3 className="font-pixel text-[1.1rem] sm:text-[1.3rem] text-[var(--pix-black)] whitespace-pre-line leading-tight mt-2 group-hover:opacity-80 transition-opacity duration-300">
            {title}
          </h3>
        </div>
        <div
          data-service-icon
          className="shrink-0 p-2 rounded-sm border border-[var(--pix-border)] text-[var(--pix-gray-light)] group-hover:border-[var(--pix-black)]/20 group-hover:text-[var(--pix-black)] transition-all duration-400"
        >
          <Icon size={20} strokeWidth={1.5} />
        </div>
      </div>

      <div className="px-4 py-2">
        {anim === "browser"  && <BrowserVisual  cardRef={innerRef} />}
        {anim === "terminal" && <TerminalVisual  cardRef={innerRef} />}
        {anim === "phone"    && <PhoneVisual     cardRef={innerRef} />}
        {anim === "palette"  && <PaletteVisual   cardRef={innerRef} />}
        {anim === "neural"   && <NeuralVisual    cardRef={innerRef} />}
        {anim === "cloud"    && <CloudVisual     cardRef={innerRef} />}
      </div>

      <p className="px-6 py-4 font-sans text-sm text-[var(--pix-gray)] leading-relaxed flex-1">
        {desc}
      </p>

      <div className="px-6 pb-6 flex flex-wrap gap-2">
        {safeTags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] tracking-[0.1em] uppercase text-[var(--pix-gray)] border border-[var(--pix-border)] px-2 py-1 rounded-sm group-hover:border-[var(--pix-black)]/20 transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

const CARD_ENTRANCE: Array<{ y: number; x: number; rotate: number; duration: number; ease: string }> = [
  { y: 60, x: -20, rotate: -1.5, duration: 0.85, ease: "power3.out" },
  { y: 80, x: 0,   rotate: 0,    duration: 0.9,  ease: "expo.out" },
  { y: 50, x: 20,  rotate: 1.5,  duration: 0.8,  ease: "power3.out" },
  { y: 70, x: -15, rotate: -1,   duration: 0.95, ease: "back.out(1.2)" },
  { y: 60, x: 0,   rotate: 0,    duration: 0.85, ease: "power4.out" },
  { y: 75, x: 15,  rotate: 1,    duration: 0.9,  ease: "expo.out" },
];

interface ServiceItem {
  num: string;
  title: string;
  desc: string;
  icon?: string;
  tags: string[] | unknown;
}

interface ServicesSectionProps {
  services?: ServiceItem[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<HTMLDivElement[]>([]);

  const displayServices =
    services && services.length > 0
      ? services.map((s) => ({
          ...s,
          tags: Array.isArray(s.tags)
            ? (s.tags as string[])
            : typeof s.tags === "string"
              ? (s.tags as string).split(",").map((t) => t.trim()).filter(Boolean)
              : [],
        }))
      : SERVICES_FALLBACK;

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll(".char");
        if (chars.length) {
          gsap.from(chars, {
            y: 60, opacity: 0, rotateX: -90,
            duration: 0.7, ease: "back.out(1.7)",
            stagger: { each: 0.04 },
            scrollTrigger: { trigger: headingRef.current, start: "top 82%", toggleActions: "play none none none" },
          });
        } else {
          gsap.from(headingRef.current, {
            y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 82%", toggleActions: "play none none none" },
          });
        }
      }

      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleX: 0, transformOrigin: "left",
          duration: 0.8, ease: "power2.inOut", delay: 0.3,
          scrollTrigger: { trigger: lineRef.current, start: "top 84%", toggleActions: "play none none none" },
        });
      }

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const v = CARD_ENTRANCE[i % CARD_ENTRANCE.length];
        gsap.from(card, {
          y: v.y, x: v.x, rotate: v.rotate, opacity: 0,
          duration: v.duration, ease: v.ease,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          delay: (i % 3) * 0.08,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-10 lg:px-16 bg-[var(--pix-white)]"
    >
      
      <div className="flex items-center gap-4 mb-16">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pix-gray)]">
          002
        </span>
        <div
          ref={lineRef}
          className="h-px flex-1 max-w-20 bg-[var(--pix-border)]"
          style={{ transformOrigin: "left" }}
        />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pix-gray)]">
          What We Do
        </span>
      </div>

      <div className="overflow-hidden mb-20">
        <h2
          ref={headingRef}
          className="font-pixel text-[2rem] md:text-display-lg text-[var(--pix-black)] leading-none"
        >
          SERVICES
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {displayServices.map(({ num, title, desc, icon, tags }, i) => (
          <ServiceCard
            key={num}
            num={num}
            title={title}
            desc={desc}
            icon={icon}
            tags={tags as string[]}
            index={i}
            cardRef={(el) => { if (el) cardRefs.current[i] = el; }}
          />
        ))}
      </div>
    </section>
  );
}
