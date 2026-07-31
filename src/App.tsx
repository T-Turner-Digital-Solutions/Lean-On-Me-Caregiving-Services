import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Loading from './components/Loading'
import ErrorBoundary from './components/ErrorBoundary'

// Lazy-load pages so each route ships only what it needs.
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Medicaid = lazy(() => import('./pages/Medicaid'))
const Housing = lazy(() => import('./pages/Housing'))
const FAQ = lazy(() => import('./pages/FAQ'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/legal/Privacy'))
const Terms = lazy(() => import('./pages/legal/Terms'))
const Accessibility = lazy(() => import('./pages/legal/Accessibility'))
const CareDisclaimer = lazy(() => import('./pages/legal/CareDisclaimer'))
const AIDisclaimer = lazy(() => import('./pages/legal/AIDisclaimer'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Admin (protected)
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const RequireAuth = lazy(() => import('./pages/admin/RequireAuth'))

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/medicaid-assistance" element={<Medicaid />} />
            <Route path="/veteran-elderly-housing" element={<Housing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms-of-use" element={<Terms />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/care-services-disclaimer" element={<CareDisclaimer />} />
            <Route path="/ai-assistant-disclaimer" element={<AIDisclaimer />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin routes render without the public chrome */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}
