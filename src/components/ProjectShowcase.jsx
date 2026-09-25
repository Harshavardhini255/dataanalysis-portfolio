import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import w1 from '../assets/w1.svg'
import w2 from '../assets/w2.svg'
import w3 from '../assets/w3.svg'
import w4 from '../assets/w4.svg'
import { reducedMotion } from '../lib/motion'

const FALLBACK = [w1, w2, w3, w4]

const projectShots = Object.entries(
  import.meta.glob('../assets/projects/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)

const shotFor = (i) => projectShots[i] ?? FALLBACK[i % FALLBACK.length]

export default function ProjectShowcase({ projects = [] }) {
  const sectionRef = useRef(null)
  const previewRef = useRef(null)
  const [active, setActive] = useState(-1)

  useEffect(() => {
    if (reducedMotion()) return
    const section = sectionRef.current
    const imgEl = previewRef.current
    if (!section || !imgEl) return

    gsap.set(imgEl, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.9 })
    const xTo = gsap.quickTo(imgEl, 'x', { duration: 0.9, ease: 'power3.out' })
    const yTo = gsap.quickTo(imgEl, 'y', { duration: 0.9, ease: 'power3.out' })

    const move = (e) => {
      const r = section.getBoundingClientRect()
      xTo(e.clientX - r.left)
      yTo(e.clientY - r.top)
    }

    section.addEventListener('mousemove', move)
    return () => section.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    const imgEl = previewRef.current
    if (!imgEl) return
    if (active >= 0) {
      gsap.to(imgEl, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power3.out' })
    } else {
      gsap.to(imgEl, { autoAlpha: 0, scale: 0.9, duration: 0.3, ease: 'power3.in' })
    }
  }, [active])

  return (
    <div ref={sectionRef} className="relative">
      <div className="mt-16 border-b border-line">
        {projects.map((p) => {
          const inner = (
            <div className="relative z-10 flex items-center gap-4 py-7 sm:gap-8 sm:py-9">
              <span className="w-8 shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-mist transition-colors duration-500 group-hover:text-paper sm:w-12">
                {p.n}
              </span>
              <span className="flex-1 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4">
                <span className="block font-display text-3xl font-bold uppercase leading-none tracking-tight transition-colors duration-500 group-hover:text-paper sm:text-5xl md:text-6xl">
                  {p.title}
                </span>
              </span>
              <span className="hidden w-52 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-mist transition-colors duration-500 group-hover:text-paper md:block">
                {p.category}
              </span>
              <span className="hidden w-28 shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-mist transition-colors duration-500 group-hover:text-paper lg:block">
                {p.year}
              </span>
              <span
                className="shrink-0 text-xl text-paper transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-2"
                aria-hidden="true"
              >
                {p.href ? '↗' : '→'}
              </span>
            </div>
          )

          const content = (
            <div
              key={p.n}
              className="group relative overflow-hidden border-t border-line"
              onMouseEnter={() => setActive(Number(p.n) - 1)}
              onMouseLeave={() => setActive(-1)}
              data-cursor={p.href ? 'Open ↗' : 'View'}
              data-cursor-scale="1.8"
            >
              <div
                className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                aria-hidden="true"
              />
              <div className="absolute inset-0 origin-top scale-y-0 border-t border-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" aria-hidden="true" />
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                aria-hidden="true"
              />
              {p.href ? (
                <a href={p.href} target="_blank" rel="noreferrer" aria-label={`Open project ${p.n}`}>
                  {inner}
                </a>
              ) : (
                <div>{inner}</div>
              )}
            </div>
          )

          return content
        })}
      </div>

      <div
        ref={previewRef}
        className="pointer-events-none absolute left-0 top-0 z-20 hidden aspect-[4/3] w-[26rem] overflow-hidden lg:block"
        aria-hidden="true"
      >
        {projects.map((p, i) => (
          <img
            key={p.n}
            src={shotFor(i)}
            alt=""
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-paper mix-blend-difference">
          <span className="inline-block h-1.5 w-1.5 bg-accent" />
          {projects[active]?.stack ?? ''}
        </div>
      </div>
    </div>
  )
}