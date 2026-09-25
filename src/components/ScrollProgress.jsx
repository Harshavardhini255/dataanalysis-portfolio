import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const ref = useRef(null)

  useEffect(() => {
    if (reducedMotion()) return
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.set(el, { scaleX: 0, transformOrigin: '0% 50%' })
      gsap.to(el, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.4 },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  if (reducedMotion()) return null

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-x-0 top-0 z-[95] h-[2px] origin-left bg-accent"
      aria-hidden="true"
    />
  )
}