import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface PageHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  children?: ReactNode
}

// Consistent luxury header used across interior pages.
export default function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-dark pb-16 pt-32 sm:pt-36">
      {/* Decorative gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-teal/30 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      </div>
      <div className="container-lux relative">
        <Reveal>
          {eyebrow && <p className="eyebrow text-gold-light">{eyebrow}</p>}
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {title}
          </h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/70">{subtitle}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
      </div>
    </section>
  )
}
