import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'
import { Home as HomeIcon, Medal, Check, Shield } from '../components/Icons'

const FEATURES = [
  { Icon: Shield, title: 'Safe & Supportive', body: 'A comfortable environment designed with wellbeing in mind.' },
  { Icon: HomeIcon, title: 'Limited Daily Assistance', body: 'For those who benefit from help without full nursing-home care.' },
  { Icon: Medal, title: 'Veteran-Focused Options', body: 'Respectful support tailored to veterans’ needs.' },
]

export default function Housing() {
  return (
    <>
      <Seo
        title="Veteran & Elderly Housing"
        description="Housing options for veterans and elderly individuals who need limited daily assistance and benefit from a safe, supportive environment."
        path="/veteran-elderly-housing"
      />
      <PageHero
        eyebrow="Veteran & Elderly Housing"
        title="Comfortable, supportive housing for those who need limited daily assistance"
        subtitle="Lean On Me provides housing options for veterans and elderly individuals who may not require full nursing-home care but benefit from a safe, supportive, and comfortable environment."
      >
        <Link to="/sign-up" className="btn-primary">
          Ask About Housing
        </Link>
        <Link to="/sign-up" className="btn-outline">
          Join the Housing Interest List
        </Link>
      </PageHero>

      <section className="section bg-cream">
        <div className="container-lux">
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i}>
                <div className="card-lux h-full">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-teal-gradient text-gold-light">
                    <f.Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-navy">{f.title}</h3>
                  <p className="mt-2 text-navy/60">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 rounded-4xl bg-navy-dark p-9 text-cream/85 shadow-card">
              <h2 className="font-serif text-3xl font-semibold text-white">Designed for comfort and dignity</h2>
              <p className="mt-4 max-w-3xl">
                Our housing is intended for individuals who may not require full nursing-home care but
                benefit from a safe, supportive, and comfortable environment with limited daily
                assistance. Joining the interest list helps us understand your needs and follow up
                with current information.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {['Supportive, comfortable setting', 'Limited daily assistance', 'Respectful, dignity-first care', 'Family communication'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-teal text-white">
                        <Check className="h-4 w-4" />
                      </span>
                      {item}
                    </li>
                  )
                )}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/sign-up" className="btn-primary">
                  Ask About Housing
                </Link>
                <Link to="/sign-up" className="btn-outline">
                  Join the Housing Interest List
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Honest limitations */}
          <Reveal>
            <div className="mt-8 rounded-3xl border border-gold/30 bg-gold/5 p-6 text-navy/70">
              <p className="font-semibold text-gold-dark">Important</p>
              <p className="mt-2 text-sm">
                We do not make guarantees about licensing, immediate availability, guaranteed
                acceptance, or placement. Please call{' '}
                <a href="tel:2056874047" className="font-semibold text-teal">
                  205-687-4047
                </a>{' '}
                for current availability and information.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        heading="Interested in supportive housing?"
        subheading="Join the housing interest list and our team will follow up with current information."
      />
    </>
  )
}
