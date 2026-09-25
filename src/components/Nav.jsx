import { useEffect, useState } from 'react'
import { useApp } from '../lib/useApp'
import { Magnetic } from './primitives'
import { meta } from '../data/content'

const LINKS = [
  { label: 'About', target: '#about' },
  { label: 'Work', target: '#works' },
  { label: 'Experience', target: '#experience' },
  { label: 'Contact', target: '#contact' },
]

export default function Nav() {
  const { openMenu, scrollTo } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = LINKS.map((l) => l.target.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const go = (target) => (e) => {
    e.preventDefault()
    scrollTo(target)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] border-b transition-all duration-500 ${
        scrolled
          ? 'border-line bg-ink/70 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-5 sm:px-10">
        <a
          href="#top"
          onClick={go('#top')}
          className="text-paper"
          aria-label="Back to top"
        >
          <Magnetic strength={0.25}>
            <span className="block font-display text-lg font-bold tracking-tight">
              {meta.monogram}
              <sup className="ml-0.5 text-accent">®</sup>
            </span>
          </Magnetic>
        </a>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {LINKS.map((l) => {
            const isActive = active === l.target.slice(1)
            return (
              <button
                key={l.target}
                onClick={go(l.target)}
                className="group relative py-1 font-mono text-[11px] uppercase tracking-[0.25em]"
                aria-current={isActive ? 'true' : undefined}
              >
                <span
                  className={`transition-colors duration-300 ${
                    isActive ? 'text-paper' : 'text-paper/55 group-hover:text-paper'
                  }`}
                >
                  {l.label}
                </span>
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  aria-hidden="true"
                />
              </button>
            )
          })}
        </nav>

        <button
          onClick={openMenu}
          className="group flex items-center gap-3 py-2 text-paper"
          aria-label="Open menu"
        >
          <span className="block space-y-1.5" aria-hidden="true">
            <span className="block h-px w-7 bg-current transition-transform duration-300 group-hover:w-5" />
            <span className="block h-px w-5 bg-current transition-all duration-300 group-hover:w-7" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em]">Menu</span>
        </button>
      </div>
    </header>
  )
}