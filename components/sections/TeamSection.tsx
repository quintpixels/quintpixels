"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MEMBERS = [
  {
    index: "01",
    firstName: "RITESH",
    lastName: "SHARMA",
    role: "Full Stack Engineer",
    philosophy:
      "Engineering scalable digital systems with precision and clarity.",
    initials: "RS",
    system: "CREATIVE ENGINEERING",
    stack: ["Node.js", "React", "Go", "PostgreSQL"],
    accentHue: "220 40% 14%",
  },
  {
    index: "02",
    firstName: "JOTISH",
    lastName: "SHARMA",
    role: "CTO & Full Stack Engineer",
    philosophy:
      "Building immersive products through motion, systems, and code.",
    initials: "JS",
    system: "MOTION SYSTEMS",
    stack: ["Next.js", "GSAP", "TypeScript", "AWS"],
    accentHue: "200 35% 13%",
  },
  {
    index: "03",
    firstName: "SHANKHALP",
    lastName: "PRADHAN",
    role: "CEO & Full Stack Engineer",
    philosophy: "Leading creative technology with vision-driven execution.",
    initials: "SP",
    system: "PRODUCT ARCHITECTURE",
    stack: ["React", "Python", "Firebase", "Figma"],
    accentHue: "260 30% 14%",
  },
  {
    index: "04",
    firstName: "SATYAM",
    lastName: "PRADHAN",
    role: "COO",
    philosophy: "Operational excellence powering modern digital experiences.",
    initials: "SP",
    system: "OPERATIONS",
    stack: ["Strategy", "Operations", "Notion", "Analytics"],
    accentHue: "30 25% 12%",
  },
];

interface MemberItem {
  index?: string;
  firstName: string;
  lastName: string;
  role: string;
  philosophy: string;
  initials: string;
  system: string;
  stack: string[];
  accentHue?: string;
}

interface TeamSectionProps {
  members?: MemberItem[];
}

export function TeamSection({ members }: TeamSectionProps) {
  const displayMembers = members && members.length > 0 ? members : MEMBERS;
  const sectionRef = useRef<HTMLElement>(null);
  const currentIdxRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const memberPanels = Array.from(
        section.querySelectorAll("[data-member-panel]"),
      );
      const railRows = Array.from(section.querySelectorAll("[data-rail-row]"));
      const dots = Array.from(section.querySelectorAll("[data-dot]"));
      const N = memberPanels.length;
      if (N === 0) return;
      let activeTimeline: gsap.core.Timeline | null = null;

      memberPanels.forEach((panel, i) => {
        const img = panel.querySelector("[data-panel-img]");
        const firstName = panel.querySelector("[data-panel-firstname]");
        const lastName = panel.querySelector("[data-panel-lastname]");
        const role = panel.querySelector("[data-panel-role]");
        const phil = panel.querySelector("[data-panel-phil]");
        const stack = panel.querySelector("[data-panel-stack]");

        if (i === 0) {
          gsap.set(panel, { opacity: 1, zIndex: 2 });
          gsap.set(img, { clipPath: "inset(0 0% 0 0)", opacity: 1 });
          gsap.set([firstName, lastName], { y: 0, opacity: 1 });
          gsap.set(role, { y: 0, opacity: 1 });
          gsap.set(phil, { y: 0, opacity: 0.5 });
          gsap.set(stack, { y: 0, opacity: 1 });
        } else {
          gsap.set(panel, { opacity: 0, zIndex: 1 });
          gsap.set(img, { clipPath: "inset(0 0 0 100%)", opacity: 1 });
          gsap.set([firstName, lastName], { y: 40, opacity: 0 });
          gsap.set(role, { y: 20, opacity: 0 });
          gsap.set(phil, { y: 20, opacity: 0 });
          gsap.set(stack, { y: 20, opacity: 0 });
        }
      });

      railRows.forEach((row, i) => {
        const name = row.querySelector("[data-rail-name]");
        const role = row.querySelector("[data-rail-role]");
        const idx = row.querySelector("[data-rail-idx]");
        const bar = row.querySelector("[data-rail-bar]");
        const isActive = i === 0;
        const dist = i;

        gsap.set(name, {
          opacity: isActive ? 1 : dist === 1 ? 0.22 : 0.1,
          x: isActive ? 0 : 10,
          scale: isActive ? 1 : 0.9,
          transformOrigin: "left center",
        });
        gsap.set(role, { opacity: isActive ? 0.65 : 0.1 });
        gsap.set(idx, { opacity: isActive ? 0.7 : 0.2 });
        gsap.set(bar, {
          scaleX: isActive ? 1 : 0,
          transformOrigin: "left center",
        });
      });
      dots.forEach((dot, i) => {
        gsap.set(dot, {
          opacity: i === 0 ? 1 : 0.35,
          scale: i === 0 ? 1.3 : 1,
          backgroundColor: i === 0 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)",
        });
      });

      const transitionTo = (next: number, prev: number) => {
        if (next === prev) return;
        const prevPanel = memberPanels[prev] as HTMLElement | undefined;
        const nextPanel = memberPanels[next] as HTMLElement | undefined;
        if (!prevPanel || !nextPanel) return;
        const dir = next > prev ? 1 : -1;

        activeTimeline?.kill();
        memberPanels.forEach((panel, i) => {
          if (i !== prev && i !== next) {
            gsap.set(panel, { opacity: 0, zIndex: 1 });
          }
        });

        const prevImg = prevPanel.querySelector("[data-panel-img]");
        const prevFN = prevPanel.querySelector("[data-panel-firstname]");
        const prevLN = prevPanel.querySelector("[data-panel-lastname]");
        const prevRole = prevPanel.querySelector("[data-panel-role]");
        const prevPhil = prevPanel.querySelector("[data-panel-phil]");
        const prevStack = prevPanel.querySelector("[data-panel-stack]");

        const nextImg = nextPanel.querySelector("[data-panel-img]");
        const nextFN = nextPanel.querySelector("[data-panel-firstname]");
        const nextLN = nextPanel.querySelector("[data-panel-lastname]");
        const nextRole = nextPanel.querySelector("[data-panel-role]");
        const nextPhil = nextPanel.querySelector("[data-panel-phil]");
        const nextStack = nextPanel.querySelector("[data-panel-stack]");

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            activeTimeline = null;
          },
        });
        activeTimeline = tl;

        tl.to(
          prevImg,
          {
            clipPath: "inset(0 100% 0 0)",
            duration: 0.45,
            ease: "power3.in",
          },
          0,
        );
        tl.to(
          [prevFN, prevLN],
          {
            y: dir * -45,
            opacity: 0,
            stagger: 0.04,
            duration: 0.38,
            ease: "power3.in",
          },
          0,
        );
        tl.to(
          [prevRole, prevPhil, prevStack],
          {
            y: dir * -20,
            opacity: 0,
            stagger: 0.03,
            duration: 0.3,
            ease: "power2.in",
          },
          0,
        );
        tl.set(prevPanel, { opacity: 0, zIndex: 1 }, 0.42);

        tl.set(nextPanel, { opacity: 1, zIndex: 2 }, 0.15);
        tl.set(nextImg, { clipPath: "inset(0 0 0 100%)", opacity: 1 }, 0.15);
        tl.set(nextFN, { y: dir * 50, opacity: 0 }, 0.15);
        tl.set(nextLN, { y: dir * 40, opacity: 0 }, 0.15);
        tl.set(
          [nextRole, nextPhil, nextStack],
          {
            y: dir * 24,
            opacity: 0,
          },
          0.15,
        );

        tl.to(
          nextImg,
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.65,
            ease: "power3.out",
          },
          0.28,
        );
        tl.to(nextFN, { y: 0, opacity: 1, duration: 0.6 }, 0.32);
        tl.to(nextLN, { y: 0, opacity: 1, duration: 0.6 }, 0.38);
        tl.to(
          nextRole,
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          0.48,
        );
        tl.to(
          nextPhil,
          {
            y: 0,
            opacity: 0.5,
            duration: 0.5,
            ease: "power2.out",
          },
          0.55,
        );
        tl.to(
          nextStack,
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          0.6,
        );

        railRows.forEach((row, i) => {
          const name = row.querySelector("[data-rail-name]");
          const role = row.querySelector("[data-rail-role]");
          const idxEl = row.querySelector("[data-rail-idx]");
          const bar = row.querySelector("[data-rail-bar]");
          const isActive = i === next;
          const dist = Math.abs(i - next);

          tl.to(
            name,
            {
              opacity: isActive ? 1 : dist === 1 ? 0.22 : 0.1,
              scale: isActive ? 1 : 0.9,
              x: isActive ? 0 : 10,
              duration: 0.5,
              ease: "power2.out",
              transformOrigin: "left center",
            },
            0,
          );
          tl.to(role, { opacity: isActive ? 0.65 : 0.1, duration: 0.4 }, 0);
          tl.to(idxEl, { opacity: isActive ? 0.7 : 0.2, duration: 0.4 }, 0);
          tl.to(
            bar,
            {
              scaleX: isActive ? 1 : 0,
              duration: isActive ? 0.55 : 0.3,
              ease: isActive ? "power3.out" : "power2.in",
            },
            0,
          );
        });

        dots.forEach((dot, i) => {
          tl.to(
            dot,
            {
              opacity: i === next ? 1 : 0.35,
              scale: i === next ? 1.3 : 1,
              backgroundColor:
                i === next
                  ? "rgba(255,255,255,0.85)"
                  : "rgba(255,255,255,0.2)",
              duration: 0.35,
              ease: "power2.out",
            },
            0,
          );
        });
      };

      const getMemberIndex = (progress: number) => {
        if (progress >= 0.995) return N - 1;
        return Math.min(N - 1, Math.max(0, Math.floor(progress * N)));
      };

      const SCROLL_PER_MEMBER = 1.5;
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => {
          return `+=${window.innerHeight * (N * SCROLL_PER_MEMBER)}`;
        },
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onUpdate(self) {
          
          const segmentSize = 1 / N;
          const rawIdx = Math.floor(self.progress / segmentSize);
          const newIdx = Math.min(N - 1, Math.max(0, rawIdx));
          if (newIdx !== currentIdxRef.current) {
            transitionTo(newIdx, currentIdxRef.current);
            currentIdxRef.current = newIdx;
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-dark-section
      className="relative h-screen bg-(--pix-black) overflow-hidden"
    >
      
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
      >
        <span

          className="font-pixel text-white/2.5 leading-none tracking-tight"
          style={{ fontSize: "clamp(10rem, 28vw, 36rem)" }}
        >
          TEAM
        </span>
      </div>

      <header className="absolute top-0 inset-x-0 flex items-end justify-between px-8 md:px-14 pt-10 pb-6 border-b border-white/6 z-10">
        <div className="flex items-center gap-5">
          <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/30">
            §04
          </span>
          <div className="h-px w-10 bg-white/10" />
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">
            The People
          </span>
        </div>
        <h2
          className="font-pixel text-white/90 hidden md:block"
          style={{ fontSize: "clamp(1.1rem, 2vw, 2rem)" }}
        >
          THE TEAM
        </h2>
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/20 hidden md:block">
          {displayMembers.length} Members
        </span>
      </header>

      <div className="absolute inset-0 top-17 bottom-11 flex">
        
        <div className="relative w-full md:w-[44%] shrink-0 md:border-r md:border-white/5 overflow-hidden">
          {displayMembers.map((m, i) => (
            <div
              key={m.index ?? i}
              data-member-panel
              className="absolute inset-0 flex flex-col px-5 sm:px-8 md:px-10 py-5 sm:py-8 md:py-10"
              style={{ zIndex: i === 0 ? 2 : 1 }}
            >
              
              <div className="flex items-center gap-3 mb-6 shrink-0">
                <span className="font-mono text-[9px] tracking-[0.3em] text-white/25">
                  {m.index}
                </span>
                <div className="h-px w-6 bg-white/10" />
                <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-white/20">
                  {m.system}
                </span>
              </div>

              <div
                data-panel-img
                className="relative shrink-0 mb-6 overflow-hidden"
                style={{
                  height: "clamp(90px, 18vh, 200px)",
                  background: `hsl(${m.accentHue})`,
                }}
              >
                
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                
                <span
                  className="absolute bottom-2 right-3 font-pixel text-white/8 leading-none select-none"
                  style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
                  aria-hidden="true"
                >
                  {m.initials}
                </span>
                
                <div className="absolute top-2.5 left-2.5 w-4 h-4 border-l border-t border-white/20" />
                <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-r border-b border-white/20" />
              </div>

              <div className="overflow-hidden mb-0.5">
                <div
                  data-panel-firstname
                  className="font-pixel leading-none text-white"
                  style={{ fontSize: "clamp(2rem, 8vw, 4.8rem)" }}
                >
                  {m.firstName}
                </div>
              </div>
              <div className="overflow-hidden mb-4">
                <div
                  data-panel-lastname
                  className="font-pixel leading-none text-white/30"
                  style={{ fontSize: "clamp(2rem, 8vw, 4.8rem)" }}
                >
                  {m.lastName}
                </div>
              </div>

              <div
                data-panel-role
                className="font-mono text-[10px] tracking-[0.28em] uppercase text-white/60 mb-3 shrink-0"
              >
                {m.role}
              </div>

              <p
                data-panel-phil
                className="font-sans text-sm text-white/45 leading-relaxed italic mb-auto"
              >
                &ldquo;{m.philosophy}&rdquo;
              </p>

              <div
                data-panel-stack
                className="flex flex-wrap gap-1.5 mt-5 shrink-0"
              >
                {m.stack.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 border border-white/10 text-white/35"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="relative hidden md:flex flex-1 overflow-hidden flex-col justify-center px-8 md:px-12 lg:px-16">
          
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 w-40 h-40 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          {displayMembers.map((m, i) => (
            <div
              key={m.index}
              data-rail-row={i}
              className="relative border-b border-white/4 last:border-b-0"
            >
              
              <div
                data-rail-bar
                className="absolute bottom-0 left-0 h-px bg-white/35 w-full"
                style={{
                  transform: "scaleX(0)",
                  transformOrigin: "left center",
                }}
              />

              <div className="flex items-start gap-4 py-4 md:py-5">
                
                <span
                  data-rail-idx
                  className="font-mono text-[9px] tracking-[0.3em] text-white/30 shrink-0 pt-1.5"
                >
                  {m.index}
                </span>

                <div className="flex-1 min-w-0">
                  <div
                    data-rail-name
                    className="font-pixel leading-none text-white"
                    style={{
                      fontSize: "clamp(1.6rem, 3.8vw, 5rem)",
                      transformOrigin: "left center",
                    }}
                  >
                    {m.firstName}{" "}
                    <span className="text-white/25">{m.lastName}</span>
                  </div>
                  <div
                    data-rail-role
                    className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/40 mt-1.5"
                  >
                    {m.role}
                  </div>
                </div>

                <span className="hidden lg:block font-mono text-[8px] tracking-[0.22em] uppercase text-white/12 shrink-0 pt-1.5">
                  {m.system}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="absolute bottom-0 inset-x-0 flex items-center justify-between px-5 md:px-14 py-3 border-t border-white/5 z-10">
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/18 hidden sm:block">
          Scroll to navigate
        </span>
        <div className="flex items-center gap-2.5">
          {displayMembers.map((_, i) => (
            <div
              key={i}
              data-dot={i}
              className="w-1.5 h-1.5 md:w-1 md:h-1 rounded-full bg-white/20"
            />
          ))}
        </div>
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/18">
          Quint Pixels
        </span>
      </footer>
    </section>
  );
}
