import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BUSINESS, NAV_ITEMS } from '../lib/constants'
import { Phone, Menu, Close, Lock } from './Icons'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on route change.
  useEffect(() => setOpen(false), [location.pathname])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/95 shadow-soft backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-lux flex items-center justify-between gap-4 py-3">
          {/* Brand */}
          <Link to="/" className="group flex items-center gap-3" aria-label="Lean On Me home">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-gradient text-white shadow-soft">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#c9a24b" strokeWidth="1.8">
                <path d="M12 20c-5-3.2-8-6.5-8-10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 3.5-3 6.8-8 10Z" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className={`block font-serif text-lg font-semibold ${scrolled ? 'text-navy' : 'text-white'}`}>
                Lean On Me
              </span>
              <span className={`block text-[10px] uppercase tracking-[0.22em] ${scrolled ? 'text-teal' : 'text-cream/80'}`}>
                Caregiving Services
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 xl:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                      scrolled ? 'text-navy/80 hover:text-teal' : 'text-cream/90 hover:text-white'
                    } ${isActive ? (scrolled ? '!text-teal' : '!text-white') : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/admin"
                className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  scrolled ? 'text-navy/60 hover:text-teal' : 'text-cream/80 hover:text-white'
                }`}
              >
                <Lock className="h-4 w-4" /> Admin
              </NavLink>
            </li>
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            <a href={BUSINESS.phoneHref} className={`flex items-center gap-2 text-sm font-semibold ${scrolled ? 'text-teal' : 'text-white'}`}>
              <Phone className="h-4 w-4" /> {BUSINESS.phoneDisplay}
            </a>
            <Link to="/sign-up" className="btn-primary">
              Request Care
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={`grid h-11 w-11 place-items-center rounded-xl xl:hidden ${
              scrolled ? 'bg-white text-navy shadow-soft' : 'bg-white/15 text-white'
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 xl:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-navy-dark/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto bg-cream px-6 pb-8 pt-24 shadow-card transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-base font-medium text-navy hover:bg-white ${
                      isActive ? 'bg-white text-teal shadow-soft' : ''
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/admin" className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium text-navy/70 hover:bg-white">
                <Lock className="h-4 w-4" /> Admin Login
              </NavLink>
            </li>
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <Link to="/sign-up" className="btn-primary w-full">
              Request Care
            </Link>
            <a href={BUSINESS.phoneHref} className="btn-teal w-full">
              <Phone className="h-4 w-4" /> Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Mobile sticky call button */}
      <a
        href={BUSINESS.phoneHref}
        className="fixed inset-x-4 bottom-4 z-30 flex items-center justify-center gap-2 rounded-full bg-teal-gradient py-3.5 text-sm font-semibold text-white shadow-card lg:hidden"
      >
        <Phone className="h-4 w-4" /> Call {BUSINESS.phoneDisplay}
      </a>
    </>
  )
}
