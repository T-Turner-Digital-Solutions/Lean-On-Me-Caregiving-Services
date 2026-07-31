// Central source of truth for business info used across the site.
// Update here to change it everywhere.

export const BUSINESS = {
  name: 'Lean On Me Caregiving Services',
  shortName: 'Lean On Me',
  phoneDisplay: '205-687-4047',
  phoneHref: 'tel:2056874047',
  email: 'info@leanonmecargiving.org',
  emailHref: 'mailto:info@leanonmecargiving.org',
  managedBy: 'T. Turner Digital Solutions',
  tagline: 'Compassionate Care You Can Lean On',
} as const

// Owner-requested mission statement (used on Home + About).
export const MISSION_STATEMENT =
  'Our mission is to provide compassionate, dependable, and personalized non-medical care that protects the dignity, independence, safety, and comfort of every person we serve — while giving families the peace of mind of knowing their loved ones are supported with respect and reliable care.'

// Owner-requested on-screen statement for the silenced hero video.
export const HERO_VIDEO_STATEMENT =
  'At Lean On Me Caregiving, we give you the services you need.'

// `short` is used in the compact desktop nav bar; `label` is the full name used
// in the mobile drawer and elsewhere.
export type NavItem = { label: string; short?: string; to: string }

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Medicaid Assistance', short: 'Medicaid', to: '/medicaid-assistance' },
  { label: 'Veteran & Elderly Housing', short: 'Housing', to: '/veteran-elderly-housing' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Sign Up', to: '/sign-up' },
  { label: 'Contact', to: '/contact' },
]
