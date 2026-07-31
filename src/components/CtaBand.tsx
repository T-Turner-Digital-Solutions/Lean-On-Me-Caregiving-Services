import { Link } from 'react-router-dom'
import { BUSINESS } from '../lib/constants'
import Reveal from './Reveal'
import { Phone, ArrowRight } from './Icons'

interface CtaBandProps {
  heading?: string
  subheading?: string
}

export default function CtaBand({
  heading = 'You Don’t Have to Navigate Care Alone',
  subheading = 'Reach out today and let us help you find compassionate, dependable support.',
}: CtaBandProps) {
  return (
    <section className="bg-teal-gradient">
      <div className="container-lux py-20 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-serif text-4xl font-semibold text-white">{heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-cream/85">{subheading}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
  )
}
