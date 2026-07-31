import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Frontend Supabase client. Uses ONLY the public anon key, which is safe to
// expose because access is constrained by Row Level Security (RLS).
// The service-role key must NEVER be used here — it lives only in serverless
// functions (see netlify/functions).

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// A single shared client. If env vars are missing (e.g. local preview without
// configuration), we surface a clear error rather than failing cryptically.
let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (client) return client
  if (!url || !anonKey) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    )
  }
  client = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
  return client
}

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey)
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
