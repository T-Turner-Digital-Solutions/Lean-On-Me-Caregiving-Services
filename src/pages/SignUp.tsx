import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import { BUSINESS } from '../lib/constants'
import { Check, ArrowRight, Phone } from '../components/Icons'

const RELATIONSHIPS = ['Self', 'Parent', 'Grandparent', 'Spouse', 'Veteran', 'Other family member', 'Other']

const CARE_NEEDS = [
  'In-home care',
  'Medicaid-supported care',
  'Veteran assistance',
  'Elderly housing',
  'Veteran housing',
  'Companionship',
  'Personal care assistance',
  'Meal preparation',
  'Light housekeeping',
  'Mobility assistance',
  'Transportation assistance',
  'Respite care',
  'Other',
]

const CONTACT_METHODS = ['Phone', 'Email', 'Text message']
const CONTACT_TIMES = ['Morning', 'Afternoon', 'Evening', 'Anytime']
const EMERGENCY_LEVELS = ['Low — planning ahead', 'Medium — needed soon', 'High — needed as soon as possible']

const STEPS = ['Applicant', 'Care Details', 'Preferences', 'Review']

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface FormState {
  first_name: string
  last_name: string
  date_of_birth: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  zip_code: string
  relationship: string
  service_types: string[]
  preferred_contact_method: string
  best_contact_time: string
  requested_start_date: string
  message: string
  emergency_level: string
}

const initial: FormState = {
  first_name: '',
  last_name: '',
  date_of_birth: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zip_code: '',
  relationship: '',
  service_types: [],
  preferred_contact_method: '',
  best_contact_time: '',
  requested_start_date: '',
  message: '',
  emergency_level: '',
}

export default function SignUp() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(initial)
  const [consent, setConsent] = useState({ contact: false, noGuarantee: false, accurate: false })
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [inquiryNumber, setInquiryNumber] = useState('')

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const toggleService = (service: string) =>
    setForm((f) => ({
      ...f,
      service_types: f.service_types.includes(service)
        ? f.service_types.filter((s) => s !== service)
        : [...f.service_types, service],
    }))

  const canContinue = () => {
    if (step === 0) return form.first_name && form.last_name && form.phone && form.email
    if (step === 1) return form.relationship && form.service_types.length > 0
    return true
  }

  const allConsent = consent.contact && consent.noGuarantee && consent.accurate

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!allConsent) return
    setStatus('submitting')
    setError('')
    try {
      const res = await fetch('/api/submit-care-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const payload = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(payload?.error || 'Submission failed')
      setInquiryNumber(payload.inquiry_number || '')
      setStatus('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setStatus('error')
      setError(
        (err as Error).message +
          `. You can also call us at ${BUSINESS.phoneDisplay} or email ${BUSINESS.email}.`
      )
    }
  }

  if (status === 'success') {
    return (
      <>
        <Seo title="Care Request Received" path="/sign-up" />
        <PageHero eyebrow="Thank You" title="Your care request has been received" />
        <section className="section bg-cream">
          <div className="container-lux max-w-2xl">
            <div className="rounded-4xl bg-white p-10 text-center shadow-card ring-1 ring-navy/5">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal/10 text-teal">
                <Check className="h-8 w-8" />
              </span>
              <h2 className="mt-6 font-serif text-3xl font-semibold text-navy">We’re on it</h2>
              <p className="mt-3 text-navy/70">
                Thank you for trusting Lean On Me. Our team will review your request and follow up
                using your preferred contact method.
              </p>
              {inquiryNumber && (
                <div className="mx-auto mt-6 inline-flex flex-col rounded-2xl bg-cream px-8 py-5 ring-1 ring-navy/5">
                  <span className="text-xs uppercase tracking-widest text-navy/50">Your inquiry number</span>
                  <span className="mt-1 font-serif text-2xl font-semibold text-teal">{inquiryNumber}</span>
                </div>
              )}
              <p className="mt-6 text-sm text-navy/50">
                Submitting this form does not guarantee Medicaid approval, housing placement, or
                immediate service. For anything urgent, please call {BUSINESS.phoneDisplay}.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={BUSINESS.phoneHref} className="btn-teal">
                  <Phone className="h-4 w-4" /> Call {BUSINESS.phoneDisplay}
                </a>
                <Link to="/" className="btn-ghost">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Seo
        title="Sign Up — Request Care"
        description="Request compassionate care from Lean On Me. Complete our secure sign-up form and our team will follow up."
        path="/sign-up"
      />
      <PageHero
        eyebrow="Request Care"
        title="Let’s take the first step together"
        subtitle="Tell us a little about your needs and we’ll follow up. This form is for requesting care — please do not submit sensitive medical, identity, or financial information."
      />

      <section className="section bg-cream">
        <div className="container-lux max-w-3xl">
          {/* Progress */}
          <ol className="mb-10 flex items-center justify-between gap-2">
            {STEPS.map((label, i) => (
              <li key={label} className="flex flex-1 items-center gap-2">
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold transition ${
                    i < step
                      ? 'bg-teal text-white'
                      : i === step
                        ? 'bg-gold-gradient text-navy-dark'
                        : 'bg-white text-navy/40 ring-1 ring-navy/10'
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span className={`hidden text-sm font-medium sm:block ${i === step ? 'text-navy' : 'text-navy/40'}`}>
                  {label}
                </span>
                {i < STEPS.length - 1 && <span className="ml-1 hidden h-px flex-1 bg-navy/10 sm:block" />}
              </li>
            ))}
          </ol>

          <form onSubmit={handleSubmit} className="rounded-4xl bg-white p-6 shadow-card ring-1 ring-navy/5 sm:p-9">
            {/* STEP 0 — Applicant */}
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="font-serif text-2xl font-semibold text-navy">Applicant Information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="First name" value={form.first_name} onChange={(v) => set('first_name', v)} required />
                  <Input label="Last name" value={form.last_name} onChange={(v) => set('last_name', v)} required />
                  <Input label="Date of birth" type="date" value={form.date_of_birth} onChange={(v) => set('date_of_birth', v)} />
                  <Input label="Phone number" type="tel" value={form.phone} onChange={(v) => set('phone', v)} required />
                  <Input label="Email address" type="email" value={form.email} onChange={(v) => set('email', v)} required />
                  <Input label="Address" value={form.address} onChange={(v) => set('address', v)} />
                  <Input label="City" value={form.city} onChange={(v) => set('city', v)} />
                  <Input label="State" value={form.state} onChange={(v) => set('state', v)} />
                  <Input label="ZIP code" value={form.zip_code} onChange={(v) => set('zip_code', v)} />
                </div>
              </div>
            )}

            {/* STEP 1 — Care details */}
            {step === 1 && (
              <div className="space-y-7">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-navy">Who is requesting care?</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {RELATIONSHIPS.map((r) => (
                      <button
                        type="button"
                        key={r}
                        onClick={() => set('relationship', r)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                          form.relationship === r
                            ? 'bg-teal text-white shadow-soft'
                            : 'bg-cream text-navy/70 ring-1 ring-navy/10 hover:ring-teal'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-navy">Care needs</h2>
                  <p className="mt-1 text-sm text-navy/50">Select all that apply.</p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {CARE_NEEDS.map((c) => {
                      const active = form.service_types.includes(c)
                      return (
                        <button
                          type="button"
                          key={c}
                          onClick={() => toggleService(c)}
                          className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                            active
                              ? 'bg-teal/10 text-teal ring-1 ring-teal'
                              : 'bg-cream/60 text-navy/70 ring-1 ring-navy/5 hover:ring-teal/40'
                          }`}
                        >
                          <span
                            className={`grid h-5 w-5 place-items-center rounded-md ${
                              active ? 'bg-teal text-white' : 'bg-white ring-1 ring-navy/15'
                            }`}
                          >
                            {active && <Check className="h-3.5 w-3.5" />}
                          </span>
                          {c}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 — Preferences */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-semibold text-navy">Additional Information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select label="Preferred contact method" value={form.preferred_contact_method} onChange={(v) => set('preferred_contact_method', v)} options={CONTACT_METHODS} />
                  <Select label="Best time to contact" value={form.best_contact_time} onChange={(v) => set('best_contact_time', v)} options={CONTACT_TIMES} />
                  <Input label="Requested start date" type="date" value={form.requested_start_date} onChange={(v) => set('requested_start_date', v)} />
                  <Select label="Emergency level" value={form.emergency_level} onChange={(v) => set('emergency_level', v)} options={EMERGENCY_LEVELS} />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
                    General message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                    className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy outline-none focus:border-teal"
                    placeholder="Tell us anything that would help us understand your needs."
                  />
                </div>
                <div className="rounded-2xl border border-gold/30 bg-gold/5 p-4 text-xs text-navy/60">
                  For your privacy and safety, please do <strong>not</strong> include Social Security
                  numbers, Medicaid ID numbers, medical records, diagnoses, prescriptions, or
                  financial information in this form.
                </div>
              </div>
            )}

            {/* STEP 3 — Review + consent */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-semibold text-navy">Review & consent</h2>
                <dl className="grid gap-x-6 gap-y-3 rounded-2xl bg-cream/60 p-5 text-sm sm:grid-cols-2">
                  <Review label="Name" value={`${form.first_name} ${form.last_name}`} />
                  <Review label="Phone" value={form.phone} />
                  <Review label="Email" value={form.email} />
                  <Review label="Requesting for" value={form.relationship} />
                  <Review label="Care needs" value={form.service_types.join(', ')} />
                  <Review label="Preferred contact" value={form.preferred_contact_method} />
                  <Review label="Best time" value={form.best_contact_time} />
                  <Review label="Emergency level" value={form.emergency_level} />
                </dl>

                <fieldset className="space-y-3">
                  <legend className="sr-only">Required consent</legend>
                  <Consent
                    checked={consent.contact}
                    onChange={(v) => setConsent((c) => ({ ...c, contact: v }))}
                    label="I consent to being contacted by Lean On Me Caregiving Services."
                  />
                  <Consent
                    checked={consent.noGuarantee}
                    onChange={(v) => setConsent((c) => ({ ...c, noGuarantee: v }))}
                    label="I understand that submitting this form does not guarantee Medicaid approval, housing placement, or immediate service."
                  />
                  <Consent
                    checked={consent.accurate}
                    onChange={(v) => setConsent((c) => ({ ...c, accurate: v }))}
                    label="I confirm that the information submitted is accurate."
                  />
                </fieldset>

                {status === 'error' && (
                  <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </p>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between gap-3 border-t border-navy/5 pt-6">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className={`btn-ghost ${step === 0 ? 'invisible' : ''}`}
              >
                Back
              </button>
              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => canContinue() && setStep((s) => s + 1)}
                  disabled={!canContinue()}
                  className="btn-teal disabled:opacity-50"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button type="submit" disabled={!allConsent || status === 'submitting'} className="btn-primary disabled:opacity-50">
                  {status === 'submitting' ? 'Submitting…' : 'Submit Care Request'}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

/* ---------- small field helpers ---------- */

function Input({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}) {
  const id = label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required && <span className="text-gold-dark"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy outline-none focus:border-teal"
      />
    </div>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  const id = label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy outline-none focus:border-teal"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

function Review({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-navy/45">{label}</dt>
      <dd className="font-medium text-navy">{value || '—'}</dd>
    </div>
  )
}

function Consent({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-cream/60 p-4 ring-1 ring-navy/5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 shrink-0 rounded border-navy/30 text-teal focus:ring-teal"
        required
      />
      <span className="text-sm text-navy/75">{label}</span>
    </label>
  )
}
