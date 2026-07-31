import type { Handler } from '@netlify/functions'
import { BRAND, json, sendEmail, tplGeneralContact } from './_shared'

// Handles the public Contact page form. Sends a notification email to the
// business. Does not store to the database (contact messages are transient).
export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' })

  let body: Record<string, unknown>
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { error: 'Invalid request body' })
  }

  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const phone = String(body.phone || '').trim()
  const message = String(body.message || '').trim()

  if (!name || !email || !message) {
    return json(400, { error: 'Please provide your name, email, and a message.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { error: 'Please provide a valid email address.' })
  }

  const adminTo = process.env.ADMIN_NOTIFICATION_EMAIL || BRAND.email
  const result = await sendEmail({
    to: adminTo,
    subject: `New Contact Message — ${name}`,
    html: tplGeneralContact({ name, email, phone, message }),
  })

  if ('error' in result) {
    return json(500, { error: 'We could not send your message. Please call ' + BRAND.phone + '.' })
  }
  // If email isn't configured yet (skipped), still return success so the UX is graceful.
  return json(200, { ok: true })
}
