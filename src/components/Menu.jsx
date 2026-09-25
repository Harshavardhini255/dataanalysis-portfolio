import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useApp } from '../lib/useApp'
import { Magnetic } from './primitives'
import { meta } from '../data/content'

const LINKS = [
  { index: '01', label: 'Index', target: '#top' },
  { index: '02', label: 'Works', target: '#works' },
  { index: '03', label: 'About', target: '#about' },
  { index: '04', label: 'Skills', target: '#skills' },
  { index: '05', label: 'Experience', target: '#experience' },
  { index: '06', label: 'Contact', target: '#contact' },
]

export default function Menu() {
  const { menuOpen, closeMenu, scrollTo } = useApp()
  const rootRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const links = gsap.utils.toArray('.menu-link .mask-inner')
      const footer = gsap.utils.toArray('.menu-footer > *')

      gsap.set(links, { yPercent: 120 })
      gsap.set(footer, { autoAlpha: 0, y: 24 })

      tlRef.current = gsap.timeline({ paused: true })
        .set(rootRef.current, { pointerEvents: 'auto' }, 0)
        .fromTo(
          rootRef.current,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power4.inOut' },
          0
        )
        .to(links, { yPercent: 0, duration: 0.9, stagger: 0.07, ease: 'power4.out' }, 0.25)
        .to(footer, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, 0.5)
        .to('.menu-close-x', { rotate: 135, duration: 0.6, ease: 'power3.inOut' }, 0.2)
    }, rootRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const tl = tlRef.current
    if (!tl) return
    if (menuOpen) {
      tl.timeScale(1).play()
      document.body.style.overflow = 'hidden'
    } else {
      tl.timeScale(1.2).reverse()
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const go = (target) => {
    const tl = tlRef.current
    if (tl) tl.timeScale(1.6).reverse()
    window.setTimeout(() => {
      scrollTo(target)
      closeMenu()
    }, 280)
  }

  return (
    <div
      ref={rootRef}
      className="menu-overlay fixed inset-0 z-[80] overflow-hidden bg-ink text-paper"
      style={{ clipPath: 'inset(0 0 100% 0)', pointerEvents: 'none' }}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!menuOpen}
    >
      <div className="flex h-full flex-col justify-between p-6 sm:p-10">
        <div className="flex items-center justify-between">
          <a href="#top" className="font-display text-lg font-bold" onClick={(e) => { e.preventDefault(); go('#top') }}>
            {meta.monogram}
            <sup className="ml-0.5 text-accent">®</sup>
          </a>
          <button
            onClick={() => closeMenu()}
            className="relative flex h-12 w-12 items-center justify-center"
            aria-label="Close menu"
          >
            <span className="menu-close-x relative block h-6 w-6" aria-hidden="true">
              <span className="absolute left-0 top-1/2 block h-px w-6 -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 block h-px w-6 -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <nav className="flex flex-col" aria-label="Primary">
          {LINKS.map((l) => (
            <button
              key={l.target}
              onClick={() => go(l.target)}
              data-cursor="Go"
              data-cursor-scale="1.6"
              className="menu-link group flex items-baseline gap-4 border-b border-line py-4 text-left sm:gap-8 sm:py-5"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-mist">{l.index}</span>
              <span className="mask">
                <span className="mask-inner font-display text-4xl font-bold tracking-tight transition-all duration-300 group-hover:translate-x-3 group-hover:text-accent sm:text-6xl md:text-7xl">
                  {l.label}
                </span>
              </span>
              <span className="ml-auto translate-x-3 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:ml-0" aria-hidden="true">
                →
              </span>
            </button>
          ))}
        </nav>

        <div className="menu-footer flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Magnetic strength={0.2} className="w-fit">
            <a href={`mailto:${meta.email}`} className="link-sweep font-mono text-[11px] uppercase tracking-[0.2em] text-paper">
              {meta.email}
            </a>
          </Magnetic>
          <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.25em] text-mist">
            <a href={meta.github} target="_blank" rel="noreferrer" className="link-sweep hover:text-paper">GitHub</a>
            <span>{meta.location}</span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              {meta.availability}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}