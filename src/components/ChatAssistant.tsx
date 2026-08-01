import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BUSINESS, ELIGIBILITY_URL } from '../lib/constants'
import { Chat, Close, Send, Phone } from './Icons'

/**
 * "Ask Lean On Me" — floating website assistant.
 *
 * This is a polished, RULE-BASED assistant that answers from approved website
 * information only. It is intentionally structured so a secure AI API can be
 * added later WITHOUT touching the UI:
 *   - Replace `generateReply()` with a call to a server-side function
 *     (e.g. /.netlify/functions/ask-assistant) that holds the AI API key.
 *   - NEVER place an AI API key in this frontend file.
 *
 * Guardrails (see AI Assistant Disclaimer): it does not diagnose, give medical
 * treatment, guarantee Medicaid eligibility / approval / housing placement,
 * reveal applicant data, or collect sensitive identifiers. Emergencies -> 911.
 */

interface Msg {
  role: 'assistant' | 'user'
  text: string
  links?: { label: string; to?: string; href?: string }[]
}

const QUICK_ACTIONS = [
  'Request Care',
  'Medicaid Assistance',
  'Housing Options',
  'Sign Up',
  'Frequently Asked Questions',
  `Call ${BUSINESS.phoneDisplay}`,
]

const GREETING: Msg = {
  role: 'assistant',
  text:
    "Hi, I'm the Ask Lean On Me assistant. I can help with our services, Medicaid-supported care, veteran and elderly housing, and how to request care. How can I help today?",
}

function generateReply(input: string): Msg {
  const q = input.toLowerCase()

  const has = (...terms: string[]) => terms.some((t) => q.includes(t))

  // Emergencies first.
  if (has('emergency', '911', 'ambulance', 'urgent', 'chest pain', 'breathe', 'suicide')) {
    return {
      role: 'assistant',
      text:
        'If this is a medical or safety emergency, please call 911 right away. Lean On Me Caregiving Services is not an emergency-response service.',
    }
  }
  if (has('medicaid')) {
    return {
      role: 'assistant',
      text:
        'Lean On Me accepts Medicaid patients who need assistance in their homes. Eligibility and the services that can be authorized depend on your Medicaid plan, an assessment, program requirements, and final authorization — we can’t guarantee approval, but we’re glad to help you get started.',
      links: [
        { label: 'Medicaid Assistance', to: '/medicaid-assistance' },
        { label: 'Check Eligibility', href: ELIGIBILITY_URL },
      ],
    }
  }
  if (has('housing', 'veteran housing', 'elderly housing', 'live', 'apartment')) {
    return {
      role: 'assistant',
      text:
        'We offer housing options for veterans and elderly individuals who need limited daily assistance — designed for those who may not require full nursing-home care but benefit from a safe, supportive environment. Availability and acceptance are not guaranteed; you can join the housing interest list to learn more.',
      links: [
        { label: 'Housing Options', to: '/veteran-elderly-housing' },
        { label: 'Join the Housing Interest List', to: '/sign-up' },
      ],
    }
  }
  if (has('veteran')) {
    return {
      role: 'assistant',
      text:
        'We provide veteran support including daily living assistance, companionship, transportation coordination, supportive care planning, and housing-interest assistance.',
      links: [
        { label: 'Services', to: '/services' },
        { label: 'Request Care', to: '/sign-up' },
      ],
    }
  }
  if (has('service', 'help with', 'what do you', 'care do you', 'offer')) {
    return {
      role: 'assistant',
      text:
        'We provide non-medical support such as personal care, companionship, meal preparation, light housekeeping, mobility assistance, medication reminders, transportation assistance, respite care, daily living support, and recovery assistance.',
      links: [{ label: 'View All Services', to: '/services' }],
    }
  }
  if (has('sign up', 'signup', 'apply', 'request care', 'get started', 'form')) {
    return {
      role: 'assistant',
      text:
        'Requesting care is simple: complete our short sign-up form and we’ll follow up. You’ll receive an inquiry number and a confirmation email. Submitting the form does not guarantee Medicaid approval, housing placement, or immediate service.',
      links: [{ label: 'Start Sign Up', to: '/sign-up' }],
    }
  }
  if (has('in-home', 'in home', 'home care', 'personal care', 'companion')) {
    return {
      role: 'assistant',
      text:
        'Our in-home assistance includes personal care, bathing and grooming assistance, dressing help, mobility support, meal preparation, light housekeeping, medication reminders, companionship, and respite care.',
      links: [{ label: 'In-Home Services', to: '/services' }],
    }
  }
  if (has('hours', 'open', 'when are you')) {
    return {
      role: 'assistant',
      text: `Please call ${BUSINESS.phoneDisplay} for current availability and business hours.`,
      links: [{ label: `Call ${BUSINESS.phoneDisplay}`, href: BUSINESS.phoneHref }],
    }
  }
  if (has('contact', 'phone', 'call', 'email', 'reach', 'talk to', 'speak')) {
    return {
      role: 'assistant',
      text: `You can reach us by phone at ${BUSINESS.phoneDisplay} or by email at ${BUSINESS.email}.`,
      links: [
        { label: `Call ${BUSINESS.phoneDisplay}`, href: BUSINESS.phoneHref },
        { label: 'Email Us', href: BUSINESS.emailHref },
        { label: 'Contact Page', to: '/contact' },
      ],
    }
  }
  if (has('medical', 'nurse', 'nursing', 'diagnos', 'prescription', 'treatment')) {
    return {
      role: 'assistant',
      text:
        'Our core services are non-medical support. Medical treatment and skilled nursing are only provided when appropriately licensed, staffed, approved, and authorized. I can’t provide medical advice or diagnoses — for medical concerns please speak with a healthcare professional, and for emergencies call 911.',
      links: [{ label: 'Learn About Our Services', to: '/services' }],
    }
  }
  if (has('area', 'location', 'where', 'serve', 'address')) {
    return {
      role: 'assistant',
      text: `Please call ${BUSINESS.phoneDisplay} for current availability and service-area information.`,
      links: [{ label: `Call ${BUSINESS.phoneDisplay}`, href: BUSINESS.phoneHref }],
    }
  }
  if (has('faq', 'question')) {
    return {
      role: 'assistant',
      text: 'Our FAQ page answers the most common questions about care, Medicaid, and housing.',
      links: [{ label: 'Read the FAQ', to: '/faq' }],
    }
  }
  if (has('hello', 'hi', 'hey', 'thanks', 'thank you')) {
    return {
      role: 'assistant',
      text: "You're welcome! I'm happy to help with services, Medicaid, housing, or getting started with a care request.",
    }
  }

  // Fallback.
  return {
    role: 'assistant',
    text: `I want to make sure you get the right answer. For anything I can’t cover here, please call ${BUSINESS.phoneDisplay} and our team will be glad to help. You can also explore the quick options below.`,
    links: [
      { label: 'Request Care', to: '/sign-up' },
      { label: 'FAQ', to: '/faq' },
      { label: `Call ${BUSINESS.phoneDisplay}`, href: BUSINESS.phoneHref },
    ],
  }
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([GREETING])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const send = (text: string) => {
    const clean = text.trim()
    if (!clean) return
    const reply = generateReply(clean)
    setMessages((m) => [...m, { role: 'user', text: clean }, reply])
    setInput('')
  }

  const handleQuick = (action: string) => {
    if (action.startsWith('Call')) {
      window.location.href = BUSINESS.phoneHref
      return
    }
    send(action)
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-20 right-4 z-40 flex items-center gap-2 rounded-full bg-teal-gradient px-5 py-3.5 text-sm font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5 lg:bottom-6"
        aria-label="Open Ask Lean On Me assistant"
      >
        {open ? <Close className="h-5 w-5" /> : <Chat className="h-5 w-5" />}
        <span className="hidden sm:inline">Ask Lean On Me</span>
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-36 right-4 z-40 flex h-[70vh] max-h-[560px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-4xl bg-white shadow-card ring-1 ring-navy/10 lg:bottom-24"
          role="dialog"
          aria-label="Ask Lean On Me chat assistant"
        >
          {/* Header */}
          <div className="bg-teal-gradient px-5 py-4 text-white">
            <p className="font-serif text-lg font-semibold">Ask Lean On Me</p>
            <p className="text-xs text-cream/80">Answers about care, Medicaid & housing</p>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-cream/60 px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-teal text-white'
                      : 'bg-white text-navy shadow-soft ring-1 ring-navy/5'
                  }`}
                >
                  <p>{m.text}</p>
                  {m.links && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.links.map((l) =>
                        l.to ? (
                          <Link
                            key={l.label}
                            to={l.to}
                            onClick={() => setOpen(false)}
                            className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-dark hover:bg-gold/25"
                          >
                            {l.label}
                          </Link>
                        ) : (
                          <a
                            key={l.label}
                            href={l.href}
                            target={l.href?.startsWith('http') ? '_blank' : undefined}
                            rel={l.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-dark hover:bg-gold/25"
                          >
                            {l.label}
                          </a>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-1.5 border-t border-navy/5 bg-white px-3 py-2">
            {QUICK_ACTIONS.map((a) => (
              <button
                key={a}
                onClick={() => handleQuick(a)}
                className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-teal hover:bg-teal hover:text-white"
              >
                {a}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-center gap-2 border-t border-navy/5 bg-white p-3"
          >
            <label className="sr-only" htmlFor="assistant-input">
              Type your question
            </label>
            <input
              id="assistant-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="flex-1 rounded-full border border-navy/10 bg-cream/60 px-4 py-2.5 text-sm text-navy outline-none focus:border-teal"
            />
            <button type="submit" className="grid h-10 w-10 place-items-center rounded-full bg-teal text-white hover:bg-teal-dark" aria-label="Send">
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="bg-white px-4 pb-3 text-center text-[10px] leading-tight text-navy/40">
            Informational only — not medical advice. For emergencies call 911. See our{' '}
            <Link to="/ai-assistant-disclaimer" className="underline" onClick={() => setOpen(false)}>
              AI Assistant Disclaimer
            </Link>
            .
          </p>
        </div>
      )}

      {/* Emergency shortcut on mobile within reach */}
      <a href={BUSINESS.phoneHref} className="sr-only">
        Call {BUSINESS.phoneDisplay}
        <Phone />
      </a>
    </>
  )
}
