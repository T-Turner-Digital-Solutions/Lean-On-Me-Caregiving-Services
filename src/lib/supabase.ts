import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Frontend Supabase client. Uses ONLY the public anon key, which is safe to
// expose because access is constrained by Row Level Security (RLS).
// The service-role key must NEVER be used here — it lives only in serverless
// functions (see netlify/functions).

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim()
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim()

// A single shared client. If env vars are missing (e.g. local preview without
// configuration), we surface a clear error rather than failing cryptically.
let client: SupabaseClient | null = null

// Validate that the Supabase URL is a real http(s) URL. A malformed value
// (missing https://, a placeholder, extra whitespace) would otherwise make
// createClient() throw synchronously and crash the admin page.
function isValidHttpUrl(value?: string): boolean {
  if (!value) return false
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export function isSupabaseConfigured(): boolean {
  return Boolean(anonKey) && isValidHttpUrl(url)
}

export function getSupabase(): SupabaseClient {
  if (client) return client
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase is not configured correctly. Set VITE_SUPABASE_ANON_KEY and make sure ' +
        'VITE_SUPABASE_URL is a full https:// project URL (e.g. https://xxxx.supabase.co).'
    )
  }
  try {
    client = createClient(url as string, anonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  } catch (e) {
    throw new Error('Failed to initialize Supabase: ' + (e as Error).message)
  }
  return client
}

// Care-request status values (kept in sync with the database CHECK constraint).
export const STATUS_OPTIONS = [
  'New',
  'Contacted',
  'Assessment Scheduled',
  'Pending Documents',
  'Medicaid Review',
  'Housing Waitlist',
  'Approved',
  'Active',
  'Closed',
  'Not Eligible',
] as const

export type CareStatus = (typeof STATUS_OPTIONS)[number]

export interface CareRequest {
  id: string
  inquiry_number: string
  first_name: string
  last_name: string
  date_of_birth: string | null
  phone: string
  email: string
  address: string | null
  city: string | null
  state: string | null
  zip_code: string | null
  relationship: string | null
  service_types: string[] | null
  preferred_contact_method: string | null
  best_contact_time: string | null
  requested_start_date: string | null
  message: string | null
  emergency_level: string | null
  status: CareStatus
  admin_notes: string | null
  assisted: boolean
  assisted_at: string | null
  assisted_by: string | null
  created_at: string
  updated_at: string
}
