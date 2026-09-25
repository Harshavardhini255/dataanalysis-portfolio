import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useApp } from '../lib/useApp'
import { reducedMotion } from '../lib/motion'

export default function PageTransition({ children }) {
  const ref = useRef(null)
  const { loaded } = useApp()

  useEffect(() => {
    if (reducedMotion() || !loaded || !ref.current) return
    gsap.fromTo(
      ref.current,
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' }
    )
  }, [loaded])

  return (
    <div ref={ref} style={reducedMotion() ? undefined : { opacity: 0 }}>
      {children}
    </div>
  )
}