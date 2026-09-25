import { skillGroups, interests } from '../data/content'
import { Marquee } from '../components/primitives'
import { RevealGroup } from '../components/reveal'
import SectionHeader from '../components/SectionHeader'

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-28 sm:px-10 sm:py-40">
      <SectionHeader index="03" label="Toolbox" title="Skills & Stack" />

      <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.label} className="border-t border-line pt-6">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper">{group.label}</h3>
              <span className="font-mono text-[10px] tracking-[0.2em] text-mist">({group.skills.length})</span>
            </div>
            <RevealGroup className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((s) => (
                <span
                  key={s}
                  data-cursor="Skill"
                  data-cursor-scale="2.2"
                  className="rounded-full border border-line px-4 py-2 text-xs font-light tracking-wide text-paper transition-all duration-300 hover:border-accent hover:bg-accent hover:text-ink"
                >
                  {s}
                </span>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>

      <div className="mt-24">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-mist">Areas of interest</p>
        <Marquee items={interests} duration={38} className="border-y border-line py-5 font-display text-2xl font-bold uppercase tracking-tight sm:text-4xl" />
      </div>
    </section>
  )
}