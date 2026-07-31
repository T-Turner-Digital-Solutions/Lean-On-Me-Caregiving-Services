import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'
import { MISSION_STATEMENT } from '../lib/constants'
import { VALUES } from '../data/site'
import { HeartHands, Shield, Family, Check } from '../components/Icons'

const WHO_WE_SERVE = [
  'Seniors who benefit from daily assistance',
  'Adults with disabilities',
  'Veterans needing supportive care',
  'Individuals recovering at home',
]

const WHY_LEAN_ON_ME = [
  'Compassionate, dignity-first support',
  'Personalized care shaped around each person',
  'Reliable, respectful communication with families',
  'Medicaid patient assistance and housing-interest support',
]

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Lean On Me Caregiving Services provides compassionate, dependable, non-medical care to seniors, adults with disabilities, veterans, and individuals recovering at home."
        path="/about"
      />
      <PageHero
        eyebrow="About Lean On Me"
        title="Compassionate, dependable care — centered on the people we serve"
        subtitle="Lean On Me Caregiving Services provides compassionate, dependable, and personalized non-medical care to seniors, adults with disabilities, veterans, and individuals recovering at home."
      />

      {/* Mission */}
      <section className="section bg-cream">
        <div className="container-lux grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <div>
              <p className="eyebrow">Our Mission</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold text-navy">Care rooted in dignity</h2>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <p className="font-serif text-2xl leading-relaxed text-navy/80">{MISSION_STATEMENT}</p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="container-lux">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="eyebrow">Our Values</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold text-navy">What guides our care</h2>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i % 3}>
                <div className="card-lux h-full">
                  <h3 className="font-serif text-2xl font-semibold text-teal">{v.title}</h3>
                  <p className="mt-2 text-navy/60">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who we serve + commitment */}
      <section className="section bg-cream">
        <div className="container-lux grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card-lux h-full">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-teal-gradient text-gold-light">
                <Family className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-serif text-3xl font-semibold text-navy">Who We Serve</h3>
              <ul className="mt-5 space-y-3">
                {WHO_WE_SERVE.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-navy/75">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-teal" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="card-lux h-full">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-teal-gradient text-gold-light">
                <Shield className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-serif text-3xl font-semibold text-navy">Our Commitment to Families</h3>
              <p className="mt-5 text-navy/70">
                We know that inviting care into your home is a decision built on trust. We are
                committed to clear communication, respectful support, and keeping families informed
                and included — so everyone feels confident their loved one is safe and cared for.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Lean On Me */}
      <section className="section bg-white">
        <div className="container-lux grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-gradient text-navy-dark">
                <HeartHands className="h-7 w-7" />
              </span>
              <p className="eyebrow mt-6">Why Lean On Me</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold text-navy">
                A partner in care you can rely on
              </h2>
              <p className="mt-5 text-navy/70">
                Families choose Lean On Me for compassionate, dependable support that puts dignity
                and comfort first. We focus on the human moments that make care feel personal.
              </p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <ul className="space-y-4">
              {WHY_LEAN_ON_ME.map((item) => (
                <li key={item} className="flex items-start gap-4 rounded-2xl bg-cream p-5 shadow-soft ring-1 ring-navy/5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-teal/10 text-teal">
                    <Check className="h-5 w-5" />
                  </span>
                  <span className="font-medium text-navy">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
