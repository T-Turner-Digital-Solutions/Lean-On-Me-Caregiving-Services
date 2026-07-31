import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { BUSINESS } from '../lib/constants'
import { Phone, Mail, Clock, Home as HomeIcon, Check } from '../components/Icons'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError('')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch('/api/general-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      form.reset()
    } catch {
      // The serverless function may not be configured in local preview.
      setStatus('error')
      setError(
        'We could not send your message right now. Please call us at ' +
          BUSINESS.phoneDisplay +
          ' or email ' +
          BUSINESS.email +
          '.'
      )
    }
  }

  return (
    <>
      <Seo
        title="Contact"
        description="Contact Lean On Me Caregiving Services by phone at 205-687-4047 or email info@leanonmecargiving.org."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact Us"
        title="We’re here to help you find the right care"
        subtitle="Reach out by phone, email, or the form below. For care requests, you can also complete our sign-up form."
      >
        <a href={BUSINESS.phoneHref} className="btn-primary">
          <Phone className="h-4 w-4" /> Call {BUSINESS.phoneDisplay}
        </a>
        <Link to="/sign-up" className="btn-outline">
          Request Care
        </Link>
      </PageHero>

      <section className="section bg-cream">
        <div className="container-lux grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          {/* Info column */}
          <Reveal>
            <div className="space-y-4">
              <a href={BUSINESS.phoneHref} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-navy/5 hover:shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-gradient text-white">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-navy/50">Phone</span>
                  <span className="font-semibold text-navy">{BUSINESS.phoneDisplay}</span>
                </span>
              </a>
              <a href={BUSINESS.emailHref} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-navy/5 hover:shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-gradient text-white">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-navy/50">Email</span>
                  <span className="font-semibold text-navy">{BUSINESS.email}</span>
                </span>
              </a>
              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-navy/5">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-gradient text-white">
                  <Clock className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-navy/50">Business Hours</span>
                  {/* Placeholder — hours not yet provided by the business owner. */}
                  <span className="font-semibold text-navy">Please call for current hours</span>
                </span>
              </div>

              {/* Map placeholder — no physical address invented. */}
              <div className="flex h-56 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-navy/20 bg-white/60 text-center text-navy/50">
                <HomeIcon className="h-8 w-8" />
                <p className="px-6 text-sm">
                  Map placeholder — location details will be added when provided by the business
                  owner.
                </p>
              </div>

              {/* Emergency notice */}
              <div className="rounded-2xl border border-gold/30 bg-gold/5 p-5 text-sm text-navy/70">
                <p className="font-semibold text-gold-dark">Emergency notice</p>
                <p className="mt-1">
                  Lean On Me Caregiving Services is not an emergency-response service. Call{' '}
                  <span className="font-semibold">911</span> for an immediate medical or safety
                  emergency.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Form column */}
          <Reveal delay={1}>
            <div className="rounded-4xl bg-white p-8 shadow-card ring-1 ring-navy/5">
              {status === 'success' ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-teal/10 text-teal">
                    <Check className="h-8 w-8" />
                  </span>
                  <h2 className="mt-5 font-serif text-2xl font-semibold text-navy">Message sent</h2>
                  <p className="mt-2 max-w-md text-navy/60">
                    Thank you for reaching out. Our team will follow up with you soon. For anything
                    urgent, please call {BUSINESS.phoneDisplay}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <h2 className="font-serif text-2xl font-semibold text-navy">Send us a message</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" name="name" required />
                    <Field label="Phone" name="phone" type="tel" />
                  </div>
                  <Field label="Email" name="email" type="email" required />
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
                      How can we help?<span className="text-gold-dark"> *</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy outline-none focus:border-teal"
                    />
                  </div>
                  <p className="text-xs text-navy/50">
                    Please do not include Social Security numbers, Medicaid ID numbers, medical
                    records, or financial information in this form.
                  </p>
                  {status === 'error' && (
                    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </p>
                  )}
                  <button type="submit" disabled={status === 'submitting'} className="btn-teal w-full disabled:opacity-60">
                    {status === 'submitting' ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required && <span className="text-gold-dark"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy outline-none focus:border-teal"
      />
    </div>
  )
}
