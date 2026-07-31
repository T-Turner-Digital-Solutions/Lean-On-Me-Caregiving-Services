// Lightweight inline SVG icons — no external icon dependency.
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
})

export const HeartHands = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 20c-5-3.2-8-6.5-8-10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 3.5-3 6.8-8 10Z" />
  </svg>
)
export const UserCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 12l2 2 3.5-3.5" />
  </svg>
)
export const Chat = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 5h16v11H8l-4 3z" />
  </svg>
)
export const Shield = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l7 3v5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)
export const Pill = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="9" width="18" height="6" rx="3" />
    <path d="M12 9v6" />
  </svg>
)
export const Home = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 11l8-6 8 6" />
    <path d="M6 10v9h12v-9" />
  </svg>
)
export const Family = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="7" cy="7" r="2.5" />
    <circle cx="17" cy="7" r="2.5" />
    <path d="M2.5 19a4.5 4.5 0 0 1 9 0M12.5 19a4.5 4.5 0 0 1 9 0" />
  </svg>
)
export const Phone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 3h3l1.5 5-2 1.5a12 12 0 0 0 5 5l1.5-2 5 1.5V22a1 1 0 0 1-1 1A18 18 0 0 1 4 5a1 1 0 0 1 1-2z" />
  </svg>
)
export const Mail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)
export const Meal = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11M17 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9" />
  </svg>
)
export const Broom = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14 4l6 6M13 5l3.5 3.5M4 20l7-7M5 21l-1-1c-1-1 0-3 1-4l6 6c-1 1-3 2-4 1z" />
  </svg>
)
export const Car = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 13l1.5-4A2 2 0 0 1 7.4 8h9.2a2 2 0 0 1 1.9 1l1.5 4" />
    <path d="M3 13h18v4H3zM6 17v2M18 17v2" />
  </svg>
)
export const Walk = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="13" cy="4.5" r="1.6" />
    <path d="M13 7l-2 4 3 2 1 6M11 11l-3 1M14 13l3 1" />
  </svg>
)
export const Clock = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5l3 2" />
  </svg>
)
export const Medal = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="14" r="5" />
    <path d="M9 9L7 3M15 9l2-6M12 12v3M10.5 13.5h3" />
  </svg>
)
export const Sparkle = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
  </svg>
)
export const Check = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12l4.5 4.5L19 7" />
  </svg>
)
export const ArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
export const Menu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)
export const Close = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
export const ChevronDown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)
export const Lock = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
)
export const Send = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12l16-7-7 16-2-6-7-3z" />
  </svg>
)
export const Star = (p: IconProps) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M12 3l2.6 5.6 6.1.7-4.5 4.1 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7z" />
  </svg>
)
