import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function ImageReveal({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  cursor = 'Explore',
  cursorScale = '2',
}) {
  const wrapRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current,
        { clipPath: 'inset(14% 10% 14% 10%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top 92%',
            end: 'top 42%',
            scrub: 0.6,
          },
        }
      )
      gsap.fromTo(
        imgRef.current,
        { scale: 1.35 },
        {
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top 95%',
            end: 'bottom 8%',
            scrub: true,
          },
        }
      )
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={wrapRef}
      data-cursor={cursor}
      data-cursor-scale={cursorScale}
      className={`overflow-hidden ${className}`}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover will-change-transform ${imgClassName}`}
      />
    </div>
  )
}