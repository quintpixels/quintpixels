'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { revealChars, revealLines, revealFade } from '@/lib/animations/textReveal'

gsap.registerPlugin(ScrollTrigger)

const PROCESS = [
  { step: '01', label: 'Discover', desc: 'Deep-dive into your problem space, users, and technical landscape.' },
  { step: '02', label: 'Architect', desc: 'Define the system structure, technology choices, and design language.' },
  { step: '03', label: 'Build', desc: 'Rapid, iterative construction with continuous refinement and feedback.' },
  { step: '04', label: 'Ship', desc: 'Deploy with precision. Monitor, iterate, and improve continuously.' },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLParagraphElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) revealChars(headingRef.current, { start: 'top 80%' })
      if (quoteRef.current) revealLines(quoteRef.current, { start: 'top 80%', stagger: 0.12 })

      const processItems = sectionRef.current?.querySelectorAll('[data-process-item]')
      if (processItems) {
        gsap.from(processItems, {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: processItems[0],
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }

      
      const philoEls = sectionRef.current?.querySelectorAll('[data-philo]')
      if (philoEls) {
        gsap.from(philoEls, {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: philoEls[0],
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-10 lg:px-16 bg-(--pix-white)"
    >
      
      <div className="flex items-center gap-4 mb-14">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-(--pix-gray)">006</span>
        <div className="h-px w-12 bg-(--pix-border)" />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-(--pix-gray)">The Studio</span>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
        
        <div>
          <div className="overflow-hidden mb-12">
            <h2
              ref={headingRef}
              className="font-pixel text-display-lg text-(--pix-black) leading-none"
            >
              ABOUT
            </h2>
          </div>

          <p
            ref={quoteRef}
            className="font-sans text-xl md:text-2xl text-(--pix-black) leading-[1.5] tracking-tight mb-10"
          >
            We are a creative technology studio obsessed with the intersection of rigorous engineering and expressive design. We build things that matter — with craft, intention, and an uncompromising standard of quality.
          </p>

          <div className="space-y-6">
            {[
              'We believe every interaction is a story told at 60 frames per second.',
              'Technology at its best disappears — leaving only experience.',
              'We don\'t ship features. We ship convictions.',
            ].map((line, i) => (
              <div
                key={i}
                data-philo
                className="flex gap-4 items-start"
              >
                <span className="font-mono text-[10px] tracking-wider text-(--pix-gray-light) mt-1">—</span>
                <p className="font-sans text-sm text-(--pix-gray) leading-relaxed">{line}</p>
              </div>
            ))}
          </div>
        </div>

        
        <div>
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-(--pix-gray) mb-10">
            How We Work
          </div>
          <div className="space-y-8">
            {PROCESS.map(({ step, label, desc }) => (
              <div
                key={step}
                data-process-item
                className="group grid grid-cols-[40px_1fr] gap-6 pb-8 border-b border-(--pix-border) last:border-0 last:pb-0"
              >
                <span className="font-mono text-[10px] tracking-[0.15em] text-(--pix-gray-light) pt-1">{step}</span>
                <div>
                  <h4 className="font-pixel text-display-sm text-(--pix-black) leading-none mb-3 group-hover:opacity-70 transition-opacity duration-300">
                    {label.toUpperCase()}
                  </h4>
                  <p className="font-sans text-sm text-(--pix-gray) leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
