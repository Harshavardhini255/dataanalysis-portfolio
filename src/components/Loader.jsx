import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useApp } from '../lib/useApp'
import { reducedMotion } from '../lib/motion'
import { meta } from '../data/content'

export default function Loader() {
  const rootRef = useRef(null)
  const { setLoaded } = useApp()

  useEffect(() => {
    if (reducedMotion()) {
      gsap.set(rootRef.current, { display: 'none' })
      setLoaded(true)
      return
    }

    const ctx = gsap.context(() => {
      const counter = { v: 0 }
      const counterEl = rootRef.current.querySelector('.loader-counter')
      const chars = gsap.utils.toArray('.loader-char .mask-inner')

      gsap.set(chars, { yPercent: 130 })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => setLoaded(true),
      })

      tl.to(counter, {
        v: 100,
        duration: 2.1,
        onUpdate: () => {
          counterEl.textContent = String(Math.round(counter.v)).padStart(3, '0')
        },
      })
        .to('.loader-fill', { scaleX: 1, duration: 2.1 }, 0)
        .to(chars, { yPercent: 0, duration: 0.9, stagger: 0.06, ease: 'power4.out' }, 0.25)
        .to('.loader-word', { opacity: 0, y: '-1.5rem', duration: 0.45, ease: 'power3.in' }, '+=0.25')
        .to('.loader-inner', { yPercent: -100, duration: 0.8, stagger: 0.05, ease: 'power4.inOut' }, '-=0.1')
        .to(rootRef.current, { yPercent: -100, duration: 1, ease: 'power4.inOut' }, '-=0.65')
        .set(rootRef.current, { display: 'none' })
    }, rootRef)

    return () => ctx.revert()
  }, [setLoaded])

  const letters = meta.monogram.split('')

  return (
    <div ref={rootRef} className="fixed inset-0 z-[120] bg-ink" aria-hidden="true">
      <div className="flex h-full flex-col justify-between p-6 sm:p-10">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
          <span>© 2026 Portfolio</span>
          <span>Harsha Vardhini — Data Analyst</span>
        </div>

        <div className="flex flex-col items-start gap-8">
          <div className="loader-word overflow-hidden font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
            Loading experience
          </div>
          <div
            className="loader-char flex font-display text-[30vw] font-bold leading-[0.82] tracking-tight text-paper sm:text-[22vw] md:text-[18vw]"
            aria-label="Loading"
          >
            {letters.map((l, i) => (
              <span key={i} className="mask">
                <span className="mask-inner">{l}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between gap-8">
          <div className="w-1/2 max-w-sm">
            <div className="h-px w-full overflow-hidden bg-paper/15">
              <div className="loader-fill h-full w-full origin-left scale-x-0 bg-accent" />
            </div>
          </div>
          <div className="loader-inner text-right">
            <div className="loader-counter font-mono text-[10px] uppercase tracking-[0.3em] text-mist">000</div>
          </div>
        </div>
      </div>
    </div>
  )
}