import heroArt from '../assets/hero.svg'
import about2 from '../assets/about2.svg'
import { about } from '../data/content'
import { Kicker, RotatingBadge } from '../components/primitives'
import { MaskParagraph } from '../components/reveal'
import ImageReveal from '../components/ImageReveal'

const stats = [
  { value: '00', label: 'Statistic one' },
  { value: '00', label: 'Statistic two' },
  { value: '00', label: 'Statistic three' },
  { value: '00', label: 'Statistic four' },
]

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:px-10 sm:py-40">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <Kicker>01 — About</Kicker>
            <p className="max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-mist">
              Replace this line with a short version of your introduction.
            </p>
            <RotatingBadge text="Your craft • Your focus • Your tools • " className="h-32 w-32 text-mist" />
          </div>
        </div>

        <div className="lg:col-span-8">
          <MaskParagraph
            lines={about.paragraphs}
            className="font-display text-3xl font-medium leading-[1.2] tracking-tight sm:text-4xl md:text-[2.9rem]"
          />

          <div className="mt-16 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-ink p-6 sm:p-8">
                <div className="font-display text-4xl font-bold text-accent sm:text-5xl">{s.value}</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center gap-10 md:flex-row">
            <ImageReveal
              src={heroArt}
              alt="Visual placeholder"
              className="aspect-[4/5] w-full md:w-[46%]"
            />
            <RotatingBadge
              text="Your • Text • Your • Text • "
              className="order-first h-36 w-36 shrink-0 text-mist md:order-none"
            />
            <ImageReveal
              src={about2}
              alt="Visual placeholder"
              className="aspect-[4/5] w-full md:w-[46%]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}