import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { reducedMotion } from '../lib/motion'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (reducedMotion()) return

    document.body.classList.add('has-cursor')

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0, x: -100, y: -100 })

    const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' })
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' })

    let shown = false

    const move = (e) => {
      if (!shown) {
        gsap.set([dot, ring], { autoAlpha: 1 })
        shown = true
      }
      ringX(e.clientX)
      ringY(e.clientY)
      dotX(e.clientX)
      dotY(e.clientY)
    }

    const over = (e) => {
      const t = e.target.closest('[data-cursor]')
      if (!t) return
      const scale = Number(t.dataset.cursorScale || 2.8)
      gsap.to(ring, { scale, duration: 0.45, ease: 'back.out(2.2)' })
      gsap.to(dot, { scale: 0, duration: 0.3, ease: 'power3.out' })
      if (label) {
        label.textContent = t.dataset.cursor || ''
        gsap.to(label, { autoAlpha: t.dataset.cursor ? 1 : 0, duration: 0.25 })
      }
    }

    const out = (e) => {
      const t = e.target.closest('[data-cursor]')
      if (t) return
      gsap.to(ring, { scale: 1, duration: 0.4, ease: 'power3.out' })
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power3.out' })
      if (label) gsap.to(label, { autoAlpha: 0, duration: 0.25 })
    }

    const leave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 })

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    document.documentElement.addEventListener('mouseleave', leave)

    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[220] hidden md:block" aria-hidden="true">
      <div ref={dotRef} className="absolute left-0 top-0 h-2 w-2 rounded-full bg-accent" />
      <div ref={ringRef} className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border border-paper/40">
        <span ref={labelRef} className="bg-ink/60 px-2 font-mono text-[9px] uppercase tracking-[0.2em] text-paper backdrop-blur-sm" />
      </div>
    </div>
  )
}