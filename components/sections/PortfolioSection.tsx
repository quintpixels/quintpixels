"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createHorizontalScroll } from "@/lib/animations/horizontalScroll";
import { revealChars } from "@/lib/animations/textReveal";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    index: "01",
    category: "SaaS Platform",
    title: "ORBIS",
    sub: "Team intelligence & workflow OS",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    year: "2026",
    color: "#f0ede9",
  },
  {
    index: "02",
    category: "Enterprise System",
    title: "AXIOM",
    sub: "Multi-tenant enterprise data platform",
    tags: ["Go", "Kubernetes", "Kafka"],
    year: "2026",
    color: "#e8e4de",
  },
  {
    index: "03",
    category: "Mobile App",
    title: "TRACE",
    sub: "Health tracking with AI coaching",
    tags: ["React Native", "Swift", "ML"],
    year: "2023",
    color: "#f2efea",
  },
  {
    index: "04",
    category: "AI Product",
    title: "ETHER",
    sub: "Document intelligence & semantic search",
    tags: ["Python", "LangChain", "Pinecone"],
    year: "2026",
    color: "#ede9e3",
  },
  {
    index: "05",
    category: "Internal Tool",
    title: "NEXUS",
    sub: "Engineering operations dashboard",
    tags: ["React", "GraphQL", "Redis"],
    year: "2023",
    color: "#f5f2ee",
  },
];

interface ProjectItem {
  index: string;
  category: string;
  title: string;
  sub: string;
  tags: string[];
  year: string;
  color: string;
}

interface PortfolioSectionProps {
  projects?: ProjectItem[];
}

function isDarkColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
}

export function PortfolioSection({ projects }: PortfolioSectionProps) {
  const displayProjects = projects && projects.length > 0 ? projects : PROJECTS;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressValueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        revealChars(headingRef.current, { start: "top 80%" });
      }

      createHorizontalScroll(section, track, {
        onUpdate: (progress) => {
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${progress})`;
          }
          if (progressValueRef.current) {
            progressValueRef.current.textContent = `${Math.round(
              progress * 100,
            )}%`;
          }
        },
      });

      const cards = track.querySelectorAll("[data-portfolio-card]");
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-(--pix-white) overflow-hidden"
    >
      
      <div className="px-6 md:px-10 lg:px-16 pt-32 pb-16">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-(--pix-gray)">
            004
          </span>
          <div className="h-px w-12 bg-(--pix-border)" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-(--pix-gray)">
            Selected Work
          </span>
        </div>
        <div className="overflow-hidden">
          <h2
            ref={headingRef}
            className="font-pixel text-display-lg text-(--pix-black) leading-none"
          >
            PORTFOLIO
          </h2>
        </div>
      </div>

      <div className="flex" style={{ height: "70vh" }}>
        <div
          ref={trackRef}
          className="flex gap-4 pl-6 md:pl-10 pr-[10vw]"
          style={{ width: "max-content", alignItems: "center" }}
        >
          {displayProjects.map(
            ({ index, category, title, sub, tags, year, color }) => {
              const dark = isDarkColor(color);
              return (
                <div
                  key={index}
                  data-portfolio-card
                  className={`group relative flex-shrink-0 w-[80vw] md:w-[50vw] lg:w-[38vw] h-[55vh] overflow-hidden cursor-pointer border ${dark ? "border-white/10" : "border-(--pix-border)"}`}
                  style={{ backgroundColor: color }}
                >
                  
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${dark ? "text-white/50" : "text-(--pix-gray)"}`}>
                          {category}
                        </span>
                        <div className={`font-mono text-[10px] tracking-[0.15em] mt-1 ${dark ? "text-white/30" : "text-(--pix-gray-light)"}`}>
                          {year}
                        </div>
                      </div>
                      <span className={`font-mono text-[11px] tracking-[0.15em] ${dark ? "text-white/30" : "text-(--pix-gray-light)"}`}>
                        {index}
                      </span>
                    </div>

                    <div>
                      <div className="overflow-hidden mb-3">
                        <h3 className={`font-pixel text-display-md leading-none group-hover:opacity-70 transition-opacity duration-400 ${dark ? "text-white" : "text-(--pix-black)"}`}>
                          {title}
                        </h3>
                      </div>
                      <p className={`font-sans text-sm mb-6 leading-relaxed ${dark ? "text-white/50" : "text-(--pix-gray)"}`}>
                        {sub}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className={`font-mono text-[9px] tracking-[0.12em] uppercase px-2 py-1 border ${dark ? "text-white/40 border-white/15" : "text-(--pix-gray) border-(--pix-border)"}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.5}
                      className={dark ? "text-white" : "text-(--pix-black)"}
                    />
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${dark ? "bg-white" : "bg-(--pix-black)"}`} />
                </div>
              );
            },
          )}
        </div>
      </div>

      <div className="pointer-events-none sticky bottom-0 left-0 right-0 z-20 border-t border-(--pix-black)/10 bg-(--pix-white)/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-3 md:px-10 lg:px-16">
          <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-(--pix-gray)">
            Section progress
          </span>
          <span
            ref={progressValueRef}
            className="font-mono text-[9px] tracking-[0.18em] uppercase text-(--pix-black)"
          >
            0%
          </span>
        </div>
        <div className="h-[3px] bg-(--pix-black)/10 md:h-1">
          <div
            ref={progressBarRef}
            className="h-full origin-left bg-(--pix-black)"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
