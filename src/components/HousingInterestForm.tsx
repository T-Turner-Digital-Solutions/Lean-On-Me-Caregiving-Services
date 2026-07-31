import { useState, type FormEvent } from 'react'
import { BUSINESS } from '../lib/constants'
import Reveal from './Reveal'
import { Check, Home as HomeIcon } from './Icons'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const HOUSING_TYPES = ['Veteran housing', 'Elderly housing', 'Not sure yet']

/**
 * "Join the Housing Interest List" form. Saves to the same `care_requests`
 * table via the existing serverless function (so it appears in the admin
 * dashboard and triggers the housing-interest email). Availability and
 * acceptance are never guaranteed — the copy makes that explicit.
 */
export default function HousingInterestForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [inquiry, setInquiry] = useState('')
  const [error, setError] = useState('')
  const [housingType, setHousingType] = useState('')
  const [consent, setConsent] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!consent) return
    setStatus('submitting')
    setError('')
    const form = e.currentTarget
    const fd = new FormData(form)

    const payload = {
      first_name: String(fd.get('first_name') || ''),
      last_name: String(fd.get('last_name') || ''),
      phone: String(fd.get('phone') || ''),
      email: String(fd.get('email') || ''),
      city: String(fd.get('city') || ''),
      state: String(fd.get('state') || ''),
      relationship: String(fd.get('relationship') || ''),
      // Marking a housing service triggers the housing-interest notification.
      service_types: [housingType || 'Elderly housing', 'Housing interest list'],
      message: String(fd.get('message') || ''),
      preferred_contact_method: String(fd.get('preferred_contact_method') || ''),
      emergency_level: 'Low — planning ahead',
    }

    try {
      const res = await fetch('/api/submit-care-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Submission failed')
      setInquiry(data.inquiry_number || '')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(
        (err as Error).message +
          `. You can also call ${BUSINESS.phoneDisplay} or email ${BUSINESS.email}.`
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-4xl bg-white p-8 text-center shadow-card ring-1 ring-navy/5 sm:p-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal/10 text-teal">
          <Check className="h-8 w-8" />
        </span>
        <h3 className="mt-5 font-serif text-2xl font-semibold text-navy">You’re on the interest list</h3>
        <p className="mt-2 text-navy/70">
          Thank you for your interest in Lean On Me housing. Our team will follow up with current
          information. Joining the list does not guarantee availability, acceptance, or placement.
        </p>
        {inquiry && (
          <p className="mt-4 inline-block rounded-2xl bg-cream px-6 py-3 text-sm ring-1 ring-navy/5">
            Reference #: <span className="font-semibold text-teal">{inquiry}</span>
          </p>
        )}
      </div>
    )
  }

  return (
    <Reveal>
      <form
        onSubmit={handleSubmit}
        className="rounded-4xl bg-white p-8 shadow-card ring-1 ring-navy/5 sm:p-10"
        noValidate
      >
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-gradient text-gold-light">
            <HomeIcon className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-navy">Join the Housing Interest List</h3>
            <p className="text-sm text-navy/55">Tell us a little and we’ll follow up with current information.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field name="first_name" label="First name" required />
          <Field name="last_name" label="Last name" required />
          <Field name="phone" label="Phone" type="tel" required />
          <Field name="email" label="Email" type="email" required />
          <Field name="city" label="City" />
          <Field name="state" label="State" />
        </div>

        <div className="mt-4">
          <span className="mb-1.5 block text-sm font-medium text-navy">Which housing are you interested in?</span>
          <div className="flex flex-wrap gap-2">
            {HOUSING_TYPES.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setHousingType(t)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  housingType === t
                    ? 'bg-teal text-white shadow-soft'
                    : 'bg-cream text-navy/70 ring-1 ring-navy/10 hover:ring-teal'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="relationship" className="mb-1.5 block text-sm font-medium text-navy">
              Who is this for?
            </label>
            <select
              id="relationship"
              name="relationship"
              className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy outline-none focus:border-teal"
            >
              <option value="">Select…</option>
              {['Self', 'Parent', 'Grandparent', 'Spouse', 'Veteran', 'Other family member', 'Other'].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="preferred_contact_method" className="mb-1.5 block text-sm font-medium text-navy">
              Preferred contact method
            </label>
            <select
              id="preferred_contact_method"
              name="preferred_contact_method"
              className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy outline-none focus:border-teal"
            >
              <option value="">Select…</option>
              {['Phone', 'Email', 'Text message'].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
            Anything you’d like us to know?
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy outline-none focus:border-teal"
          />
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl bg-cream/60 p-4 ring-1 ring-navy/5">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-navy/30 text-teal focus:ring-teal"
          />
          <span className="text-sm text-navy/75">
            I consent to being contacted by Lean On Me Caregiving Services, and I understand that
            joining the interest list does not guarantee availability, acceptance, or placement.
          </span>
        </label>

        <p className="mt-3 text-xs text-navy/50">
          Please do not include Social Security numbers, Medicaid ID numbers, medical records, or
          financial information.
        </p>

        {status === 'error' && (
          <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button type="submit" disabled={!consent || status === 'submitting'} className="btn-teal mt-5 w-full disabled:opacity-50">
          {status === 'submitting' ? 'Submitting…' : 'Join the Interest List'}
        </button>
      </form>
    </Reveal>
  )
}

function Field({
  name,
  label,
  type = 'text',
  required,
}: {
  name: string
  label: string
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
