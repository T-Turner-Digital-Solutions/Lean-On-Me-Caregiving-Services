import { Link } from 'react-router-dom'
import { BUSINESS } from '../lib/constants'
import { Phone, Mail } from './Icons'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Sign Up', to: '/sign-up' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

const serviceLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Medicaid Assistance', to: '/medicaid-assistance' },
  { label: 'Veteran Housing', to: '/veteran-elderly-housing' },
  { label: 'Elderly Housing', to: '/veteran-elderly-housing' },
]

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Use', to: '/terms-of-use' },
  { label: 'Accessibility', to: '/accessibility' },
  { label: 'Care Services Disclaimer', to: '/care-services-disclaimer' },
  { label: 'AI Assistant Disclaimer', to: '/ai-assistant-disclaimer' },
  { label: 'Admin Login', to: '/admin' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-cream/80">
      <div className="container-lux grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand + contact */}
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-gradient">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#c9a24b" strokeWidth="1.8">
                <path d="M12 20c-5-3.2-8-6.5-8-10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 3.5-3 6.8-8 10Z" />
              </svg>
            </span>
            <span className="font-serif text-xl font-semibold text-white">Lean On Me</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            Compassionate, dependable, non-medical caregiving, Medicaid-supported services, and
            housing options for seniors, veterans, and individuals.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <a href={BUSINESS.phoneHref} className="flex items-center gap-2 text-cream hover:text-gold">
              <Phone className="h-4 w-4 text-gold" /> {BUSINESS.phoneDisplay}
            </a>
            <a href={BUSINESS.emailHref} className="flex items-center gap-2 text-cream hover:text-gold">
              <Mail className="h-4 w-4 text-gold" /> {BUSINESS.email}
            </a>
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Quick links">
          <h3 className="font-serif text-lg text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-cream/70 hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label="Services">
          <h3 className="font-serif text-lg text-white">Care & Services</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {serviceLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-cream/70 hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal */}
        <nav aria-label="Legal">
          <h3 className="font-serif text-lg text-white">Legal & Info</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-cream/70 hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Emergency notice */}
      <div className="border-t border-white/10 bg-navy-dark">
        <div className="container-lux py-4 text-center text-sm text-gold-light">
          For emergencies, call <span className="font-semibold">911</span>.
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-lux flex flex-col items-center justify-between gap-2 py-5 text-xs text-cream/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <p>Website managed by {BUSINESS.managedBy}</p>
        </div>
      </div>
    </footer>
  )
}
