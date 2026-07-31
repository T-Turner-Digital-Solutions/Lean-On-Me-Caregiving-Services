// Shared helpers for Netlify Functions: Supabase (service role), Resend email,
// and professional email templates.
//
// SECURITY: everything here runs server-side only. The SUPABASE_SERVICE_ROLE_KEY
// and RESEND_API_KEY are read from environment variables and NEVER shipped to
// the browser.

import { createClient } from '@supabase/supabase-js'

export const BRAND = {
  name: 'Lean On Me Caregiving Services',
  phone: '205-687-4047',
  phoneHref: 'tel:2056874047',
  email: 'info@leanonmecargiving.org',
} as const

export function json(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

// Prefer the service-role client for trusted server writes; RLS is bypassed,
// so validation must happen here before inserting.
export function serviceClient() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase server env vars are not configured.')
  return createClient(url, key, { auth: { persistSession: false } })
}

// A short, human-friendly inquiry number, e.g. LOM-20260731-4821
export function makeInquiryNumber() {
  const d = new Date()
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(
    d.getDate()
  ).padStart(2, '0')}`
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `LOM-${ymd}-${rand}`
}

// Send an email via the Resend REST API (no extra dependency needed).
// Silently no-ops if RESEND_API_KEY is not set, so form submission still
// succeeds even before email is configured.
export async function sendEmail(opts: { to: string; subject: string; html: string }) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !from) {
    console.warn('Resend not configured — skipping email:', opts.subject)
    return { skipped: true }
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to: opts.to, subject: opts.subject, html: opts.html }),
  })
  if (!res.ok) {
    const text = await res.text()
    console.error('Resend error:', res.status, text)
    return { error: text }
  }
  return { ok: true }
}

/* ---------------------- email templates ---------------------- */

const shell = (title: string, inner: string) => `
<!doctype html><html><body style="margin:0;background:#f7f3ea;font-family:Inter,Arial,sans-serif;color:#13233f;">
  <div style="max-width:560px;margin:0 auto;padding:24px;">
    <div style="background:linear-gradient(135deg,#0f6b6b,#13233f);border-radius:20px;padding:28px;color:#fff;">
      <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d9b968;">${BRAND.name}</p>
      <h1 style="margin:8px 0 0;font-family:Georgia,serif;font-size:24px;">${title}</h1>
    </div>
    <div style="background:#fff;border-radius:20px;padding:28px;margin-top:16px;line-height:1.6;">
      ${inner}
    </div>
    <p style="text-align:center;color:#8a8f99;font-size:12px;margin-top:18px;">
      ${BRAND.name} · <a href="${BRAND.phoneHref}" style="color:#0f6b6b;">${BRAND.phone}</a> · ${BRAND.email}<br/>
      For emergencies, call 911. Managed by T. Turner Digital Solutions.
    </p>
  </div>
</body></html>`

export interface CareData {
  inquiry_number: string
  first_name: string
  last_name: string
  phone: string
  email: string
  relationship?: string
  service_types?: string[]
  emergency_level?: string
  message?: string
}

// 1) New care-request notification (to admin)
export function tplAdminNewRequest(d: CareData) {
  return shell(
    'New Care Request',
    `<p><strong>Inquiry #:</strong> ${d.inquiry_number}</p>
     <p><strong>Name:</strong> ${d.first_name} ${d.last_name}</p>
     <p><strong>Phone:</strong> ${d.phone}<br/><strong>Email:</strong> ${d.email}</p>
     <p><strong>Requesting for:</strong> ${d.relationship || '—'}</p>
     <p><strong>Care needs:</strong> ${(d.service_types || []).join(', ') || '—'}</p>
     <p><strong>Emergency level:</strong> ${d.emergency_level || '—'}</p>
     <p><strong>Message:</strong><br/>${(d.message || '—').replace(/\n/g, '<br/>')}</p>
     <p style="margin-top:20px;color:#6f7580;font-size:13px;">Log in to the admin dashboard to review and respond.</p>`
  )
}

// 2) Applicant confirmation
export function tplApplicantConfirmation(d: CareData) {
  return shell(
    'We received your care request',
    `<p>Dear ${d.first_name},</p>
     <p>Thank you for reaching out to ${BRAND.name}. We have received your request and our team will follow up with you soon.</p>
     <p><strong>Your inquiry number:</strong> ${d.inquiry_number}</p>
     <p>Please note that submitting this form does not guarantee Medicaid approval, housing placement, or immediate service. For anything urgent, please call <a href="${BRAND.phoneHref}" style="color:#0f6b6b;">${BRAND.phone}</a>.</p>
     <p style="color:#6f7580;font-size:13px;">For your privacy, please do not reply with Social Security numbers, Medicaid ID numbers, medical records, or financial information.</p>
     <p>Warm regards,<br/>The ${BRAND.name} Team</p>`
  )
}

// 3) Housing-interest submission (to admin)
export function tplHousingInterest(d: CareData) {
  return shell(
    'Housing Interest Submission',
    `<p>A visitor expressed interest in veteran/elderly housing.</p>
     <p><strong>Inquiry #:</strong> ${d.inquiry_number}</p>
     <p><strong>Name:</strong> ${d.first_name} ${d.last_name}</p>
     <p><strong>Phone:</strong> ${d.phone}<br/><strong>Email:</strong> ${d.email}</p>
     <p><strong>Interest:</strong> ${(d.service_types || []).join(', ') || '—'}</p>`
  )
}

// 4) General contact submission (to admin)
export function tplGeneralContact(d: { name: string; email: string; phone?: string; message: string }) {
  return shell(
    'New Contact Message',
    `<p><strong>Name:</strong> ${d.name}</p>
     <p><strong>Email:</strong> ${d.email}<br/><strong>Phone:</strong> ${d.phone || '—'}</p>
     <p><strong>Message:</strong><br/>${d.message.replace(/\n/g, '<br/>')}</p>`
  )
}
