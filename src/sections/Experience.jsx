import { experience } from '../data/content'
import { Kicker } from '../components/primitives'
import { RevealGroup, RevealWords } from '../components/reveal'

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-28 sm:px-10 sm:py-40">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="sticky top-28">
            <Kicker>04 — Experience</Kicker>
            <RevealWords
              text="Internships"
              className="mt-4 font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl"
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          {experience.map((job) => (
            <article key={job.company} className="group border-t border-line py-12 first:border-t-0 first:pt-0">
              <RevealGroup>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                    {job.role}
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">{job.period}</span>
                </div>

                <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                  <span className="flex items-center gap-2 text-sm font-medium text-paper">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                    {job.company}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
                    {job.place} — {job.highlight}
                  </span>
                </div>

                <ul className="mt-6 space-y-2.5 border-l border-line pl-6">
                  {job.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm font-light leading-relaxed text-mist">
                      <span className="mt-[3px] font-mono text-[10px] text-accent/70">0{i + 1}</span>
                      <span className="transition-colors duration-300 group-hover:text-paper">{b}</span>
                    </li>
                  ))}
                </ul>
              </RevealGroup>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}