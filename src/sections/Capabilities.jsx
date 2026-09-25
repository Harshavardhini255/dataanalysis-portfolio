import { capabilities } from '../data/content'
import { Kicker } from '../components/primitives'
import { RevealWords } from '../components/reveal'

export default function Capabilities() {
  return (
    <section id="capabilities" className="px-6 py-28 sm:px-10 sm:py-40">
      <Kicker>02 — What I Do</Kicker>
      <RevealWords
        text="Capabilities"
        className="mt-4 font-display text-5xl font-bold uppercase tracking-tight sm:text-7xl"
      />

      <div className="mt-16 border-b border-line">
        {capabilities.map((c) => (
          <div
            key={c.n}
            data-cursor="Open"
            className="group relative grid overflow-hidden border-t border-line sm:grid-cols-[auto_1fr_auto] sm:items-center"
          >
            <div className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" aria-hidden="true" />
            <div className="relative z-10 flex items-center gap-6 py-8 sm:px-6 sm:py-10">
              <span className="font-mono text-[11px] tracking-[0.2em] text-mist transition-colors duration-500 group-hover:text-ink/60">
                {c.n}
              </span>
              <span className="flex flex-col gap-2">
                <span className="font-display text-2xl font-bold uppercase tracking-tight transition-all duration-500 group-hover:-translate-y-0.5 group-hover:text-ink sm:text-4xl">
                  {c.title}
                </span>
                <span className="max-w-xl text-sm font-light leading-relaxed text-mist transition-colors duration-500 group-hover:text-ink/80">
                  {c.text}
                </span>
              </span>
            </div>
            <span
              className="relative z-10 hidden justify-self-end text-2xl text-paper transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-2 group-hover:text-ink sm:block sm:mr-6"
              aria-hidden="true"
            >
              →
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}