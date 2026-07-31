import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BUSINESS, NAV_ITEMS } from '../lib/constants'
import LogoMark from './Logo'
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
        <nav className="container-lux flex flex-nowrap items-center justify-between gap-4 py-3">
          {/* Brand */}
          <Link to="/" className="group flex shrink-0 items-center gap-3" aria-label="Lean On Me home">
            <LogoMark className="h-12 w-12" />
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
          <ul className="hidden items-center gap-0.5 xl:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium tracking-tight transition-colors ${
                      isActive
                        ? scrolled
                          ? 'bg-teal/10 text-teal'
                          : 'bg-white/15 text-white'
                        : scrolled
                          ? 'text-navy/75 hover:bg-navy/5 hover:text-teal'
                          : 'text-cream/90 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  {item.short ?? item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden shrink-0 items-center gap-2.5 xl:flex">
            <NavLink
              to="/admin"
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${
                scrolled ? 'text-navy/55 hover:text-teal' : 'text-cream/75 hover:text-white'
              }`}
            >
              <Lock className="h-3.5 w-3.5" /> Admin
            </NavLink>
            <a
              href={BUSINESS.phoneHref}
              className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${
                scrolled
                  ? 'border-teal/25 text-teal hover:bg-teal hover:text-white'
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              <Phone className="h-4 w-4" /> {BUSINESS.phoneDisplay}
            </a>
            <Link to="/sign-up" className="btn-primary whitespace-nowrap">
              Request Care
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl xl:hidden ${
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
