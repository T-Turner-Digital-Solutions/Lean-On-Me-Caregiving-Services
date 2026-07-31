import { useState } from 'react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CtaBand from '../components/CtaBand'
import { FAQS } from '../data/site'
import { ChevronDown } from '../components/Icons'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers to common questions about Lean On Me caregiving services, Medicaid-supported care, veteran and elderly housing, and how to request care."
        path="/faq"
      />
      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Answers to help you feel confident about care"
        subtitle="Clear, honest answers about our services, Medicaid, housing, and getting started. When details depend on availability, we’ll point you to a phone call."
      />

      <section className="section bg-cream">
        <div className="container-lux max-w-3xl">
          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = open === i
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-navy/5"
                >
                  <h3>
                    <button
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                    >
                      <span className="font-serif text-lg font-semibold text-navy">{faq.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-teal transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    className={`grid transition-all duration-300 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 leading-relaxed text-navy/70">{faq.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Still have questions?"
        subheading="Call us at 205-687-4047 and our team will be glad to help."
      />
    </>
  )
}
