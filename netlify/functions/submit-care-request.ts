import type { Handler } from '@netlify/functions'
import {
  BRAND,
  json,
  insertRow,
  makeInquiryNumber,
  sendEmail,
  tplAdminNewRequest,
  tplApplicantConfirmation,
  tplHousingInterest,
  type CareData,
} from './_shared'

// Sensitive fields we must NEVER accept/store from the public form.
const BLOCKED = ['ssn', 'social', 'medicaid_id', 'medicaid_number', 'diagnosis', 'prescription', 'bank', 'card', 'credit']

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' })

  let body: Record<string, unknown>
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { error: 'Invalid request body' })
  }

  // Basic server-side validation.
  const required = ['first_name', 'last_name', 'phone', 'email']
  for (const f of required) {
    if (!body[f] || String(body[f]).trim() === '') {
      return json(400, { error: `Missing required field: ${f}` })
    }
  }
  const email = String(body.email)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { error: 'Please provide a valid email address.' })
  }

  // Reject any blocked sensitive keys defensively.
  for (const key of Object.keys(body)) {
    if (BLOCKED.some((b) => key.toLowerCase().includes(b))) {
      return json(400, { error: 'Sensitive information is not accepted through this form.' })
    }
  }

  const inquiry_number = makeInquiryNumber()

  // Whitelist the columns we persist.
  const record = {
    inquiry_number,
    first_name: String(body.first_name).slice(0, 120),
    last_name: String(body.last_name).slice(0, 120),
    date_of_birth: body.date_of_birth || null,
    phone: String(body.phone).slice(0, 40),
    email: email.slice(0, 200),
    address: (body.address as string) || null,
    city: (body.city as string) || null,
    state: (body.state as string) || null,
    zip_code: (body.zip_code as string) || null,
    relationship: (body.relationship as string) || null,
    service_types: Array.isArray(body.service_types) ? (body.service_types as string[]).slice(0, 30) : [],
    preferred_contact_method: (body.preferred_contact_method as string) || null,
    best_contact_time: (body.best_contact_time as string) || null,
    requested_start_date: body.requested_start_date || null,
    message: (body.message as string) || null,
    emergency_level: (body.emergency_level as string) || null,
    status: 'New',
  }

  try {
    await insertRow('care_requests', record)
  } catch (e) {
    console.error(e)
    // Surface the specific reason so it's diagnosable without digging through
    // server logs (reveals which env var / DB issue, not secret values).
    const reason = (e as Error).message || 'Unknown error'
    return json(500, {
      error: `We couldn't submit your request (${reason}). Please call ${BRAND.phone}.`,
    })
  }

  // Fire off emails (best-effort — failures don't block the submission).
  const data: CareData = {
    inquiry_number,
    first_name: record.first_name,
    last_name: record.last_name,
    phone: record.phone,
    email: record.email,
    relationship: record.relationship || undefined,
    service_types: record.service_types,
    emergency_level: record.emergency_level || undefined,
    message: record.message || undefined,
  }
  const adminTo = process.env.ADMIN_NOTIFICATION_EMAIL || BRAND.email
  const wantsHousing = record.service_types.some((s) => /housing/i.test(s))

  await Promise.allSettled([
    sendEmail({ to: adminTo, subject: `New Care Request — ${inquiry_number}`, html: tplAdminNewRequest(data) }),
    sendEmail({ to: record.email, subject: 'We received your care request', html: tplApplicantConfirmation(data) }),
    ...(wantsHousing
      ? [sendEmail({ to: adminTo, subject: `Housing Interest — ${inquiry_number}`, html: tplHousingInterest(data) })]
      : []),
  ])

  return json(200, { ok: true, inquiry_number })
}
