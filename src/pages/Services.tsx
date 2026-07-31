import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'
import { IN_HOME_SERVICES, VETERAN_SERVICES, ELDERLY_SERVICES } from '../data/site'
import { HomeIcon, Medal, Family, Check } from '../components/IconAliases'

const GROUPS = [
  {
    Icon: HomeIcon,
    title: 'In-Home Assistance',
    intro: 'Practical, respectful help with everyday living in the comfort of home.',
    items: IN_HOME_SERVICES,
  },
  {
    Icon: Medal,
    title: 'Veteran Support',
    intro: 'Supportive, dignified care and coordination for veterans.',
    items: VETERAN_SERVICES,
  },
  {
    Icon: Family,
    title: 'Elderly Support',
    intro: 'Attentive daily support that helps seniors stay safe and comfortable.',
    items: ELDERLY_SERVICES,
  },
]

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="In-home assistance, veteran support, and elderly support from Lean On Me Caregiving Services. Non-medical care focused on dignity, safety, and comfort."
        path="/services"
      />
      <PageHero
        eyebrow="Our Services"
        title="Comprehensive, compassionate support for daily life"
        subtitle="Explore our non-medical caregiving services for in-home assistance, veterans, and elderly individuals — always centered on dignity, safety, and comfort."
      />

      <section className="section bg-cream">
        <div className="container-lux space-y-8">
          {GROUPS.map((group, gi) => (
            <Reveal key={group.title} delay={gi}>
              <div className="overflow-hidden rounded-4xl bg-white shadow-soft ring-1 ring-navy/5">
                <div className="grid gap-8 p-8 md:grid-cols-[280px_1fr] md:p-10">
                  <div>
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-teal-gradient text-gold-light">
                      <group.Icon className="h-7 w-7" />
                    </span>
                    <h2 className="mt-5 font-serif text-3xl font-semibold text-navy">{group.title}</h2>
                    <p className="mt-3 text-navy/60">{group.intro}</p>
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 rounded-2xl bg-cream/70 px-4 py-3 text-navy/80 ring-1 ring-navy/5"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gold/15 text-gold-dark">
                          <Check className="h-4 w-4" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="rounded-3xl border border-teal/20 bg-teal/5 p-6 text-navy/70">
              <p className="font-semibold text-teal">A note on medical care</p>
              <p className="mt-2 text-sm">
                Lean On Me provides non-medical support. Medical treatment and skilled nursing
                services are only provided when appropriately licensed, staffed, approved, and
                authorized.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
