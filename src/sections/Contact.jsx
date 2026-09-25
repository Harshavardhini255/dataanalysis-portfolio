import { meta } from '../data/content'
import { Kicker, Magnetic } from '../components/primitives'
import { RevealWords } from '../components/reveal'
import { useApp } from '../lib/useApp'

const ROWS = [
  { label: 'Email', value: meta.email, href: `mailto:${meta.email}` },
  { label: 'Phone', value: meta.phone, href: `tel:${meta.phoneRaw}` },
  { label: 'GitHub', value: 'github.com/Harshavardhini255', href: meta.github },
  { label: 'Based in', value: meta.location, href: null },
]

export default function Contact() {
  const { scrollTo } = useApp()

  return (
    <section id="contact" className="relative px-6 pb-10 pt-28 sm:px-10 sm:pt-40">
      <Kicker>06 — Contact</Kicker>

      <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="font-display font-bold uppercase leading-[0.82] tracking-tight">
          <RevealWords as="span" text="Let's" className="block text-[16vw] sm:text-[12vw] lg:text-[9vw]" />
          <RevealWords
            as="span"
            text="Talk"
            className="block text-[16vw] text-accent sm:text-[12vw] lg:text-[9vw]"
          />
        </h2>

        <Magnetic strength={0.4} className="w-fit">
          <a
            href={`mailto:${meta.email}`}
            data-cursor="Say hi"
            data-cursor-scale="2"
            aria-label="Email Harsha"
            className="group flex h-40 w-40 items-center justify-center rounded-full border border-line transition-colors duration-500 hover:border-accent sm:h-52 sm:w-52"
          >
            <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-accent text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em]">Email me</span>
              <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-0" aria-hidden="true" />
            </span>
          </a>
        </Magnetic>
      </div>

      <div className="mt-20 border-b border-line">
        {ROWS.map((r) => (
          <div key={r.label} className="group border-t border-line">
            {r.href ? (
              <a
                href={r.href}
                target={r.href.startsWith('http') ? '_blank' : undefined}
                rel={r.href.startsWith('http') ? 'noreferrer' : undefined}
                data-cursor="Open"
                className="grid grid-cols-[auto_1fr] items-center gap-4 py-6 sm:grid-cols-[160px_1fr_auto] sm:gap-6 sm:py-8"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-mist">{r.label}</span>
                <span className="font-display text-xl font-bold tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 sm:text-3xl">
                  {r.value}
                </span>
                <span className="hidden justify-self-end text-xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-2 sm:block" aria-hidden="true">
                  ↗
                </span>
              </a>
            ) : (
              <div className="grid grid-cols-[auto_1fr] items-center gap-4 py-6 sm:grid-cols-[160px_1fr_auto] sm:gap-6 sm:py-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-mist">{r.label}</span>
                <span className="font-display text-xl font-bold tracking-tight sm:text-3xl">{r.value}</span>
                <span className="hidden sm:block" aria-hidden="true" />
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className="mt-10 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-mist">
          <span>© 2026 {meta.name}</span>
          <span className="mx-2 inline-block h-4 w-px bg-line" />
          <a href={meta.github} target="_blank" rel="noreferrer" className="link-sweep text-paper">GitHub</a>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mist">
          Built with React · GSAP · Lenis · Tailwind
        </p>
        <button
          onClick={() => scrollTo('#top')}
          className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-mist hover:text-paper"
          aria-label="Back to top"
        >
          Back to top
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">↑</span>
        </button>
      </footer>
    </section>
  )
}