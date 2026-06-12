"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealChars, revealLine } from "@/lib/animations/textReveal";
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
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    title: "Web App\nDevelopment",
    desc: "Full-stack web applications built with precision — from architecture to interface. React, Next.js, and beyond.",
    Icon: Monitor,
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    num: "02",
    title: "Software\nDevelopment",
    desc: "Systems that scale. We build robust backend infrastructure, APIs, and distributed services.",
    Icon: Code2,
    tags: ["Node.js", "Python", "Go"],
  },
  {
    num: "03",
    title: "Mobile App\nDevelopment",
    desc: "Cross-platform mobile experiences that feel native — elegant, fast, and purposeful.",
    Icon: AppWindow,
    tags: ["React Native", "Swift", "Kotlin"],
  },
  {
    num: "04",
    title: "UI/UX\nSystems",
    desc: "Design systems that speak a coherent visual language — from atoms to entire product experiences.",
    Icon: Sparkles,
    tags: ["Figma", "Design Systems", "Prototyping"],
  },
  {
    num: "05",
    title: "AI\nIntegrations",
    desc: "Intelligent systems woven seamlessly into your product. LLMs, vision models, and custom pipelines.",
    Icon: Cpu,
    tags: ["LLMs", "ML Pipelines", "Agents"],
  },
  {
    num: "06",
    title: "Cloud\nEngineering",
    desc: "Infrastructure that breathes. DevOps, CI/CD, and cloud architecture for demanding workloads.",
    Icon: Database,
    tags: ["AWS", "GCP", "Kubernetes"],
  },
];

const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; strokeWidth?: number }>
> = {
  Monitor,
  Code2,
  AppWindow,
  Sparkles,
  Cpu,
  Database,
  Palette,
  Megaphone,
  BarChart3,
};

type ServiceMotion =
  | "web"
  | "brand"
  | "marketing"
  | "app"
  | "software"
  | "system";

const ENTRANCE_VARIANTS = [
  { y: 44, x: -12, rotate: -0.4 },
  { y: 34, x: 18, rotate: 0.35 },
  { y: 54, x: 0, rotate: 0 },
  { y: 26, x: -8, rotate: 0.25 },
  { y: 42, x: 12, rotate: -0.25 },
  { y: 32, x: 0, rotate: 0.45 },
];

function getServiceMotion(title: string, icon?: string): ServiceMotion {
  const key = `${title} ${icon ?? ""}`.toLowerCase();
  if (key.includes("brand") || key.includes("design") || key.includes("ui")) {
    return "brand";
  }
  if (key.includes("marketing") || key.includes("campaign")) {
    return "marketing";
  }
  if (key.includes("mobile") || key.includes("app")) {
    return "app";
  }
  if (key.includes("software") || key.includes("saas")) {
    return "software";
  }
  if (key.includes("web")) {
    return "web";
  }
  return "system";
}

function ServiceVisual({ motion }: { motion: ServiceMotion }) {
  if (motion === "brand") {
    return (
      <div className="service-visual service-visual--brand" aria-hidden="true">
        <span data-service-bit />
        <span data-service-bit />
        <span data-service-bit />
      </div>
    );
  }

  if (motion === "marketing") {
    return (
      <div
        className="service-visual service-visual--marketing"
        aria-hidden="true"
      >
        <span data-service-bit />
        <span data-service-bit />
        <span data-service-bit />
        <span data-service-bit />
      </div>
    );
  }

  if (motion === "app") {
    return (
      <div className="service-visual service-visual--app" aria-hidden="true">
        <span data-service-bit />
        <span data-service-bit />
        <span data-service-bit />
      </div>
    );
  }

  if (motion === "software") {
    return (
      <div
        className="service-visual service-visual--software"
        aria-hidden="true"
      >
        <span data-service-bit />
        <span data-service-bit />
        <span data-service-bit />
        <span data-service-bit />
      </div>
    );
  }

  if (motion === "system") {
    return (
      <div className="service-visual service-visual--system" aria-hidden="true">
        <span data-service-bit />
        <span data-service-bit />
        <span data-service-bit />
        <span data-service-bit />
      </div>
    );
  }

  return (
    <div className="service-visual service-visual--web" aria-hidden="true">
      <span data-service-bit />
      <span data-service-bit />
      <span data-service-bit />
    </div>
  );
}

interface ServiceItem {
  num: string;
  title: string;
  desc: string;
  icon?: string;
  tags: string[];
}

interface ServicesSectionProps {
  services?: ServiceItem[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const displayServices =
    services && services.length > 0
      ? services
      : SERVICES.map((s) => ({
          ...s,
          icon: s.Icon.displayName ?? s.Icon.name,
        }));
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      if (headingRef.current)
        revealChars(headingRef.current, { start: "top 80%" });
      if (lineRef.current)
        revealLine(lineRef.current, { start: "top 82%", delay: 0.3 });

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        const variant = ENTRANCE_VARIANTS[i % ENTRANCE_VARIANTS.length];
        gsap.from(item, {
          y: variant.y,
          x: variant.x,
          rotate: variant.rotate,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });

        const bits = item.querySelectorAll("[data-service-bit]");
        if (bits.length > 0) {
          gsap.from(bits, {
            opacity: 0,
            y: 10,
            scale: 0.82,
            stagger: 0.05,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          });
        }

        // Icon hover choreography
        const icon = item.querySelector("[data-service-icon]");
        if (icon) {
          const onEnter = () => {
            const motion = item.dataset.serviceMotion;
            gsap.to(icon, {
              rotation: motion === "brand" ? -10 : 12,
              scale: 1.15,
              duration: 0.4,
              ease: "power2.out",
            });
            if (bits.length > 0) {
              gsap.to(bits, {
                x: (idx: number) =>
                  motion === "marketing" ? idx * 2 : idx % 2 ? 3 : -3,
                y: (idx: number) =>
                  motion === "app" ? -idx * 3 : motion === "software" ? -4 : 0,
                scale: motion === "brand" ? 1.08 : 1,
                duration: 0.36,
                stagger: 0.035,
                ease: "power2.out",
              });
            }
          };
          const onLeave = () => {
            gsap.to(icon, {
              rotation: 0,
              scale: 1,
              duration: 0.5,
              ease: "back.out(2)",
            });
            if (bits.length > 0) {
              gsap.to(bits, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.45,
                stagger: 0.025,
                ease: "power2.out",
              });
            }
          };

          item.addEventListener("mouseenter", onEnter);
          item.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mouseleave", onLeave);
          });
        }
      });
    }, sectionRef);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-10 lg:px-16 bg-(--pix-white)"
    >
      
      <div className="flex items-center gap-4 mb-16">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-(--pix-gray)">
          002
        </span>
        <div
          ref={lineRef}
          className="h-px flex-1 max-w-20 bg-(--pix-border)"
          style={{ transformOrigin: "left" }}
        />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-(--pix-gray)">
          What We Do
        </span>
      </div>

      
      <div className="overflow-hidden mb-20">
        <h2
          ref={headingRef}
          className="font-pixel text-[2rem] md:text-display-lg text-(--pix-black) leading-none"
        >
          SERVICES
        </h2>
      </div>

      
      <ul className="divide-y divide-(--pix-border)">
        {displayServices.map(({ num, title, desc, icon, tags }, i) => {
          const Icon = icon && ICON_MAP[icon] ? ICON_MAP[icon] : Monitor;
          const motion = getServiceMotion(title, icon);
          return (
            <li
              key={num}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              data-service-motion={motion}
              className="group py-10 md:py-12 grid grid-cols-[40px_1fr] md:grid-cols-[80px_1fr_1fr_1fr] gap-x-5 gap-y-4 md:gap-10 items-start cursor-default"
            >
              
              <span className="font-mono text-[11px] tracking-[0.2em] text-(--pix-gray-light) pt-1">
                {num}
              </span>

              
              <div className="overflow-hidden">
                <h3 className="font-pixel text-[1rem] sm:text-[1.25rem] md:text-display-sm text-(--pix-black) whitespace-pre-line leading-none group-hover:opacity-70 transition-opacity duration-300">
                  {title}
                </h3>
              </div>

              
              <p className="col-start-2 md:col-start-3 font-sans text-sm md:text-base text-(--pix-gray) leading-relaxed md:max-w-sm">
                {desc}
              </p>

              
              <div className="col-start-2 md:col-start-4 flex flex-col items-start md:items-end gap-4">
                <ServiceVisual motion={motion} />
                <div
                  data-service-icon
                  className="text-(--pix-gray-light) group-hover:text-(--pix-black) transition-colors duration-300"
                >
                  <Icon size={28} strokeWidth={1} />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] tracking-[0.15em] uppercase text-(--pix-gray) border border-(--pix-border) px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
