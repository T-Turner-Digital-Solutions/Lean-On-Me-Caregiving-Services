import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getSupabase, isSupabaseConfigured } from '../../lib/supabase'
import Seo from '../../components/Seo'
import { Lock } from '../../components/Icons'

/**
 * Secure Admin Login backed by Supabase Authentication (email + password).
 * There is NO fake frontend password. Admin users must be created in Supabase.
 */
export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const configured = isSupabaseConfigured()

  // If already signed in, go straight to the dashboard.
  useEffect(() => {
    if (!configured) return
    getSupabase()
      .auth.getSession()
      .then(({ data }) => {
        if (data.session) navigate('/admin/dashboard', { replace: true })
      })
  }, [configured, navigate])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!configured) {
      setError('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
      return
    }
    setLoading(true)
    const { error: authError } = await getSupabase().auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) {
      setError('Invalid email or password. Please try again.')
      return
    }
    navigate('/admin/dashboard', { replace: true })
  }

  return (
    <>
      <Seo title="Admin Login" path="/admin" />
      <div className="flex min-h-screen items-center justify-center bg-navy-dark px-5 py-16">
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-teal/30 blur-3xl" />
          <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        </div>

        <div className="relative w-full max-w-md">
          <div className="mb-6 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-cream/70 hover:text-white">
              ← Back to website
            </Link>
          </div>
          <div className="rounded-4xl bg-white p-8 shadow-card sm:p-10">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-teal-gradient text-white">
              <Lock className="h-6 w-6" />
            </span>
            <h1 className="mt-5 text-center font-serif text-3xl font-semibold text-navy">Admin Login</h1>
            <p className="mt-2 text-center text-sm text-navy/50">
              Authorized administrators only.
            </p>

            {!configured && (
              <p className="mt-5 rounded-xl bg-gold/10 px-4 py-3 text-center text-xs text-gold-dark">
                Supabase environment variables are not set yet. Configure them to enable login.
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy outline-none focus:border-teal"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy outline-none focus:border-teal"
                />
              </div>

              {error && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading} className="btn-teal w-full disabled:opacity-60">
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
