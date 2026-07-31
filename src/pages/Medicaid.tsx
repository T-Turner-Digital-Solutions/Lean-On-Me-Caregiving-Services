import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'
import { Pill, Check } from '../components/Icons'

const POINTS = [
  'We accept Medicaid patients who need assistance in their homes.',
  'We can help you understand the process and get started with a care request.',
  'Our team communicates clearly and respectfully every step of the way.',
]

const DEPENDS_ON = [
  'Your individual Medicaid plan',
  'An assessment of care needs',
  'Program requirements',
  'Final authorization',
]

export default function Medicaid() {
  return (
    <>
      <Seo
        title="Medicaid Assistance"
        description="Lean On Me Caregiving Services accepts Medicaid patients who need assistance in their homes. Eligibility depends on your plan, assessment, program requirements, and authorization."
        path="/medicaid-assistance"
      />
      <PageHero
        eyebrow="Medicaid Assistance"
        title="Support for Medicaid patients who need help at home"
        subtitle="Lean On Me Caregiving Services accepts Medicaid patients who need assistance in their homes. We’ll help you understand the process and take the first step."
      >
        <Link to="/sign-up" className="btn-primary">
          Check Care Eligibility
        </Link>
      </PageHero>

      <section className="section bg-cream">
        <div className="container-lux grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-teal-gradient text-gold-light">
                <Pill className="h-7 w-7" />
              </span>
              <h2 className="mt-5 font-serif text-3xl font-semibold text-navy">
                How Medicaid-supported care works with Lean On Me
              </h2>
              <ul className="mt-6 space-y-3">
                {POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-navy/75">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-teal" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="rounded-4xl bg-white p-8 shadow-card ring-1 ring-navy/5">
              <h3 className="font-serif text-2xl font-semibold text-navy">
                Please note: coverage is not automatic
              </h3>
              <p className="mt-3 text-navy/70">
                We do not promise Medicaid approval. Eligibility and the specific services that may be
                authorized depend on:
              </p>
              <ul className="mt-5 grid gap-3">
                {DEPENDS_ON.map((d) => (
                  <li key={d} className="flex items-center gap-3 rounded-2xl bg-cream/70 px-4 py-3 text-navy/80 ring-1 ring-navy/5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gold/15 text-gold-dark">
                      <Check className="h-4 w-4" />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/sign-up" className="btn-teal">
                  Check Care Eligibility
                </Link>
                <Link to="/faq" className="btn-ghost">
                  Read Medicaid FAQ
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        heading="Ready to explore Medicaid-supported care?"
        subheading="Start a care request and our team will follow up to help you understand next steps."
      />
    </>
  )
}
