import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { BUSINESS } from '../lib/constants'
import { Phone } from '../components/Icons'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" />
      <section className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-6 pt-24 text-center">
        <p className="font-serif text-7xl font-semibold text-teal">404</p>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-navy">Page not found</h1>
        <p className="mt-3 max-w-md text-navy/60">
          The page you’re looking for isn’t here. Let’s get you back to compassionate care.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-teal">
            Back to Home
          </Link>
          <a href={BUSINESS.phoneHref} className="btn-ghost">
            <Phone className="h-4 w-4" /> Call {BUSINESS.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  )
}
