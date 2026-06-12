"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealChars } from "@/lib/animations/textReveal";
import { createMagnetic } from "@/lib/animations/magnetic";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { submitContact } from "@/lib/actions/forms";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current)
        revealChars(headingRef.current, { start: "top 80%" });

      const fields = formRef.current?.querySelectorAll("[data-field]");
      if (fields) {
        gsap.from(fields, {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      }

      if (ctaRef.current) {
        const cleanup = createMagnetic(ctaRef.current, { strength: 0.5 });
        return cleanup;
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const fd = new FormData();
    fd.append("name", formState.name);
    fd.append("email", formState.email);
    fd.append("message", formState.message);
    fd.append("source", "contact");
    startTransition(async () => {
      const result = await submitContact(undefined, fd);
      if (result?.errors) {
        const firstError = Object.values(result.errors).flat()[0];
        setSubmitError(firstError ?? "Something went wrong. Please try again.");
      } else {
        setSent(true);
      }
    });
  };

  return (
    <section
      ref={sectionRef}
      data-dark-section
      className="relative py-32 md:py-48 px-6 md:px-10 lg:px-16 bg-(--pix-black) overflow-hidden"
    >
      
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-pixel text-[28vw] text-white/2.5 leading-none tracking-tighter whitespace-nowrap">
          CONNECT
        </span>
      </div>

      <div className="relative z-10 flex items-center gap-4 mb-14">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">
          007
        </span>
        <div className="h-px w-12 bg-white/10" />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">
          Start a Conversation
        </span>
      </div>

      <div className="relative z-10 overflow-hidden mb-20">
        <h2
          ref={headingRef}
          className="font-pixel text-display-lg text-white leading-none"
        >
          LET'S BUILD
        </h2>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        <div className="flex flex-col justify-between gap-16">
          <div>
            <p className="font-sans text-lg text-white/60 leading-relaxed mb-10 max-w-sm">
              Whether it's a new product, a complex system, or an idea still
              taking shape — we want to hear it.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail size={16} strokeWidth={1} className="text-white/30" />
                <a
                  href="mailto:hello@quintpixels.com"
                  className="font-mono text-xs tracking-wider text-white/60 hover:text-white transition-colors duration-300"
                >
                  hello@quintpixels.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={16} strokeWidth={1} className="text-white/30" />
                <span className="font-mono text-xs tracking-wider text-white/60">
                  Remote · Global
                </span>
              </div>
            </div>
          </div>

          <div>
            <a
              ref={ctaRef}
              href="mailto:hello@quintpixels.com"
              className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.15em] uppercase border border-white/20 px-8 py-4 text-white hover:border-white hover:bg-white hover:text-(--pix-black) transition-all duration-400"
            >
              Send a Message
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6"
          noValidate
        >
          {sent ? (
            <div className="py-16 text-center">
              <p className="font-pixel text-display-sm text-white leading-none mb-4">
                SENT
              </p>
              <p className="font-mono text-xs text-white/40 tracking-wider">
                We'll be in touch shortly.
              </p>
            </div>
          ) : (
            <>
              <div data-field className="relative">
                <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-white/65 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, name: e.target.value }))
                  }
                  className="w-full bg-transparent border-b border-white/35 focus:border-white/80 py-3 font-sans text-sm text-white placeholder:text-white/35 outline-none transition-colors duration-300"
                  placeholder="Your full name"
                />
              </div>

              <div data-field className="relative">
                <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-white/65 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, email: e.target.value }))
                  }
                  className="w-full bg-transparent border-b border-white/35 focus:border-white/80 py-3 font-sans text-sm text-white placeholder:text-white/35 outline-none transition-colors duration-300"
                  placeholder="you@company.com"
                />
              </div>

              <div data-field className="relative">
                <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-white/65 mb-2">
                  Project Brief
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, message: e.target.value }))
                  }
                  className="w-full bg-transparent border-b border-white/35 focus:border-white/80 py-3 font-sans text-sm text-white placeholder:text-white/35 outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell us about your project, goals, and timeline..."
                />
              </div>

              <div data-field>
                {submitError && (
                  <p className="text-[10px] font-mono tracking-wider text-red-400/80 mb-3">
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full font-pixel text-[10px] tracking-[0.15em] uppercase border-2 border-white px-6 py-4 text-white hover:bg-white hover:text-(--pix-black) disabled:opacity-60 transition-all duration-300"
                >
                  {isPending ? "Sending..." : "Submit Inquiry →"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>

      <div className="relative z-10 mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/white-logo.png" alt="Quint Pixels" width={20} height={20} className="w-5 h-5 object-contain opacity-30" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/20">
            © 2026 QUINT PIXELS — Creative Technology Studio
          </span>
        </div>
        <div className="flex gap-6">
          {["Twitter/X", "LinkedIn", "GitHub", "Dribbble"].map((link) => (
            <span
              key={link}
              className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/20 hover:text-white/60 cursor-pointer transition-colors duration-300"
            >
              {link}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
