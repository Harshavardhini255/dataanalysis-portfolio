import { Magnetic } from './primitives'

export default function MagneticButton({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  cursor = 'Open',
  external = false,
}) {
  const inner = (
    <span
      data-cursor={cursor}
      data-cursor-scale="2"
      className={`group relative inline-flex items-center gap-3 overflow-hidden border px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors duration-500 ${
        variant === 'primary'
          ? 'border-paper bg-paper text-ink'
          : 'border-line text-paper hover:text-ink hover:border-paper'
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-center scale-0 rounded-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[2.4]"
      />
      <span className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-0.5">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
      >
        →
      </span>
    </span>
  )

  if (href) {
    return (
      <Magnetic strength={0.3} className="w-fit">
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
        >
          {inner}
        </a>
      </Magnetic>
    )
  }

  return (
    <Magnetic strength={0.3} className="w-fit">
      <button type="button" onClick={onClick}>
        {inner}
      </button>
    </Magnetic>
  )
}