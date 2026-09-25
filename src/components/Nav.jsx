import { useEffect, useState } from 'react'
import { useApp } from '../lib/useApp'
import { Magnetic } from './primitives'
import { meta } from '../data/content'

export default function Nav() {
  const { openMenu } = useApp()
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setTime(
        `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} IST`
      )
    }
    tick()
    const id = window.setInterval(tick, 30000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-[60] mix-blend-difference">
      <div className="flex items-center justify-between px-6 py-5 sm:px-10">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0 })
          }}
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

        <div className="flex items-center gap-6 sm:gap-10">
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-paper/60 md:block">
            {time}
          </span>
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
      </div>
    </header>
  )
}