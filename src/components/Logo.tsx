import { useState } from 'react'

interface LogoProps {
  className?: string
}

/**
 * Pure SVG glyph — the teal→gold heart cradling a gold figure.
 * Used as the built-in mark and as the fallback when no uploaded artwork exists.
 */
export function LogoGlyph({ className = 'h-11 w-11' }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Lean On Me logo">
      <defs>
        <linearGradient id="lom-heart" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#0a4d4d" />
          <stop offset="0.55" stopColor="#0f6b6b" />
          <stop offset="1" stopColor="#d9b968" />
        </linearGradient>
      </defs>
      <path
        d="M32 55C11 41 6 23 18 14.5c8-5.7 14 2 14 6 0-4 6-11.7 14-6C58 23 53 41 32 55Z"
        fill="none"
        stroke="url(#lom-heart)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <circle cx="31.5" cy="25.5" r="4.3" fill="#c9a24b" />
      <path d="M25.5 45c1-11 4.5-14 8.5-13.5 6 .8 6.5 8 3 13.5Z" fill="#c9a24b" />
      <path d="M37 45c6.5-4 7.5-11 4-15.5-1 6-3.5 11-7 15.5Z" fill="#0f6b6b" />
    </svg>
  )
}

/**
 * Logo mark for the header/footer. Uses the owner's uploaded artwork at
 * /public/images/lean-on-me-logo.png when present; otherwise the SVG glyph.
 */
export default function LogoMark({ className = 'h-11 w-11' }: LogoProps) {
  const [useSvg, setUseSvg] = useState(false)
  if (useSvg) return <LogoGlyph className={className} />
  return (
    <img
      src="/images/lean-on-me-logo.png"
      alt="Lean On Me Caregiving Services logo"
      className={`${className} object-contain`}
      onError={() => setUseSvg(true)}
    />
  )
}
