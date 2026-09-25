import { projects } from '../data/content'
import ProjectShowcase from '../components/ProjectShowcase'

export default function Works() {
  return (
    <section id="works" className="relative px-6 py-28 sm:px-10 sm:py-40">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-mist">Selected works</p>
          <h2 className="flex items-center gap-4 font-display text-5xl font-bold uppercase tracking-tight sm:text-7xl">
            Featured
            <span className="font-serif text-3xl font-normal italic lowercase text-mist sm:text-5xl">
              projects
            </span>
          </h2>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-mist">
          (0{projects.length}) — 20XX → 20XX
        </span>
      </div>
      <div className="mt-2">
        <ProjectShowcase projects={projects} />
      </div>
    </section>
  )
}