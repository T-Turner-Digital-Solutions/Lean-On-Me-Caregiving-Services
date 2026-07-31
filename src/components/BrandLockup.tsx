import { useState } from 'react'
import { LogoGlyph } from './Logo'

/**
 * Large brand lockup used in the homepage hero's open spot.
 *
 * - If the owner uploads their full logo artwork to
 *   /public/images/lean-on-me-logo.png, it is shown on its own at a nice size
 *   (their artwork already includes the wordmark, so no duplicate text).
 * - Until then, the built-in SVG heart glyph + a matching wordmark is shown,
 *   so the brand always looks polished.
 */
export default function BrandLockup() {
  const [noImage, setNoImage] = useState(false)

  if (!noImage) {
    return (
      <img
        src="/images/lean-on-me-logo.png"
        alt="Lean On Me Caregiving Services"
        className="max-h-72 w-auto object-contain"
        onError={() => setNoImage(true)}
      />
    )
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <LogoGlyph className="h-40 w-40 sm:h-48 sm:w-48" />
      <div className="text-center">
        <p className="font-serif text-4xl font-semibold text-teal">Lean On Me</p>
        <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-gold-dark">
          Caregiving Services
        </p>
      </div>
    </div>
  )
}
