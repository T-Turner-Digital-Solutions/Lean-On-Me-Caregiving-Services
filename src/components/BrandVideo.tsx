import { useState } from 'react'
import { HeartHands } from './Icons'

interface BrandVideoProps {
  /** e.g. "/videos/lean-on-me-story.mp4" */
  src: string
  /** poster image shown while loading, e.g. "/images/lean-on-me-hero.jpg" */
  poster?: string
  /** short line shown on the branded placeholder before the video is uploaded */
  caption?: string
  className?: string
  ariaLabel?: string
}

/**
 * Plays a muted, looping, autoplay video. If the video file is missing or fails
 * to load (e.g. before the owner has uploaded it), it gracefully shows an
 * ELEGANT BRANDED PLACEHOLDER instead of an empty gray box — so the section
 * never looks broken. Once the real .mp4 is added at `src`, it plays normally.
 */
export default function BrandVideo({
  src,
  poster,
  caption = 'Caregiving video coming soon',
  className = 'aspect-[4/3]',
  ariaLabel = 'Lean On Me caregiving video',
}: BrandVideoProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative w-full overflow-hidden rounded-4xl ${className}`}>
      {/* Branded placeholder — always rendered behind the video */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-teal-gradient px-8 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-gold-light ring-1 ring-white/20">
          <HeartHands className="h-8 w-8" />
        </span>
        <p className="max-w-xs font-serif text-xl text-white/90">{caption}</p>
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/70">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          Video
        </span>
      </div>

      {/* The video sits on top; when it loads it covers the placeholder. */}
      {!failed && (
        <video
          className="absolute inset-0 h-full w-full bg-transparent object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={poster}
          aria-label={ariaLabel}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" onError={() => setFailed(true)} />
        </video>
      )}

      {/* Soft depth gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-dark/25 to-transparent" />
    </div>
  )
}
