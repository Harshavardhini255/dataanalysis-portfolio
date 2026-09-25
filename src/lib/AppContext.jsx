import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { AppContext } from './context'

gsap.registerPlugin(ScrollTrigger)

export function AppProvider({ children }) {
  const [loaded, setLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lenisRef = useRef(null)
  const booted = useRef(false)

  useEffect(() => {
    if (booted.current) return
    booted.current = true

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })
    lenisRef.current = lenis
    lenis.stop()

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      gsap.ticker.lagSmoothing(0)
    }
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (loaded && !menuOpen) lenis.start()
    else lenis.stop()
  }, [loaded, menuOpen])

  useEffect(() => {
    if (!loaded) return
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 60)
    return () => window.clearTimeout(t)
  }, [loaded])

  const scrollTo = useCallback((target) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) })
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const value = {
    loaded,
    setLoaded,
    menuOpen,
    openMenu: useCallback(() => setMenuOpen(true), []),
    closeMenu: useCallback(() => setMenuOpen(false), []),
    scrollTo,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}