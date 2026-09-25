import { useEffect, useId, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export function Magnetic({ children, strength = 0.35, className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    if (reducedMotion()) return
    const el = ref.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' })

    const move = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [strength])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}

export function Kicker({ children, className = '' }) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-mist ${className}`}
    >
      <span className="inline-block h-[7px] w-[7px] bg-accent" aria-hidden="true" />
      {children}
    </div>
  )
}

export function Marquee({ items = [], className = '', duration = 30, sep = '✦' }) {
  const half = (key) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === 1}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap">{item}</span>
          <span className="mx-8 text-accent/70">{sep}</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`marquee ${className}`}>
      <div className="marquee__track" style={{ animationDuration: `${duration}s` }}>
        {half(0)}
        {half(1)}
      </div>
    </div>
  )
}

export function RotatingBadge({ text = '', className = '' }) {
  const id = useId()

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-full w-full animate-spin-slow">
        <defs>
          <path id={id} d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" fill="none" />
        </defs>
        <text className="font-mono text-[8.5px] uppercase tracking-[0.28em]" fill="currentColor">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-ink">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14m0 0-6-6m6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export function ParallaxImage({ src, alt = '', className = '', imgClassName = '', speed = 12, scale = 1.25 }) {
  const wrapRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -speed },
        {
          yPercent: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, wrapRef)
    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        style={{ transform: `scale(${scale})` }}
        className={`h-full w-full object-cover will-change-transform ${imgClassName}`}
      />
    </div>
  )
}

export function RevealBlock({ children, className = '', y = 40, stagger = 0.08, as: Tag = 'div' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      const items = ref.current.children
      gsap.set(items, { y, autoAlpha: 0 })
      gsap.to(items, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: 'power3.out',
        stagger,
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [y, stagger])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}