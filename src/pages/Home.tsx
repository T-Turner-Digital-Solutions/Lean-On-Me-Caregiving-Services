import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import { BUSINESS, MISSION_STATEMENT, HERO_VIDEO_STATEMENT } from '../lib/constants'
import { SERVICES_OVERVIEW, TESTIMONIALS } from '../data/site'
import {
  HeartHands,
  UserCheck,
  Chat,
  Shield,
  Pill,
  Home as HomeIcon,
  Family,
  Phone,
  ArrowRight,
  Check,
  Star,
} from '../components/Icons'

const WHY_CHOOSE = [
  { Icon: HeartHands, title: 'Compassionate Caregivers', body: 'Warm, patient, respectful support in every visit.' },
  { Icon: UserCheck, title: 'Personalized Support', body: 'Care shaped around each person’s needs and routines.' },
  { Icon: Chat, title: 'Reliable Communication', body: 'Clear, dependable updates that keep families informed.' },
  { Icon: Shield, title: 'Safe & Respectful Service', body: 'Attentive care focused on comfort, safety, and dignity.' },
  { Icon: Pill, title: 'Medicaid Patient Assistance', body: 'Support for Medicaid patients needing help at home.' },
  { Icon: HomeIcon, title: 'Veteran & Elderly Housing', body: 'Supportive housing options for those who need limited daily assistance.' },
  { Icon: Family, title: 'Family Peace of Mind', body: 'Confidence that your loved one is cared for and safe.' },
]

export default function Home() {
  return (
    <>
      <Seo
        title="Compassionate Care You Can Lean On"
        description="Personalized in-home assistance, Medicaid-supported services, and comfortable housing options for seniors, veterans, and individuals."
        path="/"
      />

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        {/*
          HERO VIDEO — the owner will provide the completed file.
          Place the video at:   /public/videos/lean-on-me-hero.mp4
          Place the poster at:   /public/images/lean-on-me-hero.jpg
          The video is intentionally MUTED/silenced (playsInline, autoplay,
          loop) and shows an on-screen statement overlay. If the video cannot
          load, the poster image is shown as a fallback (onError handler).
        */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/lean-on-me-hero.jpg"
          preload="metadata"
          aria-hidden="true"
          onError={(e) => {
            // Fallback to the poster image if the video fails to load.
            const el = e.currentTarget
            el.style.display = 'none'
            const fallback = document.getElementById('hero-fallback')
            if (fallback) fallback.style.display = 'block'
          }}
        >
          <source src="/videos/lean-on-me-hero.mp4" type="video/mp4" />
        </video>

        {/* Poster fallback image (revealed only if the video fails) */}
        <img
          id="hero-fallback"
          src="/images/lean-on-me-hero.jpg"
          alt="A caregiver offering warm, supportive companionship."
          className="absolute inset-0 hidden h-full w-full object-cover"
        />

        {/* Readability gradient overlay */}
        <div className="absolute inset-0 bg-hero-overlay" />

        <div className="container-lux relative z-10 py-28">
          <Reveal>
            <p className="eyebrow text-gold-light">Compassionate • Dependable • Dignified</p>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="mt-4 max-w-3xl font-serif text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              Compassionate Care You Can Lean On
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/85 sm:text-xl">
              Personalized in-home assistance, Medicaid-supported services, and comfortable housing
              options designed to help seniors, veterans, and individuals maintain dignity, safety,
              comfort, and independence.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/sign-up" className="btn-primary">
                Request Care <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services" className="btn-outline">
                Explore Our Services
              </Link>
              <a href={BUSINESS.phoneHref} className="btn-outline">
                <Phone className="h-4 w-4" /> Call {BUSINESS.phoneDisplay}
              </a>
            </div>
          </Reveal>

          {/* Owner-requested on-screen statement for the silenced hero video */}
          <Reveal delay={4}>
            <p className="mt-10 max-w-xl border-l-2 border-gold/70 pl-4 font-serif text-xl italic text-cream/90">
              “{HERO_VIDEO_STATEMENT}”
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= MISSION STATEMENT ================= */}
      <section className="bg-teal-gradient">
        <div className="container-lux py-16 text-center">
          <Reveal>
            <p className="eyebrow text-gold-light">Our Mission</p>
            <p className="mx-auto mt-4 max-w-4xl font-serif text-2xl leading-relaxed text-white sm:text-3xl">
              {MISSION_STATEMENT}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= SECOND VIDEO — split screen ================= */}
      <section className="section bg-cream">
        <div className="container-lux grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-4xl shadow-card ring-1 ring-navy/10">
              {/*
                SECOND VIDEO — the owner will provide the completed file.
                Place the video at: /public/videos/lean-on-me-story.mp4
                Poster fallback:     /public/images/lean-on-me-hero.jpg
              */}
              <video
                className="aspect-[4/3] h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                poster="/images/lean-on-me-hero.jpg"
                aria-label="Lean On Me caregiving story video"
              >
                <source src="/videos/lean-on-me-story.mp4" type="video/mp4" />
                {/* Fallback text for unsupported browsers */}
                Your browser does not support the video. Please call {BUSINESS.phoneDisplay}.
              </video>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-dark/30 to-transparent" />
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div>
              <p className="eyebrow">Care That Feels Like Family</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold text-navy">
                Support that treats your loved one like our own
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-navy/70">
                Lean On Me provides dependable, respectful, and compassionate support while helping
                families feel confident that their loved ones are safe and cared for. We focus on the
                small, human moments that make a house feel like home.
              </p>
              <ul className="mt-6 space-y-3">
                {['Dependable, consistent caregivers', 'Respectful, dignity-first support', 'Families kept informed and included'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3 text-navy/80">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-teal/10 text-teal">
                        <Check className="h-4 w-4" />
                      </span>
                      {item}
                    </li>
                  )
                )}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/about" className="btn-teal">
                  About Lean On Me
                </Link>
                <Link to="/sign-up" className="btn-ghost">
                  Request Care
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= WHY FAMILIES CHOOSE ================= */}
      <section className="section bg-white">
        <div className="container-lux">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="eyebrow">Why Families Choose Lean On Me</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold text-navy">
                Care built on trust, warmth, and reliability
              </h2>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i % 3} className={i === 6 ? 'sm:col-span-2 lg:col-span-1' : ''}>
                <div className="card-lux h-full">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-teal-gradient text-gold-light">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-navy">{title}</h3>
                  <p className="mt-2 text-navy/60">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES OVERVIEW ================= */}
      <section className="section bg-cream">
        <div className="container-lux">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <div className="max-w-xl">
                <p className="eyebrow">Services Overview</p>
                <h2 className="mt-3 font-serif text-4xl font-semibold text-navy">
                  Thoughtful support for everyday life
                </h2>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <Link to="/services" className="btn-ghost">
                View All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_OVERVIEW.map((service, i) => (
              <Reveal key={service} delay={i % 3}>
                <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-navy/5 transition hover:-translate-y-0.5 hover:shadow-card">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold-dark">
                    <Check className="h-5 w-5" />
                  </span>
                  <span className="font-medium text-navy">{service}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-navy/50">
            Lean On Me provides non-medical support. Medical treatment and skilled nursing services
            are only provided when appropriately licensed, staffed, approved, and authorized.
          </p>
        </div>
      </section>

      {/* ================= MEDICAID + HOUSING PREVIEW ================= */}
      <section className="section bg-navy-dark">
        <div className="container-lux grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-4xl bg-gradient-to-br from-teal to-teal-dark p-9 text-white shadow-card">
              <Pill className="h-9 w-9 text-gold-light" />
              <h3 className="mt-5 font-serif text-3xl font-semibold">Medicaid Assistance</h3>
              <p className="mt-3 flex-1 text-cream/80">
                Lean On Me Caregiving Services accepts Medicaid patients who need assistance in their
                homes. Eligibility and authorized services depend on your Medicaid plan, an
                assessment, program requirements, and final authorization.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/medicaid-assistance" className="btn-primary">
                  Learn More
                </Link>
                <Link to="/sign-up" className="btn-outline">
                  Check Care Eligibility
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="flex h-full flex-col rounded-4xl bg-gradient-to-br from-navy-light to-navy p-9 text-white shadow-card ring-1 ring-white/10">
              <HomeIcon className="h-9 w-9 text-gold-light" />
              <h3 className="mt-5 font-serif text-3xl font-semibold">Veteran & Elderly Housing</h3>
              <p className="mt-3 flex-1 text-cream/80">
                Housing options for veterans and elderly individuals who need limited daily
                assistance — designed for those who may not require full nursing-home care but
                benefit from a safe, supportive, and comfortable environment.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/veteran-elderly-housing" className="btn-primary">
                  Ask About Housing
                </Link>
                <Link to="/sign-up" className="btn-outline">
                  Join the Interest List
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="section bg-cream">
        <div className="container-lux">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="eyebrow">Kind Words</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold text-navy">
                Stories of care and comfort
              </h2>
              {/* Transparency note — these are placeholders, not verified statements. */}
              <p className="mt-3 text-sm text-navy/45">
                The testimonials below are placeholders shown for layout and will be replaced with
                real, consented statements.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i}>
                <figure className="card-lux h-full">
                  <div className="flex gap-1 text-gold">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4" />
                    ))}
                  </div>
                  <blockquote className="mt-4 font-serif text-lg italic leading-relaxed text-navy/80">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-navy/5 pt-4">
                    <p className="font-semibold text-navy">{t.name}</p>
                    <p className="text-sm text-navy/50">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLOSING ================= */}
      <section className="relative overflow-hidden bg-teal-gradient">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-16 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        </div>
        <div className="container-lux relative py-24 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-serif text-4xl font-semibold text-white sm:text-5xl">
              You Don’t Have to Navigate Care Alone
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-cream/85">
              Reach out today and let us help you find compassionate, dependable support.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link to="/sign-up" className="btn-primary">
                Request Care Today <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={BUSINESS.phoneHref} className="btn-outline">
                <Phone className="h-4 w-4" /> Call {BUSINESS.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
