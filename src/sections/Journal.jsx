import { education, certifications, activities, currentFocus } from '../data/content'
import { Kicker } from '../components/primitives'
import { RevealGroup, MaskParagraph } from '../components/reveal'
import SectionHeader from '../components/SectionHeader'

export default function Journal() {
  return (
    <section id="journal" className="px-6 py-28 sm:px-10 sm:py-40">
      <SectionHeader index="05" label="Foundations" title="Education" />

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <div>
          {education.map((e) => (
            <div key={e.degree} className="group border-t border-line py-6">
              <RevealGroup>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                    {e.degree}
                  </h3>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">{e.period}</span>
                </div>
                <p className="mt-1 text-sm text-mist">
                  {e.school} · {e.place} <span className="text-paper">— {e.note}</span>
                </p>
              </RevealGroup>
            </div>
          ))}

          <div className="mt-6 border-t border-line pt-6">
            {activities.map((a) => (
              <div key={a.title} className="flex items-baseline justify-between gap-4 py-2">
                <span className="text-sm text-paper">{a.title}</span>
                <span className="text-right font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
                  {a.role} · {a.place}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-mist">Certifications ({certifications.length})</p>
          <RevealGroup className="flex flex-col gap-px border border-line bg-line">
            {certifications.map((c) => (
              <div
                key={c.title}
                data-cursor="Certified"
                className="group flex items-center justify-between gap-4 bg-ink px-5 py-4 transition-colors duration-300 hover:bg-accent"
              >
                <div>
                  <div className="text-sm font-medium text-paper transition-colors duration-300 group-hover:text-ink">{c.title}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist transition-colors duration-300 group-hover:text-ink/70">
                    {c.issuer}
                  </div>
                </div>
                <span className="shrink-0 font-mono text-[10px] tracking-[0.2em] text-mist transition-colors duration-300 group-hover:text-ink/70">
                  {c.date}
                </span>
              </div>
            ))}
          </RevealGroup>
        </div>
      </div>

      <div className="mt-28 border-t border-line pt-14">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Kicker>Now</Kicker>
          </div>
          <div className="lg:col-span-9">
            <MaskParagraph
              lines={currentFocus.statement}
              as="h3"
              className="font-serif text-3xl italic leading-[1.25] text-paper sm:text-4xl md:text-5xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}