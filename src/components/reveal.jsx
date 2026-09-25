import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

/* Word-by-word mask reveal for display headings. */
export function RevealWords({ text, as: Tag = 'h2', className = '', delay = 0, stagger = 0.06, start = 'top 88%', autoplay = false }) {
  const ref = useRef(null)
  const words = text.split(' ')

  useEffect(() => {
    if (reducedMotion()) return
    const el = ref.current
    const targets = el.querySelectorAll('.mask-inner')
    if (!targets.length) return

    const ctx = gsap.context(() => {
      gsap.set(targets, { yPercent: 125, rotate: 5, transformOrigin: '0% 100%' })
      const tween = gsap.to(targets, {
        yPercent: 0,
        rotate: 0,
        duration: 1,
        ease: 'power4.out',
        stagger,
        delay,
      })
      if (autoplay) {
        tween.play()
      } else {
        tween.pause()
        ScrollTrigger.create({ trigger: el, start, once: true, onEnter: () => tween.play() })
      }
    }, el)
    return () => ctx.revert()
  }, [text, delay, stagger, start, autoplay])

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="mask">
          <span className="mask-inner">{word}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

/* Scrub-revealed paragraph: each line slides up as you scroll. */
export function MaskParagraph({ lines, as: Tag = 'p', className = '', start = 'top 82%', end = 'top 32%' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (reducedMotion()) return
    const el = ref.current
    const targets = el.querySelectorAll('.mask-inner')

    const ctx = gsap.context(() => {
      gsap.set(targets, { yPercent: 118 })
      gsap.to(targets, {
        yPercent: 0,
        ease: 'none',
        stagger: 0.12,
        scrollTrigger: { trigger: el, start, end, scrub: 0.6 },
      })
    }, el)
    return () => ctx.revert()
  }, [start, end])

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="mask block">
          <span className="mask-inner block will-change-transform">{line}</span>
        </span>
      ))}
    </Tag>
  )
}

/* Wrapper that drives a small set of elements into view. */
export function RevealGroup({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(ref.current.children, {
        y: 44,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}