import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portrait from '../assets/portrait.jpg'
import { useApp } from '../lib/useApp'
import { reducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { loaded } = useApp()
  const rootRef = useRef(null)
  const reduce = reducedMotion()

  useEffect(() => {
    if (!loaded || reducedMotion()) return
    const root = rootRef.current

    const ctx = gsap.context(() => {
      const meta = root.querySelectorAll('.hero-meta > *')
      const words = root.querySelectorAll('.hero-title .mask-inner')
      const sub = root.querySelectorAll('.hero-sub > *')
      const frame = root.querySelector('.hero-frame-inner')
      const cue = root.querySelector('.hero-cue')

      gsap.set(words, { yPercent: 125, rotate: 5, transformOrigin: '0% 100%' })
      gsap.set(meta, { autoAlpha: 0, y: 26 })
      gsap.set(sub, { autoAlpha: 0, y: 24 })
      gsap.set(cue, { autoAlpha: 0 })
      gsap.set(frame, { scale: 1.35, clipPath: 'inset(14%)' })

      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power4.out' } })
      tl.to(meta, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 })
        .to(words, { yPercent: 0, rotate: 0, duration: 1.15, stagger: 0.07 }, 0.2)
        .to(sub, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.55)
        .to(cue, { autoAlpha: 1, duration: 0.8 }, 0.9)
        .to(frame, { scale: 1, clipPath: 'inset(0%)', duration: 1.6, ease: 'power3.inOut' }, 0.5)
    }, root)

    return () => ctx.revert()
  }, [loaded])

  useEffect(() => {
    if (reducedMotion()) return
    const root = rootRef.current
    const ctx = gsap.context(() => {
      gsap.to('.hero-frame', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-title', {
        y: -90,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-ghost', {
        yPercent: -32,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-meta', {
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: '20% top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={rootRef} className="relative min-h-[100svh] overflow-hidden">
      <div className="flex min-h-[100svh] flex-col justify-between gap-10 px-6 pt-28 sm:px-10 sm:pt-32">
        <div className="hero-meta flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-mist sm:text-[11px]">
          <span>© 2026 Portfolio</span>
          <span>Tirunelveli, India</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-paper">Available for work</span>
          </span>
        </div>

        <div className="relative">
          <span
            aria-hidden="true"
            className="hero-ghost pointer-events-none absolute right-[-4vw] top-[28%] z-0 whitespace-nowrap text-stroke-mist font-display text-[27vw] font-extrabold uppercase leading-none opacity-40 sm:text-[22vw]"
          >
            Analytics
          </span>

          <h1 className="hero-title relative z-[1] font-display font-extrabold uppercase leading-[0.8] tracking-tight text-[16.5vw] sm:text-[14vw] lg:text-[11rem]">
            <span className="block overflow-hidden">
              <span
                className="mask-inner block text-accent"
                style={reduce ? undefined : { transform: 'translateY(125%)' }}
              >
                Harsha
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="mask-inner block"
                style={reduce ? undefined : { transform: 'translateY(125%)' }}
              >
                Vardhini
                <span className="ml-[0.14em] hidden font-serif text-[0.24em] font-normal normal-case italic leading-[1] tracking-normal text-mist sm:inline-block">
                  — data analyst
                </span>
              </span>
            </span>
          </h1>

          <div className="hero-sub mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-mist sm:text-[11px]">
              <span>Python</span>
              <span className="text-accent">/</span>
              <span>SQL</span>
              <span className="text-accent">/</span>
              <span>Power BI</span>
              <span className="text-accent">/</span>
              <span>BI</span>
            </div>
            <p className="max-w-xs text-sm font-light leading-relaxed text-mist">
              Turning raw datasets into clear business insight — with Python, SQL,
              Power BI and AI-driven analytics.
            </p>
          </div>
        </div>

        <div className="relative pb-8">
          <div className="hero-frame relative h-[38vh] overflow-hidden sm:h-[46vh]">
            <div className="hero-frame-inner relative h-full w-full">
              <img
                src={portrait}
                alt="Portrait of Harsha Vardhini"
                className="h-[128%] w-full object-cover object-[50%_22%]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/30 to-transparent" aria-hidden="true" />
              <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-paper mix-blend-difference sm:left-6 sm:top-6">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                Harsha Vardhini — Data Analyst
              </div>
            </div>
          </div>
          <div className="hero-cue pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-mist">
            <span>Scroll to explore</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-paper">
              ↓
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}