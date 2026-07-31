// Approved website content. Keep factual claims conservative — no invented
// licenses, credentials, statistics, availability, or guarantees.

export const SERVICES_OVERVIEW = [
  'Personal care assistance',
  'Companionship',
  'Meal preparation',
  'Light housekeeping',
  'Mobility assistance',
  'Medication reminders',
  'Transportation assistance',
  'Respite care',
  'Daily living support',
  'Recovery assistance',
  'Veteran support',
  'Elderly housing assistance',
]

export const IN_HOME_SERVICES = [
  'Personal care support',
  'Bathing and grooming assistance',
  'Dressing assistance',
  'Mobility support',
  'Meal preparation',
  'Light housekeeping',
  'Medication reminders',
  'Companionship',
  'Transportation coordination',
  'Respite care',
  'Recovery support',
]

export const VETERAN_SERVICES = [
  'Daily living assistance',
  'Companionship',
  'Housing-interest assistance',
  'Transportation coordination',
  'Supportive care planning',
]

export const ELDERLY_SERVICES = [
  'In-home daily assistance',
  'Safety monitoring',
  'Meal support',
  'Companionship',
  'Housing-interest assistance',
  'Family communication',
]

export const VALUES = [
  { title: 'Dignity', body: 'Every person is treated with the honor and respect they deserve.' },
  { title: 'Independence', body: 'We support the freedom to live comfortably and make personal choices.' },
  { title: 'Safety', body: 'Careful, attentive support that helps protect wellbeing at home.' },
  { title: 'Compassion', body: 'Warm, patient, human care in every interaction.' },
  { title: 'Respect', body: 'We listen first and honor each family’s wishes and routines.' },
  { title: 'Reliable Support', body: 'Dependable communication families can count on.' },
]

export interface Faq {
  q: string
  a: string
}

const CALL_LINE = 'Please call 205-687-4047 for current availability and service-area information.'

export const FAQS: Faq[] = [
  {
    q: 'What services does Lean On Me Caregiving Services provide?',
    a: 'We provide non-medical support including personal care, companionship, meal preparation, light housekeeping, mobility assistance, medication reminders, transportation assistance, respite care, daily living support, and recovery assistance. We also offer veteran support and housing-interest assistance for veterans and elderly individuals.',
  },
  {
    q: 'Do you accept Medicaid patients?',
    a: 'Yes. Lean On Me Caregiving Services accepts Medicaid patients who need assistance in their homes. The services that can be authorized depend on your Medicaid plan, an assessment, program requirements, and final authorization.',
  },
  {
    q: 'Does Medicaid automatically cover all caregiving services?',
    a: 'No. Coverage is not automatic. Eligibility and the specific services that may be authorized depend on your individual Medicaid plan, an assessment, program requirements, and final authorization. We cannot guarantee Medicaid approval.',
  },
  {
    q: 'Who qualifies for in-home assistance?',
    a: 'In-home assistance may benefit seniors, adults with disabilities, veterans, and individuals recovering at home who need help with daily living. Whether services can be provided depends on an assessment and, where applicable, program authorization. ' + CALL_LINE,
  },
  {
    q: 'Do you provide housing for veterans?',
    a: 'We provide housing options for veterans who need limited daily assistance and benefit from a safe, supportive environment. Availability and acceptance are not guaranteed. You are welcome to join the housing interest list to learn more.',
  },
  {
    q: 'Do you provide housing for elderly individuals?',
    a: 'Yes, we offer housing options for elderly individuals who may not require full nursing-home care but benefit from a supportive, comfortable environment. Availability and acceptance are not guaranteed.',
  },
  {
    q: 'Is housing placement guaranteed?',
    a: 'No. We do not guarantee housing placement, immediate availability, or acceptance. Joining the housing interest list helps us understand your needs and follow up with current information.',
  },
  {
    q: 'Do you provide 24-hour care?',
    a: 'Care schedules vary by individual needs and availability. ' + CALL_LINE,
  },
  {
    q: 'Are your services medical or non-medical?',
    a: 'Our core services are non-medical support. Medical treatment and skilled nursing services are only provided when appropriately licensed, staffed, approved, and authorized.',
  },
  {
    q: 'How quickly can services begin?',
    a: 'Timing depends on assessment, any required authorizations, and availability. Submitting a request does not guarantee immediate service. ' + CALL_LINE,
  },
  {
    q: 'Can family members help create the care plan?',
    a: 'Yes. We welcome family involvement and aim to keep families informed and included so everyone feels confident about the support being provided.',
  },
  {
    q: 'How do I request care?',
    a: 'Complete our Sign Up form and our team will follow up. You will receive an inquiry number and a confirmation email. You can also call us directly.',
  },
  {
    q: 'What areas do you serve?',
    a: CALL_LINE,
  },
  {
    q: 'What information is needed during the initial consultation?',
    a: 'We typically discuss the type of assistance needed, general preferences, and how best to contact you. Please do not share sensitive identifiers such as Social Security numbers or Medicaid ID numbers through public forms. ' + CALL_LINE,
  },
  {
    q: 'How can I speak with someone directly?',
    a: 'You can call us at 205-687-4047 or email info@leanonmecargiving.org, and our team will be glad to help.',
  },
]

// Clearly-labeled PLACEHOLDER testimonials. These are NOT verified customer
// statements and must be replaced with real, consented testimonials before use.
export const TESTIMONIALS = [
  {
    quote:
      'The caregiver treated my mother with such warmth and patience. For the first time in months, our family finally felt at ease.',
    name: 'Placeholder Family Member',
    role: 'Daughter of a client — placeholder',
  },
  {
    quote:
      'Communication was clear and dependable. Knowing someone reliable was there gave us real peace of mind.',
    name: 'Placeholder Client',
    role: 'Veteran — placeholder',
  },
  {
    quote:
      'Compassionate, respectful, and professional from the very first conversation. We are grateful for the support.',
    name: 'Placeholder Caregiver Recipient',
    role: 'Family caregiver — placeholder',
  },
]
