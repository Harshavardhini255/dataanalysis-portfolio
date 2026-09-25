import { Kicker } from './primitives'
import { RevealWords } from './reveal'

export default function SectionHeader({
  index = '',
  label = '',
  title = '',
  as = 'h2',
  className = '',
}) {
  return (
    <div className={className}>
      <Kicker>{index ? `${index} — ${label}` : label}</Kicker>
      <RevealWords
        text={title}
        as={as}
        className="mt-4 font-display text-5xl font-bold uppercase tracking-tight sm:text-7xl"
      />
    </div>
  )
}