"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealChars } from "@/lib/animations/textReveal";
import { ArrowUpRight, Layers, Network, Workflow } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: "P01",
    name: "QuintFlow",
    type: "Project Management & Collaboration",
    desc: "A streamlined workspace to create, assign, and track time-sensitive tasks, featuring built-in team chat for seamless communication.",
    Icon: Network,
    status: "Available",
  },
  {
    id: "P02",
    name: "QuintTickets",
    type: "Event Management & Ticketing",
    desc: "An end-to-end event platform for organizers to list and promote events, featuring seamless ticket booking, real-time availability, and role-based dashboards.",
    Icon: Layers,
    status: "Beta",
  },
  {
    id: "P03",
    name: "QuintEduDeck",
    type: "School Management System (ERP)",
    desc: "A comprehensive school management platform featuring instant QR-based attendance tracking, academic management, and administrative tools for modern campuses.",
    Icon: Layers,
    status: "Available",
  },
];

const PRODUCT_ICON_MAP: Record<
  string,
  React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>
> = {
  Layers,
  Network,
  Workflow,
};

interface ProductItem {
  id: string;
  name: string;
  type: string;
  desc: string;
  icon?: string;
  status: string;
  learnMoreUrl?: string;
}

interface ProductsSectionProps {
  products?: ProductItem[];
}

export function ProductsSection({ products }: ProductsSectionProps) {
  const displayProducts =
    products && products.length > 0
      ? products
      : PRODUCTS.map((p) => ({
          ...p,
          icon: p.Icon.displayName ?? p.Icon.name,
        }));
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        revealChars(headingRef.current, { start: "top 80%" });
      }

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1.0,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });

        const borderEl = card.querySelector("[data-card-border]");
        card.addEventListener("mouseenter", () => {
          gsap.to(borderEl, { opacity: 1, duration: 0.3 });
          gsap.to(card, { y: -6, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(borderEl, { opacity: 0, duration: 0.4 });
          gsap.to(card, { y: 0, duration: 0.5, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-10 lg:px-16 bg-(--pix-surface)"
    >
      
      <div className="flex items-center gap-4 mb-14">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-(--pix-gray)">
          005
        </span>
        <div className="h-px w-12 bg-(--pix-border)" />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-(--pix-gray)">
          Our Products
        </span>
      </div>

      <div className="overflow-hidden mb-20">
        <h2
          ref={headingRef}
          className="font-pixel text-display-lg text-(--pix-black) leading-none"
        >
          PRODUCTS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-(--pix-border)">
        {displayProducts.map(({ id, name, type, desc, icon, status }, i) => {
          const Icon =
            icon && PRODUCT_ICON_MAP[icon] ? PRODUCT_ICON_MAP[icon] : Layers;
          return (
            <div
              key={id}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="group relative bg-(--pix-surface) p-10 md:p-12 cursor-pointer"
            >
              
              <div
                data-card-border
                className="absolute top-0 left-0 right-0 h-px bg-(--pix-black) opacity-0"
              />

              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-[10px] tracking-[0.2em] text-(--pix-gray-light)">
                  {id}
                </span>
                <Icon
                  size={22}
                  strokeWidth={1}
                  className="text-(--pix-gray-light) group-hover:text-(--pix-black) transition-colors duration-300"
                />
              </div>

              <div className="mb-3">
                <h3 className="font-pixel text-display-sm text-(--pix-black) leading-none mb-2">
                  {name}
                </h3>
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-(--pix-gray)">
                  {type}
                </span>
              </div>

              <p className="font-sans text-sm text-(--pix-gray) leading-relaxed mb-10">
                {desc}
              </p>

              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-1 border ${
                    status === "Available"
                      ? "border-(--pix-black) text-(--pix-black)"
                      : status === "Beta"
                        ? "border-(--pix-gray) text-(--pix-gray)"
                        : "border-(--pix-border) text-(--pix-gray-light)"
                  }`}
                >
                  {status}
                </span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="text-(--pix-gray-light) group-hover:text-(--pix-black) transition-all duration-300 opacity-0 group-hover:opacity-100"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
