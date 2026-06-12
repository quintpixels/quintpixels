"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { login } from "@/lib/actions/auth";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(bgRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });

      tl.from(
        "[data-form-el]",
        {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const registrationEnabled = process.env.NEXT_PUBLIC_APP_URL; 

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex bg-[#080807] overflow-hidden"
    >
      
      <div
        ref={bgRef}
        className="hidden lg:flex flex-col justify-between w-[46%] p-12 border-r border-white/5 relative overflow-hidden"
      >
        
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(11,11,10,0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(11,11,10,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-white/10" />
        <div className="absolute top-[35%] right-[20%] w-1.5 h-1.5 bg-white/5" />
        <div className="absolute bottom-[30%] left-[25%] w-3 h-3 bg-white/5" />
        <div className="absolute bottom-[20%] right-[15%] w-1 h-1 bg-white/15" />

        <div>
          <div className="inline-flex items-center gap-3 mb-16">
            <div className="w-8 h-8 bg-[#0b0b0a] flex items-center justify-center">
              <span className="font-pixel text-[9px] text-[#f7f5f2]">PX</span>
            </div>
            <span className="font-pixel text-[10px] tracking-widest text-white/60 uppercase">
              QUINT PIXELS
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="font-pixel text-[10px] tracking-[0.3em] text-white/25 uppercase mb-6">
            ADMIN SYSTEM
          </div>
          <h1 className="text-display-lg font-pixel text-white leading-none mb-6">
            CONTROL
            <br />
            <span className="text-white/30">CENTRE</span>
          </h1>
          <p className="font-mono text-[11px] text-white/30 leading-relaxed max-w-xs">
            Manage every pixel of your digital presence from one unified command
            interface.
          </p>

          <div className="mt-12 space-y-2">
            {[
              "CONTENT MANAGEMENT",
              "TEAM CONTROL",
              "FORM RESPONSES",
              "SEO SETTINGS",
            ].map((line, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1 h-1 bg-white/20" />
                <span className="font-pixel text-[7px] tracking-[0.2em] text-white/20 uppercase">
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
          <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">
            SYSTEM ONLINE
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-sm">
          
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-7 h-7 bg-[#0b0b0a] flex items-center justify-center">
              <span className="font-pixel text-[8px] text-[#f7f5f2]">PX</span>
            </div>
            <span className="font-pixel text-[9px] tracking-widest text-white/50 uppercase">
              PIXELS CMS
            </span>
          </div>

          <div data-form-el className="mb-10">
            <div className="font-pixel text-[8px] tracking-[0.3em] text-white/25 uppercase mb-3">
              ADMIN LOGIN
            </div>
            <h2 className="font-pixel text-[28px] text-white leading-none">
              SIGN IN
            </h2>
          </div>

          <form action={action} className="space-y-5">
            
            {state?.message && (
              <div
                data-form-el
                className="px-4 py-3 border border-red-500/20 bg-red-500/5 rounded-sm"
              >
                <p className="font-mono text-[10px] text-red-400">
                  {state.message}
                </p>
              </div>
            )}

            <div data-form-el>
              <label className="block font-pixel text-[7px] tracking-[0.25em] text-white/30 uppercase mb-2">
                EMAIL
              </label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full bg-white/3 border border-white/8 rounded-sm px-4 py-3 font-mono text-[12px] text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
                placeholder="admin@pixels.studio"
              />
              {state?.errors?.email && (
                <p className="mt-1 font-mono text-[9px] text-red-400">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            <div data-form-el>
              <label className="block font-pixel text-[7px] tracking-[0.25em] text-white/30 uppercase mb-2">
                PASSWORD
              </label>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full bg-white/3 border border-white/8 rounded-sm px-4 py-3 font-mono text-[12px] text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
                placeholder="••••••••"
              />
              {state?.errors?.password && (
                <p className="mt-1 font-mono text-[9px] text-red-400">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            <div data-form-el className="pt-2">
              <button
                type="submit"
                disabled={pending}
                className="w-full bg-white text-black font-pixel text-[9px] tracking-widest uppercase py-3.5 rounded-sm hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pending ? "AUTHENTICATING..." : "ENTER SYSTEM"}
              </button>
            </div>
          </form>

          <div data-form-el className="mt-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/5" />
            <Link
              href="/pixels/register"
              className="font-pixel text-[7px] tracking-widest text-white/20 hover:text-white/40 uppercase transition-colors"
            >
              REQUEST ACCESS
            </Link>
            <div className="h-px flex-1 bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
