import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { getSupabase, isSupabaseConfigured } from '../../lib/supabase'
import Loading from '../../components/Loading'

/**
 * Route guard for the admin dashboard. Verifies an active Supabase session.
 * Unauthenticated visitors are redirected to the Admin Login page. Real
 * protection comes from Supabase Auth + Row Level Security on the server — this
 * guard is the client-side gate that keeps the dashboard UI from rendering.
 */
export default function RequireAuth({ children }: { children: ReactNode }) {
  const [state, setState] = useState<'loading' | 'authed' | 'guest'>('loading')

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setState('guest')
      return
    }
    const supabase = getSupabase()
    supabase.auth.getSession().then(({ data }) => {
      setState(data.session ? 'authed' : 'guest')
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setState(session ? 'authed' : 'guest')
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  if (state === 'loading') return <Loading />
  if (state === 'guest') return <Navigate to="/admin" replace />
  return <>{children}</>
}
