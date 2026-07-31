// Professional loading screen used as a Suspense fallback.
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 bg-cream">
      <div className="relative h-14 w-14">
        <span className="absolute inset-0 animate-ping rounded-full bg-teal/30" />
        <span className="absolute inset-2 rounded-full bg-teal-gradient" />
      </div>
      <p className="font-serif text-xl text-teal">Lean On Me</p>
      <p className="text-sm text-navy/50">Loading…</p>
    </div>
  )
}
