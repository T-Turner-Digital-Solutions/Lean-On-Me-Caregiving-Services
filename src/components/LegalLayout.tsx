import type { ReactNode } from 'react'
import Seo from './Seo'
import PageHero from './PageHero'

interface LegalLayoutProps {
  title: string
  path: string
  updated?: string
  children: ReactNode
}

// Shared, readable layout for legal/policy pages.
export default function LegalLayout({ title, path, updated, children }: LegalLayoutProps) {
  return (
    <>
      <Seo title={title} path={path} />
      <PageHero eyebrow="Legal & Policies" title={title} />
      <section className="section bg-cream">
        <div className="container-lux max-w-3xl">
          <article className="prose-lux space-y-6 rounded-4xl bg-white p-8 shadow-soft ring-1 ring-navy/5 sm:p-10">
            {updated && <p className="text-sm text-navy/45">Last updated: {updated}</p>}
            {children}
          </article>
        </div>
      </section>
    </>
  )
}

// Small typographic helpers so legal pages read consistently.
export function H2({ children }: { children: ReactNode }) {
  return <h2 className="font-serif text-2xl font-semibold text-navy">{children}</h2>
}
export function P({ children }: { children: ReactNode }) {
  return <p className="leading-relaxed text-navy/70">{children}</p>
}
export function UL({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-1 pl-6 text-navy/70">{children}</ul>
}
